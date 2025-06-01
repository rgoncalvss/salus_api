import { errorMessages } from '../../../shared/enums/error-messages';
import { HttpError } from '../../../shared/errors/http-error';
import { statusCode } from '../../../shared/status-code/status-code';
import authService from '../../auth/services/auth.service';
import patientsRepository from '../repositories/patients.repository';
import { Patient } from '../types/patient.interface';

const create = async (patient: Omit<Patient, 'appointments' | 'id'>): Promise<Patient> => {
  const user = await patientsRepository.findByEmail(patient.email);

  if (user) {
    throw new HttpError(statusCode.BAD_REQUEST, errorMessages.BAD_REQUEST('Email already exists'));
  }

  return await patientsRepository.create({
    ...patient,
    password: await authService.encryptPassword(patient.password),
  });
};

const getAll = async () => {
  return await patientsRepository.findAll();
};

const getById = async (id: string) => {
  const user = await patientsRepository.findById(id);
  if (!user) {
    throw new HttpError(statusCode.NOT_FOUND, errorMessages.NOT_FOUND(`User for id: ${id}`));
  }
  return user;
};

const update = async (id: string, patient: Omit<Partial<Patient>, 'appointments' | 'id'>) => {
  const user = await patientsRepository.findById(id);
  if (!user) {
    throw new HttpError(statusCode.NOT_FOUND, errorMessages.NOT_FOUND(`User for id: ${id}`));
  }
  return await patientsRepository.update(user, patient);
};

const remove = async (id: string) => {
  const user = await patientsRepository.findById(id);
  if (!user) {
    throw new HttpError(statusCode.NOT_FOUND, errorMessages.NOT_FOUND(`User for id: ${id}`));
  }
  await patientsRepository.remove(user);
};

export default { create, getAll, getById, remove, update };
