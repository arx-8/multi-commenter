import ky from "ky"
import {
  CreateOAuthTokensRequestParams,
  CreateOAuthTokensResponse,
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
