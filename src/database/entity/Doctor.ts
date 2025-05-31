import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Appointment } from './Appointment';

@Entity()
export class DoctorModel {
  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments: Appointment[];

  @Column({ type: 'int' })
  crm: number;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ length: 100, type: 'varchar' })
  specialty: string;
}
