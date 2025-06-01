import { Repository } from 'typeorm';

import { AppDataSource } from '../../../database/data-source';
import { AppointmentModel } from '../../../database/entity/Appointment';
import { Doctor } from '../../doctors/types/doctor.interface';
import { Patient } from '../../patients/types/patient.interface';
import { Appointment, UpdateAppointment } from '../types/appointment.interface';
import { ParsedAppointment, PatientInAppointment } from '../types/appointments.types';

export class AppointmentsRepository {
  private repository: Repository<AppointmentModel>;

  constructor() {
    this.repository = AppDataSource.getRepository(AppointmentModel);
  }

  public async create(
    appointment: Omit<Appointment, 'doctorId' | 'patientId'> & {
      doctor: Omit<Doctor, 'appointments'>;
      patient: Patient;
    },
  ): Promise<ParsedAppointment> {
    const newAppointment = this.repository.create(appointment);
    return this.transformAppointmentModel(await this.repository.save(newAppointment));
  }

  public async findAllByDoctorId(doctorId: string): Promise<
    (Omit<Appointment, 'doctorId' | 'patientId'> & {
      doctor: Doctor;
      id: string;
      patient: PatientInAppointment;
    })[]
  > {
    const appointments = await this.repository.find({
      relations: { doctor: true, patient: true },
      where: { doctor: { id: doctorId } },
    });
    return appointments.map((appointment) => this.transformAppointmentModel(appointment));
  }

  public async findAllByPatientId(patientId: string): Promise<ParsedAppointment[]> {
    const appointments = await this.repository.find({
      relations: { doctor: true, patient: true },
      where: { patient: { id: patientId } },
    });
    return appointments.map((appointment) => this.transformAppointmentModel(appointment));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async findAppointmentsByFilter(filter: any) {
    return await this.repository.findOne({
      relations: { doctor: true, patient: true },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      where: filter,
    });
  }

  public async findById(id: string): Promise<null | (ParsedAppointment & { id: string })> {
    const appointment = await this.repository.findOne({
      relations: { doctor: true, patient: true },
      where: { id },
    });
    if (!appointment) {
      return null;
    }
    return this.transformAppointmentModel(appointment);
  }

  public async update(
    appointmentId: string,
    data: UpdateAppointment,
  ): Promise<null | ParsedAppointment> {
    const result = await this.repository.update(appointmentId, data);

    if (result.affected === 0) {
      return null;
    }

    const updatedAppointment = await this.repository.findOne({
      relations: { doctor: true, patient: true },
      where: { id: appointmentId },
    });

    if (!updatedAppointment) {
      return null;
    }

    return this.transformAppointmentModel(updatedAppointment);
  }

  private transformAppointmentModel(appointmentModel: AppointmentModel): Omit<
    Appointment,
    'doctorId' | 'patientId'
  > & {
    createdAt: Date;
    doctor: Doctor;
    id: string;
    patient: PatientInAppointment;
    updatedAt: Date;
  } {
    return {
      createdAt: appointmentModel.createdAt,
      date: appointmentModel.date,
      doctor: {
        crm: appointmentModel.doctor.crm,
        email: appointmentModel.doctor.email,
        id: appointmentModel.doctor.id,
        name: appointmentModel.doctor.name,
        specialty: appointmentModel.doctor.specialty,
      } as Doctor,
      hour: appointmentModel.hour,
      id: appointmentModel.id,
      patient: {
        birthDate: appointmentModel.patient.birthDate,
        cellphone: appointmentModel.patient.cellphone,
        email: appointmentModel.patient.email,
        id: appointmentModel.patient.id,
        name: appointmentModel.patient.name,
      } as PatientInAppointment,
      updatedAt: appointmentModel.updatedAt,
    };
  }
}

export default new AppointmentsRepository();
