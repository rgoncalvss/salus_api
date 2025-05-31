import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { Appointment } from './entity/Appointment';
import { Doctor } from './entity/Doctor';
import { Patient } from './entity/Patient';

export const AppDataSource = new DataSource({
  database: 'salus',
  entities: [Doctor, Patient, Appointment],
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
