import { errorMessages } from '../../../shared/enums/error-messages';
import { HttpError } from '../../../shared/errors/http-error';
import { statusCode } from '../../../shared/status-code/status-code';
import authService from '../../auth/services/auth.service';
import doctorsRepository from '../repositories/doctors.repository';
import { Doctor } from '../types/doctor.interface';

const create = async (
  doctor: Omit<Doctor, 'appointments' | 'createdAt' | 'id' | 'updatedAt'>,
): Promise<Omit<Doctor, 'appointments' | 'createdAt' | 'id' | 'updatedAt'>> => {
  const existingDoctorCrm = await doctorsRepository.findByFilter({ crm: doctor.crm });

  const existingDoctorEmail = await doctorsRepository.findByFilter({ email: doctor.email });

  if (existingDoctorCrm) {
    throw new HttpError(statusCode.BAD_REQUEST, errorMessages.BAD_REQUEST('CRM already exists'));
  }

  if (existingDoctorEmail) {
    throw new HttpError(statusCode.BAD_REQUEST, errorMessages.BAD_REQUEST('Email already exists'));
  }

  return await doctorsRepository.create({
    ...doctor,
    password: await authService.encryptPassword(doctor.password),
  });
};

const getAll = async () => {
  return await doctorsRepository.findAll();
};

const getById = async (id: string) => {
  const doctor = await doctorsRepository.findById(id);
  if (!doctor) {
    throw new HttpError(statusCode.NOT_FOUND, errorMessages.NOT_FOUND(`Doctor for id: ${id}`));
  }
  return doctor;
};

const update = async (
  id: string,
  doctor: Omit<Partial<Doctor>, 'appointments' | 'createdAt' | 'id' | 'updatedAt'>,
) => {
  const existingDoctor = await doctorsRepository.findById(id);
  if (!existingDoctor) {
    throw new HttpError(statusCode.NOT_FOUND, errorMessages.NOT_FOUND(`Doctor for id: ${id}`));
  }

  if (doctor.crm && doctor.crm !== existingDoctor.crm) {
    const doctorWithCrm = await doctorsRepository.findByFilter({ crm: doctor.crm });
    if (doctorWithCrm && doctorWithCrm.id !== id) {
      throw new HttpError(statusCode.BAD_REQUEST, errorMessages.BAD_REQUEST('CRM already exists'));
    }
  }

  return await doctorsRepository.update(existingDoctor, doctor);
};

const remove = async (id: string) => {
  const doctor = await doctorsRepository.findById(id);
  if (!doctor) {
    throw new HttpError(statusCode.NOT_FOUND, errorMessages.NOT_FOUND(`Doctor for id: ${id}`));
  }
  await doctorsRepository.remove(doctor);
};

export default { create, getAll, getById, remove, update };
