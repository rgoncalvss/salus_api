import express from 'express';
import 'reflect-metadata';

import { AppDataSource } from './database/data-source';
import { errorHandler } from './middlewares/errors';
import appointmentsRoute from './modules/appointments/routes/appointments.route';
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
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
