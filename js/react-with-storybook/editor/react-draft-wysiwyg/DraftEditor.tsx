import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { Editor } from 'react-draft-wysiwyg'
import isFunc from 'utils/isFunc'
import { debounce } from 'throttle-debounce'

// const debounce = (wait: number, func: Function) => {
//   let timeout
//   return function (...args: any[]) {
//     clearTimeout(timeout)
//     timeout = setTimeout(() => func(args), wait)
//   }
// }

/**
 * react-draft-wysiwyg 에디터
 * @param {string} initialContents 초기값
 * @param {(html: string) => any} onChange
 */
export default function DraftEditor({
  initialContents,
  onChange,
}: {
  initialContents?: string
  onChange?: (html: string) => any
}) {
  const [editorState, setEditorState] = useState<EditorState>(undefined)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnchange = useCallback(
    debounce(400, (editorState: EditorState) => {
      const rawContentState = convertToRaw(editorState.getCurrentContent())
      const html = draftToHtml(rawContentState)

      if (onChange && isFunc(onChange)) {
        onChange(html)
      }
    }) as any,
    []
  )

  const onChangeEditorState = useCallback(
    (editorState) => {
      setEditorState(editorState)
      debouncedOnchange(editorState)
    },
    [debouncedOnchange]
  )

  // editorState 업데이트
  useEffect(() => {
    if (initialContents) {
      const blocksFromHtml = htmlToDraft(initialContents)
      const { contentBlocks, entityMap } = blocksFromHtml
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      )

      const editorState = EditorState.createWithContent(contentState)

      setEditorState(editorState)
      if (onChange && isFunc(onChange)) {
        debouncedOnchange(editorState)
      }
    }
    return () => {}
  }, [debouncedOnchange, initialContents, onChange])

  return (
    <Editor
      editorState={editorState}
      toolbarClassName="draftEditor__toolbar"
      wrapperClassName="draftEditor__wrapper"
      editorClassName="draftEditor__editor"
      onEditorStateChange={onChangeEditorState}
      localization={{
        locale: 'ko',
      }}
    ></Editor>
  )
}
