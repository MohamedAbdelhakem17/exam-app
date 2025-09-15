declare type ErrorResponse = {
  message: string;
  code: number;
};

declare type SuccessResponse<T> = {
  message: string | "success";
} & T;

declare type ApiResponse<T> = ErrorResponse | SuccessResponse<T>;

declare type Metadata = {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  limit: number;
};

declare type PaginatedResponse<T> = {
  metadata: Metadata;
} & T;
