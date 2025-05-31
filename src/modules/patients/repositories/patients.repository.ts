import { Repository } from 'typeorm';

import { AppDataSource } from '../../../database/data-source';
import { PatientModel } from '../../../database/entity/Patient';
import { Patient } from '../types/patient.interface';

class PatientsRepository {
  private repository: Repository<PatientModel>;

  constructor() {
    this.repository = AppDataSource.getRepository(PatientModel);
  }

  async create(patient: Omit<Patient, 'appointments' | 'id'>): Promise<Patient> {
    const newPatient = this.repository.create(patient);
    return await this.repository.save(newPatient);
  }

  async findAll(): Promise<PatientModel[]> {
    return await this.repository.find();
  }

  async findByEmail(email: string): Promise<null | PatientModel> {
    return await this.repository.findOneBy({ email });
  }

  async findById(id: string): Promise<null | PatientModel> {
    return await this.repository.findOneBy({ id });
  }

  async remove(user: PatientModel): Promise<void> {
    await this.repository.remove(user);
  }

  async update(
    user: PatientModel,
    data: Omit<Partial<Patient>, 'appointments' | 'id'>,
  ): Promise<PatientModel> {
    this.repository.merge(user, data);
    return await this.repository.save(user);
  }
}

export default new PatientsRepository();
