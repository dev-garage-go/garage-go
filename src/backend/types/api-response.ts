export type NextAPIResponse<T> =
  {
    success: true
    data: T | null
  }
  |
  {
    success: false
    error: string
  }