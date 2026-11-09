export type UseFetchResult<Data> = {
  data: Data | null
  error: Error | null
  isLoading: boolean
  reload: () => void
}
