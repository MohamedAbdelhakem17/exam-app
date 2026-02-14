declare type ErrorResponse = {
  message: string;
  code: number;
  status: boolean | false;
  errors: {
    path: string;
    message: string;
  }[];
};

declare type SuccessResponse<T> = {
  status: boolean | true;
  code: number;
  message: string;
} & T;

declare type ApiResponse<T> = ErrorResponse | SuccessResponse<T>;
