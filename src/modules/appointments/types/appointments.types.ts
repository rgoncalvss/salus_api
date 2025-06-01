import { Doctor } from '../../doctors/types/doctor.interface';
import { Patient } from '../../patients/types/patient.interface';
import { Appointment } from './appointment.interface';

export type ParsedAppointment = Partial<Omit<Appointment, 'doctorId' | 'patientId'>> & {
  doctor: Doctor;
  patient: PatientInAppointment;
};

export type PatientInAppointment = Omit<Patient, 'password'>;
