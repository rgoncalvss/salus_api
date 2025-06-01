import { Repository } from 'typeorm';

import { AppDataSource } from '../../../database/data-source';
import { DoctorModel } from '../../../database/entity/Doctor';
import { Doctor } from '../types/doctor.interface';

class DoctorsRepository {
  private repository: Repository<DoctorModel>;

  constructor() {
    this.repository = AppDataSource.getRepository(DoctorModel);
  }

  async create(
    doctor: Omit<Doctor, 'appointments' | 'createdAt' | 'id' | 'updatedAt'>,
  ): Promise<Omit<Doctor, 'appointments' | 'createdAt' | 'id' | 'updatedAt'>> {
    const newDoctor = this.repository.create(doctor);
    return await this.repository.save(newDoctor);
  }

  async findAll(): Promise<DoctorModel[]> {
    return await this.repository.find();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async findByFilter(filter: any): Promise<DoctorModel | null> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return await this.repository.findOneBy(filter);
  }

  async findById(id: string): Promise<DoctorModel | null> {
    return await this.repository.findOneBy({ id });
  }

  async remove(doctor: DoctorModel): Promise<void> {
    await this.repository.remove(doctor);
  }

  async update(
    doctor: DoctorModel,
    data: Omit<Partial<Doctor>, 'appointments' | 'createdAt' | 'id' | 'updatedAt'>,
  ): Promise<DoctorModel> {
    this.repository.merge(doctor, data);
    return await this.repository.save(doctor);
  }
}

export default new DoctorsRepository();
