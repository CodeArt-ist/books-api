import { Module } from '@nestjs/common';
import { ReviewsModule } from './reviews/reviews.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/user.entity';
import { Reviews } from './reviews/entities/reviews.entity';
import * as config from 'config';

const dbConfig = config.get('db');

@Module({
  imports: [
    ReviewsModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: dbConfig.type,
      host: dbConfig.host,
      port: dbConfig.port,
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
      entities: [User, Reviews],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
