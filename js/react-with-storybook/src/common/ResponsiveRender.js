import React from 'react'
import { Mobile, Desktop } from 'components/layout/mediaWrapper'

type Props = {
  mobile: React.FunctionComponent,
  deskatop: React.FunctionComponent,
  props: any,
}
export default function ResponsiveRender({
  mobile,
  desktop,
  props = {},
  name,
  useFragment = false,
}: Props) {
  if (!mobile && !desktop) {
    console.warn(
      '[ResponsiveRender] desktop, mobile 중 최소 하나가 필요합니다.'
    )
    return null
  }

  return useFragment ? (
    <>
      <Mobile>{!!mobile ? mobile(props) : desktop(props)}</Mobile>
      <Desktop>{!!desktop ? desktop(props) : mobile(props)}</Desktop>
    </>
  ) : (
    <div data-name={'ResponsiveRender-' + name}>
      <Mobile>{!!mobile ? mobile(props) : desktop(props)}</Mobile>
      <Desktop>{!!desktop ? desktop(props) : mobile(props)}</Desktop>
    </div>
  )
}
