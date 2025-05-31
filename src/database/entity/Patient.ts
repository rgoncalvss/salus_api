import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Appointment } from './Appointment';

@Entity()
export class PatientModel {
  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];

  @Column({ type: 'varchar' })
  birthDate: string;

  @Column({ type: 'varchar' })
  cellphone?: string;

  @Column({ length: 100, type: 'varchar' })
  email: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  password: string;
}
