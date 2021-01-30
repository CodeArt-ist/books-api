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
import { Reviews } from './reviews.model';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetReviewFilterDto } from './dto/get-review-filter.dto';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get('/')
  getAllReviews(@Query(ValidationPipe) filterReviewDto: GetReviewFilterDto): Reviews[] {
    if (Object.keys(filterReviewDto).length > 0) {
      return this.reviewsService.filterReviewsByRate(filterReviewDto);
    } else {
      return this.reviewsService.getAllReviews();
    }
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  createReview(@Body() createReviewDto: CreateReviewDto): Reviews {
    return this.reviewsService.createReview(createReviewDto);
  }

  @Get('/:id')
  getReviewById(@Param('id') id: string): Reviews {
    return this.reviewsService.getReviewById(id);
  }

  @Delete('/:id')
  deleteReview(@Param('id') id: string): void {
    return this.reviewsService.deleteReview(id);
  }

  @Patch('/:id/description')
  updateDescription(
    @Param('id') id: string,
    @Body('description') description: string,
  ): Reviews {
    return this.reviewsService.updateDescription(id, description);
  }
}
