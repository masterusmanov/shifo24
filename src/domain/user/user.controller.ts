import {
  Controller,
  Get,
  Patch,
  UseGuards,
  Body,
  Delete,
  Post,
  // CACHE_MANAGER,
  Query,
  // Inject,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorator/user.decorator';
import { UserPayload } from 'src/dtos/userPayload.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthSwagger } from 'src/swagger/shared.swagger';
import { User } from '../auth/schemas/user.schema';
import {
  DeleteSavedDoctorSwagger,
  DeleteSwagger,
  getNearDoctorsSwagger,
  GetOneSwagger,
  GetOwnSwagger,
  GetSavedDoctorsSwagger,
  UpdateSwagger,
} from './dtos/swagger/swagger.decorator';
import {
  DoctorProfileUpdate,
  DoctorSearchDto,
  GetNearDoctorsDto,
  ProfileInfoDto,
  SaveDoctorDto,
} from './dtos/user.dto';
import { UserService } from './user.service';
// import { Cache } from 'cache-manager';
import { StatisticsService } from '../statistics/statistics.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    // @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly statisticService: StatisticsService,
  ) {}

  @UseGuards(AuthenticationGuard)
  @GetOwnSwagger()
  @Get()
  async getOwnProfile(@CurrentUser() user: UserPayload): Promise<User> {
    return this.userService.getProfileInfo(user.id);
  }

  @UseGuards(AuthenticationGuard)
  @GetOneSwagger()
  @Get('profile')
  async getProfileInfo(
    @Query() params: ProfileInfoDto,
    @CurrentUser() user: UserPayload,
  ): Promise<User> {
    // const cachedProfile = (await this.cacheManager.get(
    //   `${params.id}-profile`,
    // )) as User;

    await this.statisticService.setView({ doctor_id: params.id }, user);

    // if (!cachedProfile) {
    const userData = await this.userService.getProfileInfo(params.id);

    // await this.cacheManager.set(`${params.id}-profile`, user, 0);
    // }

    return userData;
  }

  @UseGuards(AuthenticationGuard)
  @UpdateSwagger()
  @Patch()
  async profileUpdate(
    @Body() params: DoctorProfileUpdate,
    @CurrentUser() user: UserPayload,
  ) {
    const updatedUser = await this.userService.profileUpdate(user.id, params);
    // await this.cacheManager.set(`${user.id}-profile`, updatedUser, 0);
    return updatedUser;
  }

  @UseGuards(AuthenticationGuard)
  @DeleteSwagger()
  @Delete()
  async profileDelete(@CurrentUser() user: UserPayload) {
    return this.userService.profileDelete(user.id);
  }

  @UseGuards(AuthenticationGuard)
  @AuthSwagger()
  @Get('doctor-search')
  async doctorSearch(
    @Query() params: DoctorSearchDto,
    @CurrentUser() user: UserPayload,
  ) {
    return this.userService.doctorSearch(params, user);
  }

  @UseGuards(AuthenticationGuard)
  @GetOwnSwagger()
  @Post('save-doctor')
  async saveDoctor(
    @Query() params: SaveDoctorDto,
    @CurrentUser() user: UserPayload,
  ) {
    return this.userService.saveDoctor(user.id, params.doctor_id);
  }

  @UseGuards(AuthenticationGuard)
  @DeleteSavedDoctorSwagger()
  @Delete('saved-doctor')
  async deleteSavedDoctor(
    @Query() params: SaveDoctorDto,
    @CurrentUser() user: UserPayload,
  ) {
    return this.userService.deleteSavedDoctor(user.id, params.doctor_id);
  }

  @UseGuards(AuthenticationGuard)
  @GetSavedDoctorsSwagger()
  @Get('saved-doctors')
  async getSavedDoctors(@CurrentUser() user: UserPayload) {
    return this.userService.getSavedDoctors(user.id);
  }

  @UseGuards(AuthenticationGuard)
  @getNearDoctorsSwagger()
  @Get('nearest-doctors')
  async getNearDoctors(@Query() params: GetNearDoctorsDto) {
    return this.userService.getNearDoctors(params);
  }
}
