import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { UserPayload } from 'src/dtos/userPayload.dto';
import { HttpError } from 'src/enums/http-response.enum';
import { User } from '../auth/schemas/user.schema';
import {
  DoctorProfileUpdate,
  DoctorSearchDto,
  GetNearDoctorsDto,
} from './dtos/user.dto';
import { UserRepo } from './user.repo';
import { FirebaseService } from 'src/shared/firebase/firebase.service';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly firebaseService: FirebaseService,
  ) {}
  async getProfileInfo(id: string): Promise<User> {
    return this.userRepo.getProfileInfo(id);
  }

  async profileUpdate(id: string, params: DoctorProfileUpdate): Promise<User> {
    const user = await this.userRepo.profileUpdate(id, params);
    const userForFirebase = await this.getProfileInfo(id);

    if (user.roles.includes(Role.Client)) {
      await this.firebaseService.updateUserFirebase(user.phone, {
        full_name: user.full_name,
        first_name: userForFirebase.first_name,
        second_name: userForFirebase.second_name,
        middle_name: userForFirebase.middle_name,
        image_id: user.image_id,
        role: userForFirebase.roles,
      });
    } else {
      await this.firebaseService.updateUserFirebase(id, {
        full_name: user.full_name,
        first_name: userForFirebase.first_name,
        second_name: userForFirebase.second_name,
        middle_name: userForFirebase.middle_name,
        image_id: user.image_id,
        spec: userForFirebase.spec.map((item) => {
          return { ...item, _id: item['_id'].toString() };
        }),
        role: userForFirebase.roles,
      });
    }

    return user;
  }

  async profileDelete(id: string): Promise<any> {
    const user = await this.userRepo.profileDelete(id);

    if (user.roles.includes(Role.Client)) {
      await this.firebaseService.deleteUserFirebase({
        firebase_id: user.phone,
      });
    } else {
      await this.firebaseService.deleteUserFirebase({
        firebase_id: id,
      });
    }

    if (!user) {
      throw new NotFoundException(HttpError.USER_NOT_FOUND);
    }

    return {
      message: 'OK',
    };
  }

  async doctorSearch(params: DoctorSearchDto, user: UserPayload) {
    return this.userRepo.doctorSearch(params, user);
  }

  async saveDoctor(user_id: string, doctor_id: string) {
    return this.userRepo.saveDoctor(user_id, doctor_id);
  }

  async deleteSavedDoctor(user_id: string, doctor_id: string) {
    return this.userRepo.deleteSavedDcotor(user_id, doctor_id);
  }

  async getSavedDoctors(user_id: string) {
    return this.userRepo.getSavedDoctors(user_id);
  }

  async getNearDoctors(params: GetNearDoctorsDto) {
    return this.userRepo.getNearDoctors(params);
  }
}
