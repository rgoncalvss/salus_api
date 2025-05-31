import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Appointment } from './Appointment';

@Entity()
export class PatientModel {
  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];

  @Column({ type: 'varchar' })
  birthDate: string;

  @Column({ type: 'varchar' })
  cellphone?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @Column({ length: 100, type: 'varchar' })
  email: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  password: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}
