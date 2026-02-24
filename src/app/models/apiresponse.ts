export interface IApiResponse<T> {
  HttpResponseCode: number;
  ResponseMessage: string;
  ResponseObject: T;
}