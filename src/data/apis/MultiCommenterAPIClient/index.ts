import ky from "ky"
import {
  CreateAccessTokensRequestParams,
  CreateAccessTokensResponse,
  CreateOAuthTokensRequestParams,
  CreateOAuthTokensResponse,
  PostTweetRequestParams,
  PostTweetResponse,
} from "src/data/apis/MultiCommenterAPIClient/types"

export const createOAuthTokens = (
  params: CreateOAuthTokensRequestParams
): Promise<CreateOAuthTokensResponse> => {
  return ky
    .post(
      "https://multi-commenter-server2.netlify.com/.netlify/functions/oauth_tokens_create",
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
      "https://multi-commenter-server2.netlify.com/.netlify/functions/access_tokens_create",
      {
        json: params,
      }
    )
    .json()
}

export const postTweet = (
  params: PostTweetRequestParams
): Promise<PostTweetResponse> => {
  return ky
    .post(
      "https://multi-commenter-server2.netlify.com/.netlify/functions/statuses_update",
      {
        json: params,
      }
    )
    .json()
}
