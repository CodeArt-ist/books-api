import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as config from 'config'

class AxiosResponse<T> {}

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    private httpService: HttpService,
  ) {}

  async getBook(query: string): Promise<any> {
    const db = await this.bookRepository
      .createQueryBuilder('book')
      .where('book.name like :searchTerm', { searchTerm: '%' + query + '%' })
      .getMany();

    if (db) {
      const googleBooks = await this.googleSearch(query);
      return googleBooks;
    }

    return db;
  }

  googleSearch(query: string): Observable<AxiosResponse<any>> {
    const searchUrl =
      `${config.get("google.url")}?q=${query}$&langRestrict=tr`;
    return this.httpService.get(searchUrl).pipe(map(response => response.data));
  }
}
