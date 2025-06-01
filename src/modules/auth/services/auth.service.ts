import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { errorMessages } from '../../../shared/enums/error-messages';
import { HttpError } from '../../../shared/errors/http-error';
import { statusCode } from '../../../shared/status-code/status-code';
import doctorsRepository from '../../doctors/repositories/doctors.repository';
import patientsRepository from '../../patients/repositories/patients.repository';

const JWT_SECRET = process.env.JWT_SECRET ?? 'supersecretcode';

const login = async (email: string, password: string, type: string): Promise<string> => {
  switch (type) {
    case 'doctor': {
      return handleDoctorAuthentication(email, password);
    }
    case 'patient': {
      return handlePatientAuthentication(email, password);
    }
    default:
      throw new HttpError(statusCode.BAD_REQUEST, errorMessages.BAD_REQUEST('type'));
  }
};

const handleDoctorAuthentication = async (email: string, password: string): Promise<string> => {
  const doctor = await doctorsRepository.findByFilter({ email });
  if (!doctor) {
    throw new HttpError(statusCode.NOT_FOUND, errorMessages.NOT_FOUND('doctor'));
  }
  const isPasswordCorrect = await comparePassword(password, doctor.password);
  if (!isPasswordCorrect) {
    throw new HttpError(statusCode.UNAUTHORIZED, errorMessages.AUTHENTICATION_FAILED);
  }
  return createJWT({ id: doctor.id, type: 'doctor' });
};

const handlePatientAuthentication = async (email: string, password: string): Promise<string> => {
  const patient = await patientsRepository.findByEmail(email);
  if (!patient) {
    throw new HttpError(statusCode.NOT_FOUND, errorMessages.NOT_FOUND('patient'));
  }
  const isPasswordCorrect = await comparePassword(password, patient.password);
  if (!isPasswordCorrect) {
    throw new HttpError(statusCode.UNAUTHORIZED, errorMessages.AUTHENTICATION_FAILED);
  }
  return createJWT({ id: patient.id, type: 'patient' });
};

const encryptPassword = async (password: string): Promise<string> => {
  const SALT_ROUNDS = 10;

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  return hashedPassword;
};

const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

  return isPasswordCorrect;
};

const createJWT = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

const verifyJWT = (token: string): null | object => {
  try {
    return jwt.verify(token, JWT_SECRET) as object;
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
};

export default {
  comparePassword,
  createJWT,
  encryptPassword,
  login,
  verifyJWT,
};
