export type ResponseType<T = unknown> = {
  result: T
  loading: boolean
  error: string
}
