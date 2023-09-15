export interface GenericResponse {
  message: string;
  data: object | null;
}

export interface GenericRequest {
  param: object;
  query?: object;
}
