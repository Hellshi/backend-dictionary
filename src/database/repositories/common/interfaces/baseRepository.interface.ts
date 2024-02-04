import { FindOneOptions, FindOptionsOrder } from 'typeorm';

export type Criteria<T> = {
  [P in keyof T]?: T[P];
};

export type CriteriaIn<T> = {
  [P in keyof T]?: T[P][];
};

export type Pagination = {
  page?: number;
  take?: number;
};

export type OrderBy<T> = {
  [P in keyof T]?: 'ASC' | 'DESC';
};

export type PaginationReturn<T> = {
  data: T[];
  pagination: PaginationExtendedInfo;
};
export type PaginationExtendedInfo = {
  currentPage: number;
  limitPerPage: number;
  totalItems: number;
  previousPage: number;
  nextPage: number;
};
export type FiltersParams<T> = {
  pagination?: Pagination;
  criteria?: Criteria<T> | Criteria<T>[];
  criteriaLike?: Criteria<T>;
  criteriaIn?: CriteriaIn<T>;
  orderBy?: FindOptionsOrder<T>;
  withDeleted?: boolean;
  relations?: string[];
};

export interface FindOneByAllCriteria<T> extends FiltersParams<T> {
  fn: ({
    where,
    withDeleted,
    order,
    relations,
  }: FindOneOptions<T>) => Promise<T>;
}
