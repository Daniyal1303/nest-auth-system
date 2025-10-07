/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { LibraryService } from './library.service';
import { LibraryController } from './library.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schema/book.schema';
import { Library, LibrarySchema } from './schema/library.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Library.name, schema: LibrarySchema },
      { name: Book.name, schema: BookSchema },
    ]),
  ],
  providers: [LibraryService],
  controllers: [LibraryController],
})
export class LibraryModule {}
