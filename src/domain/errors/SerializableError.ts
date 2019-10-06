export type SerializableError = {
  message: string
  name: string
  stack?: string
  code?: string
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
