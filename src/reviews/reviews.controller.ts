import {
  Body,
  Controller,
  Delete,
  Get,
  Optional,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetReviewFilterDto } from './dto/get-review-filter.dto';
import {Reviews} from "./entities/reviews.entity";

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get('/')
  getAllReviews(@Query(ValidationPipe) filterReviewDto: GetReviewFilterDto): Promise<Reviews[]> {
    if (Object.keys(filterReviewDto).length > 0) {
      return this.reviewsService.filterReviewsByRate(filterReviewDto);
    } else {
      return this.reviewsService.getAllReviews();
    }
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  createReview(@Body() createReviewDto: CreateReviewDto): Promise<Reviews> {
    return this.reviewsService.createReview(createReviewDto);
  }

  @Get('/:id')
  getReviewById(@Param('id') id: number): Promise<Reviews> {
    return this.reviewsService.getReviewById(id);
  }

  @Delete('/:id')
  deleteReview(@Param('id') id: number): Promise<void> {
    return this.reviewsService.deleteReview(id);
  }

  @Patch('/:id/description')
  updateDescription(
    @Param('id') id: number,
    @Body('description') description: string,
  ): Promise<Reviews> {
    return this.reviewsService.updateDescription(id, description);
  }
}
