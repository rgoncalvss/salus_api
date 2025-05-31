import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Doctor } from './Doctor';
import { Patient } from './Patient';

@Entity()
export class Appointment {
  @Column()
  crm: number;

  @Column()
  date: string;

  @OneToMany(() => Doctor, (doctor) => doctor.appointments)
  doctor: Doctor;

  @Column()
  hour: string;

  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Patient, (patient) => patient.appointments)
  patient: Patient;
}
