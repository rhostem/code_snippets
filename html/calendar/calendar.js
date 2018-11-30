const A_DAY_MILLI_SEC = 1000 * 60 * 60 * 24
const DAY_LEN = 7
const WEEK_LEN = 6
const now = new Date()
const calendar = {
  year: now.getFullYear(),
  month: now.getMonth(),
}

function renderCalender() {
  calendar.grid = getCalendarGrid(calendar.year, calendar.month)
  updateCalendar()
}

function updateCalendar() {
  // document.getElementById('year').innerText =
  let date // 날짜 데이터
  let cellElm // 달력 날짜 요소

  grid = calendar.grid
  document.getElementById('year').innerText = calendar.year
  document.getElementById('month').innerText = calendar.month + 1

  for (var weekIdx = 0; weekIdx < WEEK_LEN; weekIdx++) {
    for (var dayIdx = 0; dayIdx < DAY_LEN; dayIdx++) {
      day = grid[weekIdx][dayIdx]
      date = day.date

      let isSameMonth = date.getMonth() === calendar.month

      cellElm = document.getElementById(`${weekIdx}${dayIdx}`)
      cellElm.innerHTML = `
        <div id="${weekIdx}${dayIdx}">${date.getDate()}일</div>
        ${
          !!day.appointMent
            ? `
          <div class="calendar-appointMent">
            ${day.appointMent}
            <button  class="deleteAppointment">삭제</button>
            <button class="editAppointment">수정</button>
          </div>
          `
            : ''
        }
      `
      cellElm.className = `calendar-day ${
        !isSameMonth ? 'is-notCurrentMonth' : ''
      }`

      cellElm.addEventListener('click', onClickToAddApointment)

      if (day.appointMent) {
        // 삭제 이벤트
        const y = weekIdx
        const x = dayIdx
        cellElm
          .getElementsByClassName('deleteAppointment')[0]
          .addEventListener('click', e => {
            e.stopPropagation()
            if (window.confirm('삭제하시겠습니까?')) {
              calendar.grid[y][x].appointMent = null
              updateCalendar()
            }
          })

        cellElm
          .getElementsByClassName('editAppointment')[0]
          .addEventListener('click', e => {
            e.stopPropagation()
            const text = prompt(
              '일정을 수정하세요',
              calendar.grid[y][x].appointMent
            )
            calendar.grid[y][x].appointMent = text
            updateCalendar()
          })
      }
    }
  }
}

function onClickToAddApointment(e) {
  const cellId = e.target.id
  let weekIdx = parseInt(cellId.charAt(0), 10)
  let dayIdx = parseInt(cellId.charAt(1), 10)
  let day = calendar.grid[weekIdx][dayIdx]

  if (!day.appointMent) {
    const text = prompt('새로운 일정을 입력하세요', '영화 관람')
    day.appointMent = text
    updateCalendar()
  }
}

/**
 * 달력 2차원 배열 데이터 생성
 * @param  {[type]} now [Date 객체]
 * @return {[type]}     [달력2차원 배열]
 */
function getCalendarGrid(year, month) {
  const calendar = []
  const firstDayOfCal = getFirstDayOfCalendar(year, month)
  const firstDayOfCalMilliSec = firstDayOfCal.getTime()

  for (var weekIdx = 0; weekIdx < WEEK_LEN; weekIdx++) {
    calendar.push([])
    for (var dayIdx = 0; dayIdx < DAY_LEN; dayIdx++) {
      calendar[weekIdx][dayIdx] = {
        date: new Date(
          firstDayOfCalMilliSec + A_DAY_MILLI_SEC * (weekIdx * 7 + dayIdx)
        ),
        appointMent: null,
      }
    }
  }

  return calendar
}

/**
 * 7 * 6 그리드의 달력에서 첫번째 1행 1열에 들어갈 날짜를 구한다.
 */
function getFirstDayOfCalendar(year, month) {
  let firstDayOfCalendar = new Date(year, month, 1)
  const firstDay = firstDayOfCalendar.getDay() // 요일 번호

  // 이달의 1일이 일요일이 아니라면
  if (firstDay !== 0) {
    const firstDayOfMonthVal = firstDayOfCalendar.getTime()
    firstDayOfCalendar = new Date(
      firstDayOfMonthVal - A_DAY_MILLI_SEC * firstDay
    )
  }

  return firstDayOfCalendar
}

// ========================================
renderCalender()
