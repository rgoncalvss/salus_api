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
export class DoctorModel {
  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments: Appointment[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @Column({ type: 'int' })
  crm: number;

  @Column({ length: 100, type: 'varchar' })
  email: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ length: 100, type: 'varchar' })
  specialty: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}
