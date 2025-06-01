/* eslint-disable @typescript-eslint/unbound-method */
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { DeleteResult } from 'typeorm';

import { errorMessages } from '../../../shared/enums/error-messages';
import { HttpError } from '../../../shared/errors/http-error';
import { statusCode } from '../../../shared/status-code/status-code';
import doctorsRepository from '../../doctors/repositories/doctors.repository';
import patientsRepository from '../../patients/repositories/patients.repository';
import appointmentsRepository from '../repositories/appointments.repository';
import appointmentsService from '../services/appointments.service';

jest.mock('../repositories/appointments.repository');
jest.mock('../../doctors/repositories/doctors.repository');
jest.mock('../../patients/repositories/patients.repository');

const mockAppointmentsRepository = appointmentsRepository as jest.Mocked<
  typeof appointmentsRepository
>;
const mockDoctorsRepository = doctorsRepository as jest.Mocked<typeof doctorsRepository>;
const mockPatientsRepository = patientsRepository as jest.Mocked<typeof patientsRepository>;

describe('Appointments Service - Timestamp Validations', () => {
  const mockDoctor = {
    appointments: [],
    createdAt: new Date(),
    crm: 123456,
    email: 'doctor@test.com',
    id: 'doctor-id',
    name: 'Dr. Test',
    password: 'hashedPassword',
    specialty: 'Cardiology',
    updatedAt: new Date(),
  };

  const mockPatient = {
    appointments: [],
    birthDate: '1990-01-01',
    cellphone: '+1234567890',
    createdAt: new Date(),
    email: 'patient@test.com',
    id: 'patient-id',
    name: 'Patient Test',
    password: 'hashedPassword',
    updatedAt: new Date(),
  };

  const mockPatientInAppointment = {
    birthDate: '1990-01-01',
    cellphone: '+1234567890',
    email: 'patient@test.com',
    id: 'patient-id',
    name: 'Patient Test',
  };

  const mockAppointment = {
    createdAt: new Date(),
    date: '25/12/2024',
    doctor: mockDoctor,
    hour: '14:30',
    id: 'appointment-id',
    patient: mockPatientInAppointment,
    updatedAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Create appointment - Date validations', () => {
    const validAppointmentData = {
      date: '25/12/2024',
      doctorId: 'doctor-id',
      hour: '14:30',
      patientId: 'patient-id',
    };

    beforeEach(() => {
      mockDoctorsRepository.findById.mockResolvedValue(mockDoctor);
      mockPatientsRepository.findById.mockResolvedValue(mockPatient);
      mockAppointmentsRepository.findAppointmentsByFilter.mockResolvedValue(null);
    });

    it('should throw error for past date', async () => {
      jest.setSystemTime(new Date('2024-12-26T10:00:00'));

      const pastAppointment = {
        ...validAppointmentData,
        date: '24/12/2024',
      };

      await expect(appointmentsService.create(pastAppointment)).rejects.toThrow(
        new HttpError(
          statusCode.BAD_REQUEST,
          errorMessages.BAD_REQUEST('Appointment date and time cannot be in the past'),
        ),
      );
    });

    it('should throw error for past time on same day', async () => {
      jest.setSystemTime(new Date('2024-12-25T15:00:00'));

      const pastTimeAppointment = {
        ...validAppointmentData,
        date: '25/12/2024',
        hour: '14:30',
      };

      await expect(appointmentsService.create(pastTimeAppointment)).rejects.toThrow(
        new HttpError(
          statusCode.BAD_REQUEST,
          errorMessages.BAD_REQUEST('Appointment date and time cannot be in the past'),
        ),
      );
    });

    it('should throw error for appointment in year greater then currentYear + 1', async () => {
      jest.setSystemTime(new Date('2024-12-25T10:00:00'));

      const wrongYearAppointment = {
        ...validAppointmentData,
        date: '25/12/2026',
      };

      await expect(appointmentsService.create(wrongYearAppointment)).rejects.toThrow(
        new HttpError(
          statusCode.BAD_REQUEST,
          errorMessages.BAD_REQUEST(
            'Appointments can only be scheduled for the current year (2024)',
          ),
        ),
      );
    });

    it('should throw error for invalid date format', async () => {
      jest.setSystemTime(new Date('2024-12-20T10:00:00'));

      const invalidDateAppointment = {
        ...validAppointmentData,
        date: '2024-12-25',
      };

      await expect(appointmentsService.create(invalidDateAppointment)).rejects.toThrow(
        new HttpError(
          statusCode.BAD_REQUEST,
          errorMessages.BAD_REQUEST('Invalid date format. Expected DD/MM/YYYY'),
        ),
      );
    });

    it('should throw error for invalid hour format', async () => {
      jest.setSystemTime(new Date('2024-12-20T10:00:00'));

      const invalidHourAppointment = {
        ...validAppointmentData,
        hour: '2:30 PM', // Wrong format
      };

      await expect(appointmentsService.create(invalidHourAppointment)).rejects.toThrow(
        new HttpError(
          statusCode.BAD_REQUEST,
          errorMessages.BAD_REQUEST('Invalid time format. Expected HH:MM'),
        ),
      );
    });

    it('should create appointment successfully for valid future date', async () => {
      jest.setSystemTime(new Date('2024-12-20T10:00:00'));

      mockAppointmentsRepository.create.mockResolvedValue(mockAppointment);

      const result = await appointmentsService.create(validAppointmentData);

      expect(result).toEqual(mockAppointment);
    });
  });

  describe('Cancel appointment - 2 hours validation', () => {
    it('should throw error when trying to cancel within 2 hours', async () => {
      // Set current time to December 25, 2024, 13:00 (1.5 hours before appointment)
      jest.setSystemTime(new Date('2024-12-25T13:00:00'));

      mockAppointmentsRepository.findById.mockResolvedValue(mockAppointment);

      await expect(appointmentsService.remove('appointment-id')).rejects.toThrow(
        new HttpError(
          statusCode.BAD_REQUEST,
          errorMessages.BAD_REQUEST(
            'Cannot cancel appointment within 2 hours of the scheduled time',
          ),
        ),
      );
    });

    it('should throw error when trying to cancel appointment that already passed', async () => {
      // Set current time to December 25, 2024, 16:00 (after appointment)
      jest.setSystemTime(new Date('2024-12-25T16:00:00'));

      mockAppointmentsRepository.findById.mockResolvedValue(mockAppointment);

      await expect(appointmentsService.remove('appointment-id')).rejects.toThrow(
        new HttpError(
          statusCode.BAD_REQUEST,
          errorMessages.BAD_REQUEST(
            'Cannot cancel appointment within 2 hours of the scheduled time',
          ),
        ),
      );
    });

    it('should cancel appointment successfully when more than 2 hours before', async () => {
      jest.setSystemTime(new Date('2024-12-25T12:00:00'));

      mockAppointmentsRepository.findById.mockResolvedValue(mockAppointment);
      mockAppointmentsRepository.remove.mockResolvedValue({ affected: 1, raw: [] } as DeleteResult);

      await appointmentsService.remove('appointment-id');

      expect(mockAppointmentsRepository.remove).toHaveBeenCalledWith('appointment-id');
    });

    it('should throw error when exactly 2 hours before appointment', async () => {
      // Set current time to December 25, 2024, 12:30 (exactly 2 hours before)
      jest.setSystemTime(new Date('2024-12-25T12:30:00'));

      mockAppointmentsRepository.findById.mockResolvedValue(mockAppointment);

      await expect(appointmentsService.remove('appointment-id')).rejects.toThrow(
        new HttpError(
          statusCode.BAD_REQUEST,
          errorMessages.BAD_REQUEST(
            'Cannot cancel appointment within 2 hours of the scheduled time',
          ),
        ),
      );
    });

    it('should throw error for appointment with incomplete date data', async () => {
      const incompleteAppointment = {
        ...mockAppointment,
        date: undefined,
      };

      mockAppointmentsRepository.findById.mockResolvedValue(incompleteAppointment);

      await expect(appointmentsService.remove('appointment-id')).rejects.toThrow(
        new HttpError(
          statusCode.BAD_REQUEST,
          errorMessages.BAD_REQUEST('Appointment date is incomplete'),
        ),
      );
    });

    it('should throw error for appointment with incomplete hour data', async () => {
      const incompleteAppointment = {
        ...mockAppointment,
        hour: undefined,
      };

      mockAppointmentsRepository.findById.mockResolvedValue(incompleteAppointment);

      await expect(appointmentsService.remove('appointment-id')).rejects.toThrow(
        new HttpError(
          statusCode.BAD_REQUEST,
          errorMessages.BAD_REQUEST('Appointment date is incomplete'),
        ),
      );
    });
  });

  describe('Update appointment - Date validations', () => {
    const updateData = {
      date: '26/12/2024',
      hour: '15:00',
    };

    beforeEach(() => {
      mockAppointmentsRepository.findById.mockResolvedValue(mockAppointment);
      mockAppointmentsRepository.findAppointmentsByFilter.mockResolvedValue(null);
    });

    it('should throw error when updating to past date', async () => {
      jest.setSystemTime(new Date('2024-12-27T10:00:00'));

      await expect(appointmentsService.update('appointment-id', updateData)).rejects.toThrow(
        new HttpError(
          statusCode.BAD_REQUEST,
          errorMessages.BAD_REQUEST('Appointment date and time cannot be in the past'),
        ),
      );
    });

    it('should throw error when updating date without hour', async () => {
      jest.setSystemTime(new Date('2024-12-20T10:00:00'));

      const invalidUpdate = {
        date: '26/12/2024',
        // hour missing
      };

      await expect(appointmentsService.update('appointment-id', invalidUpdate)).rejects.toThrow(
        new HttpError(
          statusCode.BAD_REQUEST,
          errorMessages.BAD_REQUEST('Cannot update appointment without hour'),
        ),
      );
    });

    it('should update appointment successfully with valid future date', async () => {
      jest.setSystemTime(new Date('2024-12-20T10:00:00'));

      const updatedAppointment = {
        ...mockAppointment,
        date: '26/12/2024',
        hour: '15:00',
      };

      mockAppointmentsRepository.update.mockResolvedValue(updatedAppointment);

      const result = await appointmentsService.update('appointment-id', updateData);

      expect(result).toEqual(updatedAppointment);
      expect(mockAppointmentsRepository.update).toHaveBeenCalledWith('appointment-id', {
        date: '26/12/2024',
        hour: '15:00',
      });
    });
  });

  describe('Edge cases for date parsing', () => {
    it('should handle leap year dates correctly', async () => {
      jest.setSystemTime(new Date('2024-02-28T10:00:00'));

      const leapYearAppointment = {
        date: '29/02/2024',
        doctorId: 'doctor-id',
        hour: '14:30',
        patientId: 'patient-id',
      };

      mockDoctorsRepository.findById.mockResolvedValue(mockDoctor);
      mockPatientsRepository.findById.mockResolvedValue(mockPatient);
      mockAppointmentsRepository.findAppointmentsByFilter.mockResolvedValue(null);
      mockAppointmentsRepository.create.mockResolvedValue({
        ...mockAppointment,
        date: '29/02/2024',
      });

      const result = await appointmentsService.create(leapYearAppointment);

      expect(result.date).toBe('29/02/2024');
    });

    it('should handle midnight appointments correctly', async () => {
      jest.setSystemTime(new Date('2024-12-24T23:30:00'));

      const midnightAppointment = {
        date: '25/12/2024',
        doctorId: 'doctor-id',
        hour: '00:00',
        patientId: 'patient-id',
      };

      mockDoctorsRepository.findById.mockResolvedValue(mockDoctor);
      mockPatientsRepository.findById.mockResolvedValue(mockPatient);
      mockAppointmentsRepository.findAppointmentsByFilter.mockResolvedValue(null);
      mockAppointmentsRepository.create.mockResolvedValue({
        ...mockAppointment,
        hour: '00:00',
      });

      const result = await appointmentsService.create(midnightAppointment);

      expect(result.hour).toBe('00:00');
    });

    it('should handle end of day appointments correctly', async () => {
      jest.setSystemTime(new Date('2024-12-24T10:00:00'));

      const endOfDayAppointment = {
        date: '25/12/2024',
        doctorId: 'doctor-id',
        hour: '23:59',
        patientId: 'patient-id',
      };

      mockDoctorsRepository.findById.mockResolvedValue(mockDoctor);
      mockPatientsRepository.findById.mockResolvedValue(mockPatient);
      mockAppointmentsRepository.findAppointmentsByFilter.mockResolvedValue(null);
      mockAppointmentsRepository.create.mockResolvedValue({
        ...mockAppointment,
        hour: '23:59',
      });

      const result = await appointmentsService.create(endOfDayAppointment);

      expect(result.hour).toBe('23:59');
    });
  });

  describe('Boundary conditions for 2-hour cancellation rule', () => {
    it('should allow cancellation at exactly 2 hours and 1 minute before', async () => {
      jest.setSystemTime(new Date('2024-12-25T12:29:00'));

      mockAppointmentsRepository.findById.mockResolvedValue(mockAppointment);
      mockAppointmentsRepository.remove.mockResolvedValue({ affected: 1, raw: [] } as DeleteResult);

      await appointmentsService.remove('appointment-id');

      expect(mockAppointmentsRepository.remove).toHaveBeenCalledWith('appointment-id');
    });

    it('should reject cancellation at exactly 1 hour and 59 minutes before', async () => {
      // Set current time to December 25, 2024, 12:31 (1 hour and 59 minutes before)
      jest.setSystemTime(new Date('2024-12-25T12:31:00'));

      mockAppointmentsRepository.findById.mockResolvedValue(mockAppointment);

      await expect(appointmentsService.remove('appointment-id')).rejects.toThrow(
        new HttpError(
          statusCode.BAD_REQUEST,
          errorMessages.BAD_REQUEST(
            'Cannot cancel appointment within 2 hours of the scheduled time',
          ),
        ),
      );
    });
  });
});
