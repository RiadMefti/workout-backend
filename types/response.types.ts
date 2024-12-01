export interface SuccessResponse<T> {
  success: true;
  data: T;
  statusCode: number;
}

export interface ErrorResponse {
  success: false;
  error: string;
  statusCode: number;
}
