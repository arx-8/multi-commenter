/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import Button from "@material-ui/core/Button"
import BuildIcon from "@material-ui/icons/Build"
import SendIcon from "@material-ui/icons/Send"
import { RoutePath } from "constants/RoutePaths"
import React from "react"
import useReactRouter from "use-react-router"
import { TwitterOAuthCallbackQueryParams } from "domain/models/Twitter"
import { createAuthenticateUrl } from "data/apis/MultiCommenterAPI"

type OwnProps = {
  children?: never
}

export const Root: React.FC<OwnProps> = () => {
  const { history, match } = useReactRouter<
    Partial<TwitterOAuthCallbackQueryParams>
  >()

  // Twitter Authのコールバックを `/` でしか受け取れないため、ここでやる
  if (match.params.oauth_token && match.params.oauth_verifier) {
    // クエリパラメータを取り込み終わったら、クエリパラメータを消すため遷移
    // 「戻る」ができると再度クエリパラメータの処理が無駄に走るため、履歴は残さない
    history.replace(RoutePath.Root)
    return null
  }

  // 拒否された場合は、特に何もしない
  if (match.params.denied) {
    history.replace(RoutePath.Root)
    return null
  }

  return (
    <div css={root}>
      <div>
        <Button
          variant="contained"
          color="default"
          onClick={() => history.push(RoutePath.Settings)}
        >
          設定
          <BuildIcon />
        </Button>
      </div>

      <div>
        <input type="text" value="url" />
      </div>
      <div>開く</div>
      <div>閉じる</div>

      <div>
        <input type="text" value="投稿内容" />
      </div>

      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            createAuthenticateUrl({
              callback_url: "https://localhost",
            })
          }}
        >
          投稿
          <SendIcon />
        </Button>
      </div>
    </div>
  )
}

const root = css``
