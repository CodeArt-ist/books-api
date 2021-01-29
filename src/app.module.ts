import { Module } from '@nestjs/common';
import { ReviewsModule } from './reviews/reviews.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ReviewsModule, AuthModule],
})
export class AppModule {}
