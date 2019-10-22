export type SerializableError = {
  message: string
  name: string
  stack?: string
  code?: string | number
}

export const toSerializableError = (
  error: Error,
  errorCode?: string
): SerializableError => {
  return {
    message: error.message,
    name: error.name,
    stack: error.stack,
    code: errorCode,
  }
}

type YouTubeAPIClientError = {
  result: {
    error: {
      code: number
      message: string
    }
  }
  /** source of `result` (Plain string json) */
  body: never
  headers: {}
  status: string
  statusText: string
}

export const toSerializableErrorFromYouTubeAPIClientError = (
  error: YouTubeAPIClientError
): SerializableError => {
  return {
    message: error.result.error.message,
    name: "YouTubeAPIClientError",
    code: error.result.error.code,
  }
}
