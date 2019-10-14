/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import EmojiIcon from "@material-ui/icons/EmojiEmotions"
import { Editor, EditorState, Modifier } from "draft-js"
import { EmojiData, Picker } from "emoji-mart"
import "emoji-mart/css/emoji-mart.css"
import React, { useCallback, useState } from "react"
import { IconButtonWithTooltip } from "src/components/molecules/IconButtonWithTooltip"
import { Button } from "@material-ui/core"
import SendIcon from "@material-ui/icons/Send"

type OwnProps = {
  children?: never
  onChange: (value: string) => void
}

/**
 * パフォーマンスの理由で、state を使っている
 * そのため、少し複雑化している
 * state を使っている理由は、テキスト入力はなるべく速くできた方がよいため
 */
export const InputPost: React.FC<OwnProps> = ({ onChange }) => {
  // showPicker
  const [showPicker, setShowPicker] = useState(false)
  const toggleShowPicker = useCallback((): void => {
    setShowPicker((prev) => !prev)
  }, [])

  // editorState
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const onSelectEmoji = useCallback(
    (emoji: EmojiData) => {
      if (!("native" in emoji)) {
        // カスタム絵文字は実装しないため
        return
      }

      // 現在のカーソル（もしくは選択範囲）の位置に絵文字を挿入する
      const nextContentState = Modifier.replaceText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        emoji.native
      )
      const next = EditorState.push(
        editorState,
        nextContentState,
        "insert-characters"
      )
      setEditorState(next)

      // send to parent component
      onChange(next.getCurrentContent().getPlainText())
    },
    [editorState, onChange]
  )

  return (
    <div css={root}>
      <div css={editor}>
        <Editor
          editorState={editorState}
          onChange={(editorState) => {
            setEditorState(editorState)

            // send to parent component
            onChange(editorState.getCurrentContent().getPlainText())
          }}
          placeholder="メッセージを入力..."
        />
      </div>

      <div css={actions}>
        <IconButtonWithTooltip
          onClick={() => {
            toggleShowPicker()
          }}
          tooltipMessage="絵文字入力"
        >
          <EmojiIcon />
        </IconButtonWithTooltip>

        <Button
          css={separator}
          variant="contained"
          color="primary"
          onClick={() => {
            console.log("TODO")
          }}
        >
          投稿
          <SendIcon css={icon} />
        </Button>
      </div>

      <div css={separator}>
        {showPicker && (
          <Picker
            emoji=""
            i18n={{
              search: "検索",
              notfound: "その絵文字は見つかりませんでした",
              categories: {
                search: "検索結果",
                recent: "よく使う絵文字",
                people: "人",
                nature: "自然",
                foods: "フード＆ドリンク",
                activity: "アクティビティ",
                places: "トラベル＆場所",
                objects: "オブジェクト",
                symbols: "記号",
                flags: "フラグ",
                custom: "カスタム",
              },
            }}
            onSelect={onSelectEmoji}
            set="twitter"
            sheetSize={32}
            title=""
          />
        )}
      </div>
    </div>
  )
}

const root = css``

const editor = css`
  .public-DraftEditor-content {
    min-height: 4em;
    border-radius: 4px;
    border: 1px solid #ced4da;
    font-size: 16px;
    padding: 8px;
    &:focus {
      border-color: #80bdff;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
  }

  .public-DraftEditorPlaceholder-root {
    padding: 8px 8px 8px 12px;
    position: absolute;
    color: gray;
  }
`

const actions = css`
  display: flex;
  justify-content: space-between;
`

const separator = css`
  margin-top: 8px;
`

const icon = css`
  display: flex;
  padding-left: 8px;
`
