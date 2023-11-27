import {
  Controller,
  Query,
  Post,
  Get,
  Body,
  UseGuards,
  Delete,
  Patch,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/enums/role.enum';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import {
  AdminAuthSwagger,
  SuperAdminAuthSwagger,
} from 'src/swagger/shared.swagger';
import { AdminRegisterPhoneDto } from '../auth/dtos/register.dto';
import { AdminService } from './admin.service';
import {
  ApplicationAcceptOrRejectDto,
  DeleteOrUpdateOneElement,
  SearchListDto,
} from './dtos/admin.dto';
import { DeleteIconDto, IconDto } from './dtos/icon.dto';
import { SpecializationDto, UpdateSpecDto } from './dtos/specialization.dto';
import { UpdateStateDto } from './dtos/state.dto';
import { SymptomDto, UpdateSymptomDto } from './dtos/symptom.dto';
import { State } from './schemas/states.schema';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(AuthorizationGuard)
  @Roles(Role.SuperAdmin)
  @SuperAdminAuthSwagger()
  @Post('add-admin')
  async addAdmin(@Body() params: AdminRegisterPhoneDto) {
    return this.adminService.addAdmin(params);
  }

  @UseGuards(AuthorizationGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @AdminAuthSwagger()
  @Post('specialization')
  async addSpecialization(@Body() data: SpecializationDto) {
    return this.adminService.createSpecialization(data);
  }

  @UseGuards(AuthorizationGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @AdminAuthSwagger()
  @Get('specialization')
  async getAllSpecializations(@Query() params: PaginationDto) {
    return this.adminService.getAllSpecializations(params);
  }

  @UseGuards(AuthorizationGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @AdminAuthSwagger()
  @Patch('specialization')
  async updateSpec(
    @Query() params: DeleteOrUpdateOneElement,
    @Body() data: UpdateSpecDto,
  ) {
    return this.adminService.updateSpec(params, data);
  }

  @UseGuards(AuthorizationGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @AdminAuthSwagger()
  @Delete('specialization')
  async deleteSpecialization(@Query() params: DeleteOrUpdateOneElement) {
    return this.adminService.deleteSpec(params);
  }

  @UseGuards(AuthorizationGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @AdminAuthSwagger()
  @Get('specialization/:id')
  async getOneSpecialization(@Param('id') id: string) {
    return this.adminService.getOneSpecizalization(id);
  }


  @UseGuards(AuthorizationGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @AdminAuthSwagger()
  @Post('symptom')
  async addSymptom(@Body() data: SymptomDto) {
    return this.adminService.createSymptom(data);
  }

  @UseGuards(AuthorizationGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @AdminAuthSwagger()
  @Patch('symptom')
  async updateSymptom(
    @Query() params: DeleteOrUpdateOneElement,
    @Body() data: UpdateSymptomDto,
  ) {
    return this.adminService.updateSymptom(params, data);
  }

  @UseGuards(AuthorizationGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @AdminAuthSwagger()
  @Get('symptom')
  async getAllSymptoms(@Query() params: SearchListDto) {
    return this.adminService.getAllSypmtoms(params);
  }

  @UseGuards(AuthorizationGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @AdminAuthSwagger()
  @Delete('symptom')
  async deleteSymptom(@Query() params: DeleteOrUpdateOneElement) {
    return this.adminService.deleteSymptom(params);
  }

  @UseGuards(AuthorizationGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @AdminAuthSwagger()
  @Get('symptom/:id')
  async getOneSymptom(@Param('id') id: string) {
    return this.adminService.getOneSymptom(id);
  }

  @UseGuards(AuthorizationGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @AdminAuthSwagger()
  @Post('country')
  async addCountry(@Body() data: State) {
    return this.adminService.createCountry(data);
  }

  @UseGuards(AuthorizationGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @AdminAuthSwagger()
  @Patch('country')
  async updateCountry(
    @Query() params: DeleteOrUpdateOneElement,
    @Body() data: UpdateStateDto,
  ) {
    return this.adminService.updateCountry(params, data);
  }

  @Get('country')
  async getAllCountries(@Query() params: PaginationDto) {
    return this.adminService.getAllCountries(params);
  }

  @UseGuards(AuthorizationGuard)
  @Roles(Role.SuperAdmin, Role.Admin)
  @AdminAuthSwagger()
  @Post('application-status')
  async applicationStatus(
    @Query() params: DeleteOrUpdateOneElement,
    @Body() data: ApplicationAcceptOrRejectDto,
  ) {
    return this.adminService.applicationStatus(params, data);
  }

  @UseGuards(AuthorizationGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @AdminAuthSwagger()
  @Get('pending-list')
  async getPendingDoctorsList(@Query() params: SearchListDto) {
    return this.adminService.getPendingDoctorsList(params);
  }

  @UseGuards(AuthorizationGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @AdminAuthSwagger()
  @Post('icons')
  async addIcon(@Body() params: IconDto) {
    return this.adminService.addIcon(params);
  }

  @UseGuards(AuthorizationGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @AdminAuthSwagger()
  @Get('icons')
  async getIcons(@Query() params: PaginationDto) {
    return this.adminService.getIcons(params);
  }

  @UseGuards(AuthorizationGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @AdminAuthSwagger()
  @Delete('icons')
  async deleteIcon(@Query() params: DeleteIconDto) {
    return this.adminService.deleteIcon(params);
  }

  @UseGuards(AuthorizationGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @AdminAuthSwagger()
  @Get('comments-list')
  async getCommentsList(@Query() params: PaginationDto) {
    return this.adminService.getCommentsList(params);
  }

  @UseGuards(AuthorizationGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @AdminAuthSwagger()
  @Delete('comments')
  async deleteComment(@Query() params: DeleteOrUpdateOneElement) {
    return this.adminService.deleteComment(params);
  }

  @UseGuards(AuthorizationGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @AdminAuthSwagger()
  @Get('doctor-list')
  async getDoctorsList(@Query() params: SearchListDto) {
    return this.adminService.getDoctorsList(params);
  }

  @UseGuards(AuthorizationGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @AdminAuthSwagger()
  @Get('doctor/:id')
  async getDoctorById(@Param('id') id: string) {
    return this.adminService.getUserById(id);
  }

  @UseGuards(AuthorizationGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @AdminAuthSwagger()
  @Get('client-list')
  async getClientsList(@Query() params: SearchListDto) {
    return this.adminService.getClientsList(params);
  }

  @UseGuards(AuthorizationGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @AdminAuthSwagger()
  @Get('client/:id')
  async getClientById(@Param('id') id: string) {
    return this.adminService.getUserById(id);
  }
}
