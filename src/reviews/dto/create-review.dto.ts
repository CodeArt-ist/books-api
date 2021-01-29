import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, Min, Max} from "class-validator";
import {ParseIntPipe} from "@nestjs/common";

export class CreateReviewDto {
  @ApiProperty()
  @IsNotEmpty({message:"Hangi kitap hakkında inceleme yapacağınızı belirtmelisiniz"})
  read_book_id: bigint;

  @ApiProperty()
  @IsNotEmpty({message: 'description:Açıklama alanı boş olamaz'})
  description: string;

  @ApiProperty()
  @Min(1)
  @Max(5)
  @IsNotEmpty({message:"Bir değer belirtmelisiniz"})
  rate: bigint;
}