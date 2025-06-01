import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { AppointmentModel } from './entity/Appointment';
import { DoctorModel } from './entity/Doctor';
import { PatientModel } from './entity/Patient';

export const AppDataSource = new DataSource({
  database: 'salus',
  entities: [DoctorModel, PatientModel, AppointmentModel],
  host: 'localhost',
  logging: false,
  migrations: [],
  password: 'admin',
  port: 5432,
  subscribers: [],
  synchronize: true,
  type: 'postgres',
  username: 'postgres',
});
