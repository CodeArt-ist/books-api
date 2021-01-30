import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetReviewFilterDto {
  @ApiProperty()
  @IsOptional()
  rate: number;

  @ApiProperty()
  @IsOptional()
  description: string;
}
