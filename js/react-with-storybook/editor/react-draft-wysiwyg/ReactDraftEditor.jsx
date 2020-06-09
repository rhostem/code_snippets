import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// NOTE: 서버사이드 렌더링 앱에서는 dynamic 임포트를 사용해서 가져와야 한다
/**

const DraftsEditor: ReactType<{
  editorState: EditorState
  toolbarClassName: string
  wrapperClassName: string
  editorClassName: string
  onEditorStateChange: Function
}> = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
  ssr: false,
})

*/

/**
 * react-draft-wysiwyg 에디터
 * @param {string} initialContents 초기값
 * @param {(html: string) => undefined} onChange
 */
export default function ReactDraftEditor({ initialContents, onChange }) {
  const [editorState, setEditorState] = useState(undefined)

  const debouncedOnchange = useCallback(
    debounce(400, editorState => {
      const rawContentState = convertToRaw(editorState.getCurrentContent())
      const html = draftToHtml(rawContentState)
      onChange(html)

      console.log(`html`, html)
    }),
    []
  )

  const onChangeEditorState = useCallback(
    editorState => {
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
      onChange(editorState)
    }
    return () => {}
  }, [initialContents, onChange])

  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={onChangeEditorState}
      localization={{
        locale: 'ko',
      }}
    ></Editor>
  )
}

function debounce(wait, func, immediate) {
  var timeout
  return function() {
    var context = this,
      args = arguments
    var later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout // immediate가 true일 경우 최초 호출시 즉시 실행됨. 그 다음 호출부터는 debounce 적용.
    clearTimeout(timeout) // wait만큼의 시간이 지나지 않으면 clearTimeout 때문에 later가 실행되지 않음.
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}
