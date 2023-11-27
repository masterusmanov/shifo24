import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPayload } from 'src/dtos/userPayload.dto';
import { StatisticView, StatisticViewDocument } from 'src/schemas/view.schema';
import { SetViewDto } from './dto/statistics.dto';
import { ObjectId } from 'mongodb';
import * as dayjs from 'dayjs';

@Injectable()
export class StatisticsRepo {
  constructor(
    @InjectModel(StatisticView.name)
    private readonly statisticViewModel: Model<StatisticViewDocument>,
  ) {}

  async setView(params: SetViewDto, user: UserPayload) {
    return this.statisticViewModel.create({
      doctor_id: params.doctor_id,
      user_id: user.id,
    });
  }

  async checkLastUserView(params: SetViewDto, user: UserPayload) {
    return this.statisticViewModel
      .findOne({
        user_id: user.id,
        doctor_id: params.doctor_id,
      })
      .sort({ createdAt: -1 });
  }

  async getOneDoctorProfileMonthlyViews(user: UserPayload) {
    const dateOffset = 86400000; // one day in milliseconds

    const stat = await this.statisticViewModel.aggregate([
      {
        $facet: {
          1: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 1 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: new Date()
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          2: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 2 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 2 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          3: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 3 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 3 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          4: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 4 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 4 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          5: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 5 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 5 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          6: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 6 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 6 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          7: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 7 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 7 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          8: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 8 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 8 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          9: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 9 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 9 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          10: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 10 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 10 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          11: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 11 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 11 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          12: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 12 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 12 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          13: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 13 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 13 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          14: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 14 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 14 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          15: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 15 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 15 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          16: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 16 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 16 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          17: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 17 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 17 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          18: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 18 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 18 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          19: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 19 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 19 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          20: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 20 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 20 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          21: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 21 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 21 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          22: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 22 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 22 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          23: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 23 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 23 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          24: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 24 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 24 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          25: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 25 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 25 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          26: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 26 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 26 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          27: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 27 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 27 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          28: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 28 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 28 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          29: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 29 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 29 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          30: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 30 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 30 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          31: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 31 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 31 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
        },
      },
      {
        $project: {
          [`${new Date(Date.now() - 1 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$1.day', 0],
          },
          [`${new Date(Date.now() - 2 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$2.day', 0],
          },
          [`${new Date(Date.now() - 3 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$3.day', 0],
          },
          [`${new Date(Date.now() - 4 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$4.day', 0],
          },
          [`${new Date(Date.now() - 5 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$5.day', 0],
          },
          [`${new Date(Date.now() - 6 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$6.day', 0],
          },
          [`${new Date(Date.now() - 7 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$7.day', 0],
          },
          [`${new Date(Date.now() - 8 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$8.day', 0],
          },
          [`${new Date(Date.now() - 9 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$9.day', 0],
          },
          [`${new Date(Date.now() - 10 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$10.day', 0],
          },
          [`${new Date(Date.now() - 11 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$11.day', 0],
          },
          [`${new Date(Date.now() - 12 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$12.day', 0],
          },
          [`${new Date(Date.now() - 13 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$13.day', 0],
          },
          [`${new Date(Date.now() - 14 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$14.day', 0],
          },
          [`${new Date(Date.now() - 15 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$15.day', 0],
          },
          [`${new Date(Date.now() - 16 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$16.day', 0],
          },
          [`${new Date(Date.now() - 17 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$17.day', 0],
          },
          [`${new Date(Date.now() - 18 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$18.day', 0],
          },
          [`${new Date(Date.now() - 19 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$19.day', 0],
          },
          [`${new Date(Date.now() - 20 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$20.day', 0],
          },
          [`${new Date(Date.now() - 21 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$21.day', 0],
          },
          [`${new Date(Date.now() - 22 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$22.day', 0],
          },
          [`${new Date(Date.now() - 23 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$23.day', 0],
          },
          [`${new Date(Date.now() - 24 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$24.day', 0],
          },
          [`${new Date(Date.now() - 25 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$25.day', 0],
          },
          [`${new Date(Date.now() - 26 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$26.day', 0],
          },
          [`${new Date(Date.now() - 27 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$27.day', 0],
          },
          [`${new Date(Date.now() - 28 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$28.day', 0],
          },
          [`${new Date(Date.now() - 29 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$29.day', 0],
          },
          [`${new Date(Date.now() - 30 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$30.day', 0],
          },
          [`${new Date(Date.now() - 31 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$31.day', 0],
          },
        },
      },
    ]);

    return stat[0];
  }

  async getOneDoctorProfileWeeklyViews(user: UserPayload) {
    const dateOffset = 86400000; // one day in milliseconds

    const stat = await this.statisticViewModel.aggregate([
      {
        $facet: {
          1: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 1 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: new Date()
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          2: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 2 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 2 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          3: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 3 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 3 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          4: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 4 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 4 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          5: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 5 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 5 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          6: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 6 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 6 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
          7: [
            {
              $match: {
                doctor_id: new ObjectId(user.id),
                createdAt: {
                  $gt: dayjs(new Date(Date.now() - 7 * dateOffset)).startOf(
                    'day',
                  )['$d'],
                  $lte: dayjs(new Date(Date.now() - 7 * dateOffset)).endOf(
                    'day',
                  )['$d'],
                },
              },
            },
            {
              $count: 'day',
            },
          ],
        },
      },
      {
        $project: {
          [`${new Date(Date.now() - 1 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$1.day', 0],
          },
          [`${new Date(Date.now() - 2 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$2.day', 0],
          },
          [`${new Date(Date.now() - 3 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$3.day', 0],
          },
          [`${new Date(Date.now() - 4 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$4.day', 0],
          },
          [`${new Date(Date.now() - 5 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$5.day', 0],
          },
          [`${new Date(Date.now() - 6 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$6.day', 0],
          },
          [`${new Date(Date.now() - 7 * dateOffset).toDateString()}`]: {
            $arrayElemAt: ['$7.day', 0],
          },
        },
      },
    ]);

    return stat[0];
  }
}
