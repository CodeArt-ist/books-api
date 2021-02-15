import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as config from 'config';

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

  async selfLink(url: string): Promise<any> {
    const response = await this.googleSelfLink(url);
    return response;
  }

  googleSearch(query: string): Observable<any> {
    const searchUrl = `${config.get('google.url')}?q=${query}$&langRestrict=tr`;
    return this.httpService.get(searchUrl).pipe(
      map(response =>
        response.data.items.map(item => {
          return {
            title: item.volumeInfo.title,
            selfLink: item.selfLink,
          };
        }),
      ),
    );
  }

  googleSelfLink(url: string): Observable<any> {
    return this.httpService.get(url).pipe(
      map(response => {
        return response.data;
      }),
    );
  }
}
