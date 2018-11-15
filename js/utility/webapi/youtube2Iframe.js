/**
 * 유튜브 링크를 iframe 마크업으로 변환
 */
export default (
  url = '',
  width = 640,
  height = 360
): {
  url: string,
  width: number,
  height: number,
} => {
  // ?: 는 non-capturing group. 동영상 아이디에 해당하는 ([\w\-]{10,12}) 만 캡쳐한다
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([\w-]{10,12})(?:&feature)?(?:[\w-]{0})?/g

  const iframe = `<iframe width="${width}" height="${height}" src="http://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>`

  const isValidYoutubeLink = regex.test(url)

  return isValidYoutubeLink
    ? url.replace(regex, (match, p1) => iframe.replace('$1', p1))
    : null
}
