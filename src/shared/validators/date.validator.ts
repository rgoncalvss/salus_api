import { errorMessages } from '../enums/error-messages';
import { HttpError } from '../errors/http-error';
import { statusCode } from '../status-code/status-code';

export const parseAppointmentDate = (dateString: string): Date => {
  const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = dateRegex.exec(dateString);

  if (!match) {
    throw new HttpError(
      statusCode.BAD_REQUEST,
      errorMessages.BAD_REQUEST('Invalid date format. Expected DD/MM/YYYY'),
    );
  }

  const [, day, month, year] = match;
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

  // Verify is its a valid date, invalidate dates that are equal: 31/02, 32/01, etc.
  if (
    date.getDate() !== parseInt(day) ||
    date.getMonth() !== parseInt(month) - 1 ||
    date.getFullYear() !== parseInt(year)
  ) {
    throw new HttpError(statusCode.BAD_REQUEST, errorMessages.BAD_REQUEST('Invalid date'));
  }

  return date;
};

export const validateAppointmentDate = (dateString: string): Date => {
  const appointmentDate = parseAppointmentDate(dateString);
  const today = new Date();
  const currentYear = today.getFullYear();

  today.setHours(0, 0, 0, 0);
  appointmentDate.setHours(0, 0, 0, 0);

  if (appointmentDate < today) {
    throw new HttpError(
      statusCode.BAD_REQUEST,
      errorMessages.BAD_REQUEST('Appointment date cannot be in the past'),
    );
  }

  if (appointmentDate.getFullYear() !== currentYear) {
    throw new HttpError(
      statusCode.BAD_REQUEST,
      errorMessages.BAD_REQUEST(
        `Appointments can only be scheduled for the current year (${currentYear.toString()})`,
      ),
    );
  }

  return appointmentDate;
};
