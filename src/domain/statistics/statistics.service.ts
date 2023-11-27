import { Injectable } from '@nestjs/common';
import { UserPayload } from 'src/dtos/userPayload.dto';
import { StatisticView } from 'src/schemas/view.schema';
import { SetViewDto } from './dto/statistics.dto';
import { StatisticsRepo } from './statistics.repo';

@Injectable()
export class StatisticsService {
  constructor(private readonly statisticsRepo: StatisticsRepo) {}

  async setView(params: SetViewDto, user: UserPayload) {
    const lastView = (await this.statisticsRepo.checkLastUserView(
      params,
      user,
    )) as StatisticView;
    const dateOffset = 86400000; // one day in milliseconds

    if (Date.now() < lastView?.['createdAt'] - 1 + dateOffset) {
      return true;
    }

    return this.statisticsRepo.setView(params, user);
  }

  async getOneDoctorProfileMonthlyViews(user: UserPayload) {
    const dateOffset = 86400000; // one day in milliseconds
    const stat = await this.statisticsRepo.getOneDoctorProfileMonthlyViews(
      user,
    );

    const data = [];

    for (let i = 0; i <= 29; i++) {
      data[i] = {
        view: stat[
          `${new Date(Date.now() - (i + 1) * dateOffset).toDateString()}`
        ]
          ? stat[
              `${new Date(Date.now() - (i + 1) * dateOffset).toDateString()}`
            ]
          : 0,
        date: new Date(Date.now() - (i + 1) * dateOffset),
      };
    }

    return data;

    // return {
    //   week: stat?.week ? stat?.week : 0,
    //   month: stat?.month ? stat?.month : 0,
    //   last_month: stat?.last_month ? stat?.last_month : 0
    // }
  }

  async getOneDoctorProfileWeeklyViews(user: UserPayload) {
    const dateOffset = 86400000; // one day in milliseconds
    const stat = await this.statisticsRepo.getOneDoctorProfileWeeklyViews(user);

    const data = [];

    for (let i = 0; i <= 6; i++) {
      data[i] = {
        view: stat[
          `${new Date(Date.now() - (i + 1) * dateOffset).toDateString()}`
        ]
          ? stat[
              `${new Date(Date.now() - (i + 1) * dateOffset).toDateString()}`
            ]
          : 0,
        date: new Date(Date.now() - (i + 1) * dateOffset),
      };
    }

    return data;
  }
}
