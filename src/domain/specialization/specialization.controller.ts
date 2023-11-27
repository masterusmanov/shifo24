import { UseGuards } from '@nestjs/common';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorator/user.decorator';
import { UserPayload } from 'src/dtos/userPayload.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthSwagger } from 'src/swagger/shared.swagger';
import { GetSearchSpecSwagger } from '../user/dtos/swagger/swagger.decorator';
import { DoctorSearchDto } from '../user/dtos/user.dto';
import { GetSpecDoctorsDto, GetSymptomDoctorsDto } from './dto/spec.dto';
import { SpecializationService } from './specialization.service';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

@ApiTags('specialization')
@Controller('spec')
export class SpecializationController {
  constructor(private readonly specService: SpecializationService) {}

  @Get('popular')
  async getPopularSpecs() {
    return this.specService.getPopularSpecs();
  }

  @Get('doctors')
  @UseGuards(AuthenticationGuard)
  @AuthSwagger()
  async getSpecDoctors(
    @Query() params: GetSpecDoctorsDto,
    @CurrentUser() user: UserPayload,
  ) {
    return this.specService.getSpecDoctors(params, user);
  }

  @Get('all-doctors')
  @UseGuards(AuthenticationGuard)
  @AuthSwagger()
  async getAllDoctorsByRate(
    @Query() params: PaginationDto,
    @CurrentUser() user: UserPayload,
  ) {
    return this.specService.getAllDoctorsByRate(params, user);
  }

  @Get('symptom/doctors')
  @UseGuards(AuthenticationGuard)
  @AuthSwagger()
  async getSymptomDoctors(
    @Query() params: GetSymptomDoctorsDto,
    @CurrentUser() user: UserPayload,
  ) {
    return this.specService.getSymptomDoctors(params, user);
  }

  @UseGuards(AuthenticationGuard)
  @GetSearchSpecSwagger()
  @Get('spec-search')
  async specSearch(@Query() params: DoctorSearchDto) {
    return this.specService.specSearch(params);
  }

  @Get('symptom')
  async getAllSymptoms() {
    return this.specService.getAllSypmtoms();
  }

  @Get()
  async getAllSpecializations() {
    return this.specService.getAllSpecializations();
  }
}
