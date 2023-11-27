import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { DoctorStatus, Role } from 'src/enums/role.enum';
import { IsString, IsDate, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from 'src/enums/gender.enum';
import { Type } from 'class-transformer';
import { Specialization } from 'src/domain/admin/schemas/specialization.schema';
import { State } from 'src/domain/admin/schemas/states.schema';
export type UserDocument = HydratedDocument<User>;

export class University {
  @ApiProperty({ type: String })
  @IsString()
  name: string;

  @ApiProperty({ type: Date })
  @IsDate()
  start: Date;

  @ApiProperty({ type: Date })
  @IsDate()
  graduate: Date;

  @ApiProperty({ type: String })
  @IsString()
  degree: string;

  @ApiProperty({ type: String })
  @IsString()
  country: string;
}

export class Location {
  @ApiProperty()
  @IsNumber()
  latt: number;

  @ApiProperty()
  @IsNumber()
  long: number;

  @ApiProperty()
  name: string;
}

export class JobTime {
  @ApiProperty()
  @IsString()
  from: string;

  @ApiProperty()
  @IsString()
  to: string;
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ type: String, unique: true })
  phone: string;

  @Prop({ type: String })
  contact_phone: string;

  @Prop({ type: Boolean, default: false })
  registered: boolean;

  @Prop({ type: String })
  otp: string;

  @Prop({ type: Date })
  otp_date: Date;

  @Prop({ type: String })
  first_name: string;

  @Prop({ type: String, required: false })
  second_name: string;

  @Prop({ type: String, required: false })
  middle_name: string;

  @Prop({ type: String, required: false })
  full_name: string;

  @Prop({ type: String, required: false })
  workplace: string;

  @Prop({ type: Array<Role> })
  roles: Array<Role>;

  @Prop({ enum: DoctorStatus })
  doctor_status: DoctorStatus;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Specialization.name,
      required: false,
    },
  ])
  @Type(() => Array<Specialization>)
  spec: Array<Specialization>;

  @Prop({ enum: Gender })
  gender: Gender;

  @Prop({ type: Date })
  birth_date: Date;

  @Prop({ type: Date })
  job_date: Date;

  @Prop({ type: JobTime })
  job_time: JobTime;

  @Prop({ type: Array<string> })
  certificate_url: Array<string>;

  @Prop({ type: Array<string> })
  languages: Array<string>;

  @Prop({
    type: [
      {
        name: { type: String },
        start: { type: Date },
        graduate: { type: Date },
        degree: { type: String },
        country: { type: mongoose.Schema.Types.ObjectId, ref: State.name },
      },
    ],
  })
  university: Array<University>;

  @Prop({ type: String })
  image_id: string;

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
    },
    name: {
      type: String,
    },
  })
  location: Location;

  @Prop({ type: String })
  about: string;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: Number })
  rate: number;

  @Prop({ type: Number })
  comments_count: number;
}

const IndexCreatedSchema = SchemaFactory.createForClass(User).index({
  location: '2dsphere',
});

export const UserSchema = IndexCreatedSchema;
