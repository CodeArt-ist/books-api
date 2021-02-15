import { HttpModule, Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Book]), HttpModule],
  controllers: [BookController],
  providers: [BookService],
  exports: [TypeOrmModule],
})
export class BookModule {}
