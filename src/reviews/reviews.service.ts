import { Injectable, NotFoundException } from '@nestjs/common';
import { Reviews } from './reviews.model';
import { CreateReviewDto } from './dto/create-review.dto';
import { v4 as uuidv4 } from 'uuid';
import { GetReviewFilterDto } from './dto/get-review-filter.dto';

@Injectable()
export class ReviewsService {
  private reviews: Reviews[] = [];

  getAllReviews(): Reviews[] {
    return this.reviews;
  }

  createReview(createReviewDto: CreateReviewDto): Reviews {
    const review: Reviews = {
      id: uuidv4(),
      ...createReviewDto,
      created_at: new Date(),
    };

    this.reviews.push(review);

    return review;
  }

  getReviewById(id: string): Reviews {
    let found = this.reviews.find(e => {
      return e.id === id;
    });

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  deleteReview(id: string): void {
    const found = this.getReviewById(id);
    this.reviews = this.reviews.filter(review => review.id !== id);
  }

  updateDescription(id: string, description: string): Reviews {
    let review = this.getReviewById(id);
    review.description = description;
    return review;
  }

  filterReviewsByRate(filterReviewDto: GetReviewFilterDto): Reviews[] {
    const { rate, description } = filterReviewDto;

    let reviews = this.getAllReviews();

    if (rate) {
      reviews = reviews.filter(review => review.rate === rate);
    }

    if (description) {
      reviews = reviews.filter(review =>
        review.description.toLowerCase().includes(description),
      );
    }

    if (reviews.length === 0) {
      throw new NotFoundException();
    }

    return reviews;
  }
}
