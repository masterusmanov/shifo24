import { Injectable } from '@nestjs/common';
import { UserPayload } from 'src/dtos/userPayload.dto';
import { DoctorSearchDto } from '../user/dtos/user.dto';
import { GetSpecDoctorsDto, GetSymptomDoctorsDto } from './dto/spec.dto';
import { SpecializationRepo } from './specialization.repo';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

@Injectable()
export class SpecializationService {
  constructor(private readonly specRepo: SpecializationRepo) { }

  async getPopularSpecs() {
    return this.specRepo.getPopularSpecs();
  }

  async getSpecDoctors(params: GetSpecDoctorsDto, user: UserPayload) {
    return this.specRepo.getSpecDoctors(params, user);
  }

  async getAllDoctorsByRate(params: PaginationDto, user: UserPayload) {
    return this.specRepo.getAllDoctorsByRate(params, user);
  }

  async getSymptomDoctors(params: GetSymptomDoctorsDto, user: UserPayload) {
    return this.specRepo.getSymptomDoctors(params, user);
  }

  async specSearch(params: DoctorSearchDto) {
    return this.specRepo.specSearch(params);
  }

  async getAllSypmtoms() {
    return this.specRepo.getAllSypmtoms();
  }

  async getAllSpecializations() {
    return this.specRepo.getAllSpecializations();
  }
}
