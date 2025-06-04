import { HttpStatus } from "./http-status"

export type ServerActionResponse<T> =
  {
    success: true
    data: T
    httpStatus: HttpStatus
  }
  |
  {
    success: false
    error: string
    httpStatus: HttpStatus
  }