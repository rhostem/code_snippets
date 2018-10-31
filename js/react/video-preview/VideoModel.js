import { Record, List } from 'immutable'

export const Video = new Record({
  seq: -1,
  categorySeq: 1,
  type: 0, // 0 일반, 1 유튜브
  pick: false, // 즐겨찾기
  hide: false, // 보이기 여부
  title: '',
  duration: 0, // 비디오 길이
  date: 0, // 등록일
  body: '',
  file: '',
  thumbnail: '',
})
