import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('book')
@UseGuards(AuthGuard())
export class BookController {
  constructor(private bookService: BookService) {}

  @Get('/:query')
  async getBook(@Param('query') query: string): Promise<any> {
    return await this.bookService.getBook(query);
  }
}
