/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Library } from './schema/library.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schema/book.schema';

@Injectable()
export class LibraryService {
  constructor(
    @InjectModel(Library.name) private libraryModel: Model<Library>,
    @InjectModel(Book.name) private bookModel: Model<Book>,
  ) {}

  async createLibrary(data: Partial<Library>): Promise<Library> {
    const book1 = await new this.bookModel({
      title: 'Chemist',
      author: 'John',
    }).save();

    const book2 = await new this.bookModel({
      title: 'Physicist',
      author: 'Doe',
    }).save();
    return await new this.libraryModel(data).save();
  }
}
