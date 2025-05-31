import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Appointment } from './Appointment';

@Entity()
export class Doctor {
  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments: Appointment[];

  @Column()
  crm: number;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  specialty: string;
}
