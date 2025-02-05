export type ResponseErrorType =
  | 'NOT_AUTHENTICATED'
  | 'DATA_INSERT_FAILED'
  | 'DATA_NOT_FOUND';

export class ResponseError extends Error {
  constructor(message: ResponseErrorType) {
    super(message);
  }
}
