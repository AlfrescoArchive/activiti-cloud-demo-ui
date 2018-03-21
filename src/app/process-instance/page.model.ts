export interface Page {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface PaginationModel {
  count: number;
  hasMoreItems: boolean;
  maxItems: number;
  skipCount: number;
  totalItems: number;
}
