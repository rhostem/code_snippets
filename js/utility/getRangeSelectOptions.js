/**
 * Select 컴포넌트에 사용할 수 있도록 숫자를 값으로 가지는 객체 배열을 리턴한다.
 *
 * @param {*} option.start 시작
 * @param {*} option.end 종료
 * @param {*} option.gap 값의 간격
 * @param {*} option.mapFunc 배열에 실제로 입력할 값을 리턴하는 함수
 */
export default function getRangeSelectOptions({
  start,
  end,
  gap = 1,
  mapFunc = v => ({ value: v, label: v }),
}) {
  let options = []

  for (let i = start; i <= end; i += gap) {
    options.push(mapFunc(i))
  }

  return options
}
