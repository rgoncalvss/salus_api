import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { DoctorModel } from './Doctor';
import { PatientModel } from './Patient';

@Entity()
export class Appointment {
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
}
