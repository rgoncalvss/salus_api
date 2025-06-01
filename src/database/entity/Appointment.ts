import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { DoctorModel } from './Doctor';
import { PatientModel } from './Patient';

@Entity()
export class AppointmentModel {
  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @Column({ type: 'varchar' })
  date: string;

  @JoinColumn({ name: 'doctorId', referencedColumnName: 'id' })
  @ManyToOne(() => DoctorModel, (doctor) => doctor.appointments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  doctor: DoctorModel;

  @Column({ type: 'varchar' })
  hour: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @JoinColumn({ name: 'patientId', referencedColumnName: 'id' })
  @ManyToOne(() => PatientModel, (patient) => patient.appointments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  patient: PatientModel;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}
