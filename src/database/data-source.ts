/* eslint-disable no-constant-binary-expression */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { AppointmentModel } from './entity/Appointment';
import { DoctorModel } from './entity/Doctor';
import { PatientModel } from './entity/Patient';

export const AppDataSource = new DataSource({
  database: process.env.DATABASE_NAME ?? 'salus',
  entities: [DoctorModel, PatientModel, AppointmentModel],
  host: process.env.DATABASE_HOST ?? 'localhost',
  logging: false,
  migrations: [],
  password: process.env.DATABASE_PASSWORD ?? 'admin',
  port: Number(process.env.DATABASE_PORT) ?? 5432,
  subscribers: [],
  synchronize: true,
  type: 'postgres',
  username: process.env.DATABASE_USERNAME ?? 'postgres',
});
