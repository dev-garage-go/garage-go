import { HttpStatus } from "./http-status"

export interface ErrorInterface {
  success: boolean
  errorMessage: string | null
  status: HttpStatus
}