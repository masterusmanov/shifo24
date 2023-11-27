import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './domain/auth/auth.module';
import { ChatModule } from './domain/chat/chat.module';
import { AdminModule } from './domain/admin/admin.module';
import { UserModule } from './domain/user/user.module';
import { SpecializationModule } from './domain/specialization/specialization.module';
import { CommentModule } from './domain/comment/comment.module';
import { StatisticsModule } from './domain/statistics/statistics.module';
// import { FirebaseService } from './shared/firebase/firebase.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://fulan:uT97H5jyHWqmNJQN@cluster0.s89td0q.mongodb.net/?retryWrites=true&w=majority',
    ),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({ isGlobal: true }),
    AuthModule,
    ChatModule,
    AdminModule,
    UserModule,
    SpecializationModule,
    CommentModule,
    StatisticsModule,
  ],
  // providers: [FirebaseService]
})
export class AppModule {}
