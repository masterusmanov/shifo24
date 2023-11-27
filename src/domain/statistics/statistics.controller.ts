import { Controller, Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorator/user.decorator';
import { UserPayload } from 'src/dtos/userPayload.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthSwagger } from 'src/swagger/shared.swagger';
import { StatisticsService } from './statistics.service';

@ApiTags('statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) { }

  @UseGuards(AuthenticationGuard)
  @AuthSwagger()
  @Get('monthly-profile-views')
  async getOneDoctorProfileMonthlyViews(@CurrentUser() user: UserPayload) {
    return this.statisticsService.getOneDoctorProfileMonthlyViews(user)
  }

  @UseGuards(AuthenticationGuard)
  @AuthSwagger()
  @Get('weekly-profile-views')
  async getOneDoctorProfileWeeklyViews(@CurrentUser() user: UserPayload) {
    return this.statisticsService.getOneDoctorProfileWeeklyViews(user)
  }
}
