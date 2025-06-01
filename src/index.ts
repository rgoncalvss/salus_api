import express from 'express';
import 'reflect-metadata';

import { errorHandler } from '../src/shared/middlewares/errors';
import { AppDataSource } from './database/data-source';
import appointmentsRoute from './modules/appointments/routes/appointments.route';
import authRoute from './modules/auth/routes/auth.route';
import doctorsRoute from './modules/doctors/routes/doctors.route';
import patientsRoute from './modules/patients/routes/patients.route';

AppDataSource.initialize()
  .then(() => {
    console.log('Database connection established successfully');
  })
  .catch((error: unknown) => {
    console.log(error);
  });

const app = express();
const port = process.env.PORT ?? '9001';

app.use(express.json());
app.use('/patients', patientsRoute);
app.use('/doctors', doctorsRoute);
app.use('/appointments', appointmentsRoute);
app.use('/auth', authRoute);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
