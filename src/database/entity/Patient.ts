import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Appointment } from './Appointment';

@Entity()
export class Patient {
  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];

  @Column()
  birth_date: string;

  @Column()
  cellphone: number;

  @Column()
  email: string;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
