/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { Button, Typography } from "@material-ui/core"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import BuildIcon from "@material-ui/icons/Build"
import DeleteIcon from "@material-ui/icons/Delete"
import SendIcon from "@material-ui/icons/Send"
import React, { Fragment } from "react"
import { useHistory } from "react-router"
import { Content } from "src/components/molecules/Content"
import { Header } from "src/components/molecules/Header"
import { IconButtonWithTooltip } from "src/components/molecules/IconButtonWithTooltip"
import { appBarColor, headerIconColor } from "src/components/styles/styles"
import { RoutePath } from "src/constants/RoutePaths"
import { Link } from "react-router-dom"

type OwnProps = {
  children?: never
}

export const Help: React.FC<OwnProps> = () => {
  const history = useHistory()

  return (
    <Fragment>
      <Header>
        <IconButtonWithTooltip
          onClick={() => {
            history.push(RoutePath.Root)
          }}
          tooltipMessage="戻る"
        >
          <ArrowBackIcon css={headerIconColor} />
        </IconButtonWithTooltip>
      </Header>
      <Content>
        <Typography variant="h6" gutterBottom>
          1. 使い方について。
        </Typography>
        <Typography variant="body1">
          (i) このアプリからメッセージを投稿可能にするため、設定ページ
          <span css={settingsIconWrapper}>
            <IconButtonWithTooltip
              onClick={() => {
                history.push(RoutePath.Settings)
              }}
              tooltipMessage="設定"
            >
              <BuildIcon css={headerIconColor} />
            </IconButtonWithTooltip>
          </span>
          で Twitter と YouTube (Googleアカウント) の連携を承認する。
          <br />
          (ii)
          <Link to={RoutePath.Root}>トップページ</Link> の画面上部で、YouTube
          Live の URL を入力する。
          <br />
          (iii) メッセージを入力して
          <Button variant="contained" color="primary">
            投稿
            <SendIcon css={icon} />
          </Button>
          をクリックする。
          <br />
          (iv)
          <Link to={RoutePath.Root}>トップページ</Link>{" "}
          の画面下部の「ログ」で、投稿できたことを確認する。
        </Typography>

        <div css={separator}></div>
        <Typography variant="h6" gutterBottom>
          2. 認証情報のキャッシュについて。
        </Typography>
        <Typography variant="body1">
          1 度認証すると、認証情報をブラウザにキャッシュします。
          <br />
          このキャッシュのため、このアプリを閉じても、再認証は不要です。
          <br />
          キャッシュ先は、Cookie と LocalStorage です。
        </Typography>

        <div css={separator}></div>
        <Typography variant="h6" gutterBottom>
          3. 認証情報の削除について。
        </Typography>
        <Typography variant="body1">
          ブラウザのキャッシュを削除するには、設定ページ
          <span css={settingsIconWrapper}>
            <IconButtonWithTooltip
              onClick={() => {
                history.push(RoutePath.Settings)
              }}
              tooltipMessage="設定"
            >
              <BuildIcon css={headerIconColor} />
            </IconButtonWithTooltip>
          </span>
          の
          <Button variant="contained" color="secondary">
            連携解除
            <DeleteIcon css={icon} />
          </Button>
          をクリックしてください。
          <br />
          完全に削除したい場合は、以下の手順を参照して「multi-commenter」を削除してください。
          <br />
          <br />
          Twitterの場合
          <br />
          <a href="https://help.twitter.com/ja/managing-your-account/connect-or-revoke-access-to-third-party-apps">
            Twitter ヘルプセンター -
            サードパーティーアプリとログインセッションについて
          </a>
          <br />
          <br />
          YouTube (Googleアカウント) の場合
          <br />
          <a href="https://support.google.com/accounts/answer/3466521?hl=ja">
            Google アカウント ヘルプ -
            アカウントにアクセスできるサードパーティのサイトやアプリ
          </a>
        </Typography>

        <div css={separator}></div>
        <Typography variant="h6" gutterBottom>
          4. 免責事項
        </Typography>
        <Typography variant="body1">
          このアプリケーションによって生じた損害や損失等、一切の責任を負いかねます。
        </Typography>
      </Content>
    </Fragment>
  )
}

const icon = css`
  display: flex;
  padding-left: 8px;
`

const separator = css`
  padding-top: 32px;
`

const settingsIconWrapper = css`
  background-color: ${appBarColor};

  & button {
    padding: unset;
  }
`
