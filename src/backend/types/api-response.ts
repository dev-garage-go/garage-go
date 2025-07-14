export type APIResponse<T> =
  {
    success: true
    data: T | null
  }
  |
  {
    success: false
    error: string
  }