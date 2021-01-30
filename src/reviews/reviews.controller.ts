import {
  Body,
  Controller,
  Delete,
  Get,
  Optional,
  Param,
  Patch,
  Post,
  Query, UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetReviewFilterDto } from './dto/get-review-filter.dto';
import {Reviews} from "./entities/reviews.entity";
import {GetUser} from "../auth/decorator/get-user.decorator";
import {User} from "../auth/entities/user.entity";
import {AuthGuard} from "@nestjs/passport";

@ApiTags('Reviews')
@Controller('reviews')
@UseGuards(AuthGuard())
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get('/')
  getAllReviews(
      @Query(ValidationPipe) filterReviewDto: GetReviewFilterDto,
      @GetUser() user: User
  ): Promise<Reviews[]> {
    if (Object.keys(filterReviewDto).length > 0) {
      return this.reviewsService.filterReviewsByRate(filterReviewDto,user);
    } else {
      return this.reviewsService.getAllReviews(user);
    }
  }

  // @ts-ignore
  @Post('/')
  @UsePipes(ValidationPipe)
  createReview(
      @Body() createReviewDto: CreateReviewDto,
      @GetUser() user: User
  ): Promise<Reviews> {
    return this.reviewsService.createReview(createReviewDto,user);
  }

  @Get('/:id')
  getReviewById(@Param('id') id: number, @GetUser() user: User): Promise<Reviews> {
    return this.reviewsService.getReviewById(id,user);
  }

  @Delete('/:id')
  deleteReview(
      @Param('id') id: number,
      @GetUser() user: User
  ): Promise<void> {
    return this.reviewsService.deleteReview(id,user);
  }

  @Patch('/:id/description')
  updateDescription(
    @Param('id') id: number,
    @Body('description') description: string,
    @GetUser() user: User
  ): Promise<Reviews> {
    return this.reviewsService.updateDescription(id, description,user);
  }
}
