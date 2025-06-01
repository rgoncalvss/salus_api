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

export const validateAppointmentDate = (dateString: string, timeString?: string): Date => {
  const appointmentDate = parseAppointmentDate(dateString);
  const now = new Date();
  const currentYear = now.getFullYear();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (timeString) {
    const timeRegex = /^(\d{2}):(\d{2})$/;
    const timeMatch = timeRegex.exec(timeString);

    if (!timeMatch) {
      throw new HttpError(
        statusCode.BAD_REQUEST,
        errorMessages.BAD_REQUEST('Invalid time format. Expected HH:MM'),
      );
    }

    const [, hours, minutes] = timeMatch;
    appointmentDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  } else {
    appointmentDate.setHours(0, 0, 0, 0);
  }

  if (appointmentDate < now) {
    throw new HttpError(
      statusCode.BAD_REQUEST,
      errorMessages.BAD_REQUEST('Appointment date and time cannot be in the past'),
    );
  }

  if (
    appointmentDate.getFullYear() < currentYear ||
    appointmentDate.getFullYear() > currentYear + 1
  ) {
    throw new HttpError(
      statusCode.BAD_REQUEST,
      errorMessages.BAD_REQUEST(
        `Appointments can only be scheduled for the current year (${currentYear.toString()})`,
      ),
    );
  }

  return appointmentDate;
};
