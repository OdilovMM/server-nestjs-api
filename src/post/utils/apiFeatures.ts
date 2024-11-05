/* eslint-disable prettier/prettier */
import { Query } from 'mongoose';

// TODO interface

interface QueryParams {
  keyword?: string;
  author?: string;
  category?: string;
  tags?: string[];
  page?: string;
  limit?: string;
  [key: string]: any;
  newest?: boolean;
}

class ApiFeatures<ResultType, DocType, THelpers = {}> {
  query: Query<DocType[], DocType, THelpers>;

  constructor(
    query: Query<DocType[], DocType, THelpers>,
    private readonly queryStr: QueryParams,
  ) {
    this.query = query;
  }

  search(): this {
    const keyword = this.queryStr.keyword
      ? {
          title: {
            $regex: this.queryStr.keyword,
            $options: 'i',
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter(): this {
    const queryCopy = { ...this.queryStr };

    const removeFields = [
      'keyword',
      'author',
      'category',
      'tags',
      'page',
      'limit',
      'newest',
    ];
    removeFields.forEach((key) => delete queryCopy[key]);

    if (this.queryStr.author) {
      queryCopy.author = this.queryStr.author;
    }

    if (this.queryStr.category) {
      queryCopy.category = this.queryStr.category;
    }

    if (this.queryStr.tags && this.queryStr.tags.length > 0) {
      this.query = this.query.find({ tags: { $all: this.queryStr.tags } });
    } 

    const queryStr = JSON.stringify(queryCopy);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultParPage: number): this {
    const currentPage= Number(this.queryStr.page) || 1;
    const skip = resultParPage * (currentPage - 1);

    this.query = this.query.limit(resultParPage).skip(skip);
    return this;
  }

  approved(approval: boolean): this {
    this.query = this.query.find({approved: approval});
    return this;
  }

  sortByNewest(): this {
    if(this.queryStr.newest) {
        const sortDirection = this.queryStr.newest === true? 'asc': 'desc';
        this.query = this.query.sort({createdAt: sortDirection})
    }
    return this;
  }
}

export default ApiFeatures;