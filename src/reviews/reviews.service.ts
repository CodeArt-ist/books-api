import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetReviewFilterDto } from './dto/get-review-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reviews } from './entities/reviews.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Reviews)
    private reviewRepository: Repository<Reviews>,
  ) {}

  getAllReviews(): Promise<Reviews[]> {
    return this.reviewRepository.find();
  }

  async createReview(createReviewDto: CreateReviewDto): Promise<Reviews> {
    const review = this.reviewRepository.create(createReviewDto);
    await this.reviewRepository.save(review);

    return review;
  }

  getReviewById(id: number): Promise<Reviews> {
    let found = this.reviewRepository.findOne(id);

    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async deleteReview(id: number): Promise<void> {
    const found = this.getReviewById(id);
    await this.reviewRepository.softDelete(id);
  }

 async updateDescription(id: number, description: string): Promise<Reviews> {
    let review = await this.getReviewById(id);

    review.description = description;
    await this.reviewRepository.save(review);

    return review;
  }

  async filterReviewsByRate(filterReviewDto: GetReviewFilterDto): Promise<Reviews[]> {
    const { rate, description } = filterReviewDto;

    let reviews = await this.getAllReviews();

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
