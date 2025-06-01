import { errorMessages } from '../../../shared/enums/error-messages';
import { HttpError } from '../../../shared/errors/http-error';
import { statusCode } from '../../../shared/status-code/status-code';
import { validateAppointmentDate } from '../../../shared/validators/date.validator';
import doctorsRepository from '../../doctors/repositories/doctors.repository';
import { Doctor } from '../../doctors/types/doctor.interface';
import patientsRepository from '../../patients/repositories/patients.repository';
import appointmentsRepository from '../repositories/appointments.repository';
import { Appointment, UpdateAppointment } from '../types/appointment.interface';
import { PatientInAppointment } from '../types/appointments.types';

const create = async (
  appointment: Omit<Appointment, 'createdAt' | 'id' | 'updatedAt'>,
): Promise<Partial<Appointment> & { doctor: Doctor; patient: PatientInAppointment }> => {
  validateAppointmentDate(appointment.date);
  await validateIfTheresNoAppointments(appointment);

  const doctor = await doctorsRepository.findById(appointment.doctorId);
  if (!doctor) {
    throw new HttpError(
      statusCode.NOT_FOUND,
      errorMessages.NOT_FOUND(`Doctor with id ${appointment.doctorId}`),
    );
  }
  const patient = await patientsRepository.findById(appointment.patientId);

  if (!patient) {
    throw new HttpError(
      statusCode.NOT_FOUND,
      errorMessages.NOT_FOUND(`Patient with id ${appointment.patientId}`),
    );
  }

  return await appointmentsRepository.create({ ...appointment, doctor, patient });
};

const getAllByDoctorId = async (
  doctorId: string,
): Promise<Partial<Appointment> & { doctor: Doctor; patient: PatientInAppointment }[]> => {
  const appointments = await appointmentsRepository.findAllByDoctorId(doctorId);
  if (appointments.length === 0) {
    throw new HttpError(
      statusCode.NOT_FOUND,
      errorMessages.NOT_FOUND(`No appointments found for doctor with id ${doctorId}`),
    );
  }

  return appointments;
};

const getAllByPatientId = async (
  patientId: string,
): Promise<Partial<Appointment> & { doctor: Doctor; patient: PatientInAppointment }[]> => {
  const appointments = await appointmentsRepository.findAllByPatientId(patientId);
  if (appointments.length === 0) {
    throw new HttpError(
      statusCode.NOT_FOUND,
      errorMessages.NOT_FOUND(`No appointments found for patient with id ${patientId}`),
    );
  }
  return appointments;
};

const getById = async (
  id: string,
): Promise<Partial<Appointment> & { doctor: Doctor; patient: PatientInAppointment }> => {
  const appointment = await appointmentsRepository.findById(id);
  if (!appointment) {
    throw new HttpError(statusCode.NOT_FOUND, errorMessages.NOT_FOUND(`Appointment with id ${id}`));
  }
  return appointment;
};

const update = async (
  id: string,
  appointment: UpdateAppointment,
): Promise<Partial<Appointment> & { doctor: Doctor; patient: PatientInAppointment }> => {
  const existingAppointment = await appointmentsRepository.findById(id);

  if (!existingAppointment) {
    throw new HttpError(statusCode.NOT_FOUND, errorMessages.NOT_FOUND(`Appointment with id ${id}`));
  }

  if (appointment.date && !appointment.hour) {
    throw new HttpError(
      statusCode.BAD_REQUEST,
      errorMessages.BAD_REQUEST('Cannot update appointment without hour'),
    );
  }

  const mergedAppointment = {
    ...existingAppointment,
    ...appointment,
  } as Appointment;

  if (appointment.date) {
    validateAppointmentDate(appointment.date);
  }

  if (appointment.doctorId) {
    await validateIfTheresNoAppointments({ ...mergedAppointment, doctorId: appointment.doctorId });
  }
  const { date, doctorId, hour, patientId } = appointment;

  const updateData = {
    ...(date !== undefined && { date }),
    ...(hour !== undefined && { hour }),
    ...(doctorId && { doctor: { id: doctorId } }),
    ...(patientId && { patient: { id: patientId } }),
  };

  const updatedAppointment = await appointmentsRepository.update(
    existingAppointment.id,
    updateData,
  );

  if (!updatedAppointment) {
    throw new HttpError(statusCode.NOT_FOUND, errorMessages.NOT_FOUND(`Appointment with id ${id}`));
  }

  return updatedAppointment;
};

const validateIfTheresNoAppointments = async (appointment: Appointment) => {
  const alreadyExists = await appointmentsRepository.findAppointmentsByFilter({
    date: appointment.date,
    doctor: { id: appointment.doctorId },
    hour: appointment.hour,
  });

  if (alreadyExists) {
    throw new HttpError(
      statusCode.CONFLICT,
      errorMessages.RESOURCE_CONFLICT('Appointment already exists'),
    );
  }
};

export default {
  create,
  getAllByDoctorId,
  getAllByPatientId,
  getById,
  update,
};
