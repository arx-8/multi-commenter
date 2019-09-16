import ky from "ky"
import {
  CreateAuthenticateUrlRequestParams,
  CreateAuthenticateUrlResponse,
} from "./types"

export const createAuthenticateUrl = (
  params: CreateAuthenticateUrlRequestParams
): Promise<CreateAuthenticateUrlResponse> => {
  return ky
    .post("https://multi-commenter-server.unubo.app/", {
      json: params,
    })
    .json()
}
