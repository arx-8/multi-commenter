import ky from "ky"
import {
  CreateOAuthTokensRequestParams,
  CreateOAuthTokensResponse,
  CreateAccessTokensRequestParams,
  CreateAccessTokensResponse,
} from "src/data/apis/MultiCommenterAPIClient/types"

export const createOAuthTokens = (
  params: CreateOAuthTokensRequestParams
): Promise<CreateOAuthTokensResponse> => {
  return ky
    .post(
      "http://multi-commenter-server2.netlify.com/.netlify/functions/oauth_tokens_create",
      {
        json: params,
      }
    )
    .json()
}

export const createAccessTokens = (
  params: CreateAccessTokensRequestParams
): Promise<CreateAccessTokensResponse> => {
  return ky
    .post(
      "http://multi-commenter-server2.netlify.com/.netlify/functions/access_tokens_create",
      {
        json: params,
      }
    )
    .json()
}
