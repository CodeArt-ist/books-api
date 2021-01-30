import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetReviewFilterDto } from './dto/get-review-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reviews } from './entities/reviews.entity';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Reviews)
    private reviewRepository: Repository<Reviews>,
  ) {}

  getAllReviews(user: User): Promise<Reviews[]> {
    return this.reviewRepository.find({user: user});
  }

  async createReview(
    createReviewDto: CreateReviewDto,
    user: User,
  ): Promise<Reviews> {
    const review = this.reviewRepository.create(createReviewDto);
    review.user = user;
    await this.reviewRepository.save(review);
    delete review.user.password;
    return review;
  }

 async getReviewById(id: number,user:User): Promise<Reviews> {
    let found = await this.reviewRepository.findOne({ id:id,user:user });

    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async deleteReview(id: number,user: User): Promise<void> {
    const found = await this.getReviewById(id,user);
    console.log(found)
    debugger
    await this.reviewRepository.softDelete(id);
  }

  async updateDescription(id: number, description: string, user: User): Promise<Reviews> {
    let review = await this.getReviewById(id,user);

    review.description = description;
    await this.reviewRepository.save(review);

    return review;
  }

  async filterReviewsByRate(
    filterReviewDto: GetReviewFilterDto,
    user: User,
  ): Promise<Reviews[]> {
    const { rate, description } = filterReviewDto;

    let reviews = await this.getAllReviews(user);

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
