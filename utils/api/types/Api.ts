export interface GenericResponse {
  message: string;
  data: any;
}

export interface GenericRequest {
  param: any;
  query?: any;
}
