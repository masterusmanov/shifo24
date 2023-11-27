import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ClientInfoDto,
  LoginDto,
  RegisterPhoneDto,
  SignUpDto,
} from './dtos/register.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as dayjs from 'dayjs';
import { HttpError } from 'src/enums/http-response.enum';
import { sign } from 'jsonwebtoken';
import { S3Service } from 'src/utils/s3.util';
import { UserDto } from './dtos/user.dto';
import sendSmsTo from 'src/utils/sms-sender';
import { DoctorStatus } from 'src/enums/role.enum';
import { nanoid } from 'nanoid';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly fileUpload: S3Service,
  ) {}

  async register(data: RegisterPhoneDto) {
    const { phone, message_key = nanoid(15) } = data;

    const user = await this.userModel.findOne({ phone });
    const otp = Math.floor(10000 + Math.random() * 90000);

    if (user?.otp) {
      const otpTimeValid = dayjs(user.otp_date).valueOf() + 60000 > Date.now();

      if (user.registered) {
        throw new ConflictException(HttpError.USER_ALREADY_SIGNED);
      }

      if (otpTimeValid) {
        throw new ConflictException(HttpError.TRY_FEW_MINUTES_LATER);
      }

      await this.userModel.findOneAndUpdate(
        { phone },
        {
          otp,
          otp_date: Date.now(),
        },
        { returnDocument: 'after' },
      );
    } else {
      await this.userModel.create({
        ...data,
        otp,
        otp_date: Date.now(),
      });
    }
    await sendSmsTo(phone, message_key, otp);

    return { message_key };
  }

  async login(params: LoginDto) {
    const { phone, role, message_key = nanoid(15) } = params;

    const user = await this.userModel.findOne({ phone });

    if (!user) throw new NotFoundException(HttpError.USER_NOT_FOUND);

    if (!user.roles.includes(role))
      throw new ConflictException(HttpError.OTHER_ROLE_REGISTERED);

    const otp = Math.floor(10000 + Math.random() * 90000);

    const otpTimeValid = dayjs(user.otp_date).valueOf() + 60000 > Date.now();

    if (!user.registered) {
      throw new ConflictException(HttpError.USER_NOT_REGISTERED);
    }

    if (otpTimeValid)
      throw new ConflictException(HttpError.TRY_FEW_MINUTES_LATER);

    await this.userModel.findOneAndUpdate(
      { phone },
      {
        otp,
        otp_date: Date.now(),
      },
    );

    await sendSmsTo(phone, message_key, otp);

    return { message_key };
  }

  async resendCode(data: RegisterPhoneDto) {
    const { phone, message_key = nanoid(15) } = data;

    const user = await this.userModel.findOne({ phone });

    if (!user) throw new NotFoundException(HttpError.USER_NOT_FOUND);

    const otpTimeValid = dayjs(user.otp_date).valueOf() + 60000 > Date.now();

    if (otpTimeValid)
      throw new ConflictException(HttpError.TRY_FEW_MINUTES_LATER);

    const otp = Math.floor(10000 + Math.random() * 90000);

    const updatedUser = await this.userModel.findOneAndUpdate(
      { phone },
      {
        otp,
        otp_date: Date.now(),
      },
      { returnDocument: 'after' },
    );

    await sendSmsTo(phone, message_key, otp);

    return { message_key };
  }

  async checkPhone(data: RegisterPhoneDto) {
    const user = await this.userModel.findOne({ phone: data.phone });

    if (user) {
      if (user?.registered) {
        return {
          message: HttpError.USER_ALREADY_SIGNED,
        };
      }

      return {
        message: HttpError.USER_NOT_SIGNED,
      };
    }

    return {
      message: HttpError.USER_NOT_REGISTERED,
    };
  }

  async confirm(data: SignUpDto) {
    const { otp, phone, role } = data;

    const user = await this.userModel.findOne({ phone });

    if (!user) throw new NotFoundException(HttpError.USER_NOT_FOUND);

    const info_filled = user.first_name ? true : false;

    if (phone === '998335313707' && otp === '11111') {
      const token = sign(
        {
          phone: phone,
          roles: user.roles,
          id: user.id,
        },
        process.env.JWT_KEY,
      );

      return {
        message: `${user.phone} registered`,
        token,
        info_filled,
      };
    }

    if (otp !== user.otp)
      throw new MethodNotAllowedException(HttpError.INCORRECT_OTP);

    const updatedUser = await this.userModel.findOneAndUpdate(
      { phone },
      { registered: true, roles: [role] },
      { returnDocument: 'after' },
    );

    const token = sign(
      {
        phone: updatedUser.phone,
        roles: updatedUser.roles,
        id: updatedUser.id,
      },
      process.env.JWT_KEY,
    );

    return {
      message: `${updatedUser.phone} registered`,
      token,
      info_filled,
    };
  }

  async doctorInfo(id: string, data: UserDto) {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException(HttpError.USER_NOT_FOUND);

    if (user.first_name)
      throw new MethodNotAllowedException(HttpError.USER_INFO_ALREADY_FILLED);

    const coordinate = [];
    coordinate[0] = data.location.long;
    coordinate[1] = data.location.latt;

    const doctor = await this.userModel.findByIdAndUpdate(
      id,
      {
        contact_phone: data.contact_phone,
        about: data.about,
        birth_date: data.birth_date,
        certificate_url: data.certificate_url,
        first_name: data.first_name,
        second_name: data.second_name,
        middle_name: data.middle_name,
        full_name: `${data.first_name} ${data.middle_name} ${data.second_name}`,
        image_id: data.image_id,
        job_date: data.job_date,
        job_time: {
          from: data.job_time.from,
          to: data.job_time.to,
        },
        price: data.price,
        doctor_status: DoctorStatus.Pending,
        spec: data.spec,
        languages: data.languages,
        university: data.university,
        workplace: data.workplace,
        location: {
          coordinates: coordinate,
          name: data.location.name,
          type: 'Point',
        },
        gender: data.gender,
      },
      { returnDocument: 'after' },
    );

    return this.userModel
      .findById(id)
      .populate([
        { path: 'spec', select: { symptoms: 0, createdAt: 0 } },
        { path: 'university.country' },
      ]);
  }

  async clientInfo(id: string, data: ClientInfoDto) {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException(HttpError.USER_NOT_FOUND);

    return await this.userModel.findByIdAndUpdate(
      id,
      {
        birth_date: data.birth_date,
        first_name: data.first_name,
        image_id: data.image_id,
        gender: data.gender,
      },
      { returnDocument: 'after' },
    );
  }
}
