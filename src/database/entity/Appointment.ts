import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { DoctorModel } from './Doctor';
import { PatientModel } from './Patient';

@Entity()
export class Appointment {
  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @Column({ type: 'int' })
  crm: number;

  @Column({ type: 'date' })
  date: string;

  @OneToMany(() => DoctorModel, (doctor) => doctor.appointments)
  doctor: DoctorModel;

  @Column({ type: 'time' })
  hour: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => PatientModel, (patient) => patient.appointments)
  patient: PatientModel;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}
