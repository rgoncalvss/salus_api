import express from 'express';
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';

import { AppDataSource } from './database/data-source';
import appointmentsRoute from './modules/appointments/routes/appointments.route';
import authRoute from './modules/auth/routes/auth.route';
import doctorsRoute from './modules/doctors/routes/doctors.route';
import patientsRoute from './modules/patients/routes/patients.route';
import { errorHandler } from './shared/middlewares/errors';
import './swagger/paths';
import swaggerSpec from './swagger/config';

AppDataSource.initialize()
  .then(() => {
    console.log('Database connection established successfully');
  })
  .catch((error: unknown) => {
    console.log(error);
  });

const app = express();
const port = process.env.PORT ?? '3000';

app.use(express.json());

// Swagger documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.use('/patients', patientsRoute);
app.use('/doctors', doctorsRoute);
app.use('/appointments', appointmentsRoute);
app.use('/auth', authRoute);

// Error handler middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`Swagger documentation available at http://localhost:${port}/docs`);
});
