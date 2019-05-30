Date.prototype.toGuhadaISO8601String = function() {
  var pad = function(number) {
    var r = String(number)
    if (r.length === 1) {
      r = '0' + r
    }
    return r
  }
  if (!this.valueOf()) return ' '
  var year = this.getFullYear()
  var month = pad(this.getMonth() + 1)
  var date = pad(this.getDate())
  var hour = pad(this.getHours())
  var minute = pad(this.getMinutes())
  var second = pad(this.getSeconds())
  var millisecond = String((this.getMilliseconds() / 1000).toFixed(3)).slice(
    2,
    5
  )
  var offset = this.getTimezoneOffset() * -1 // minute;
  var offsetSymbol = offset >= 0 ? '+' : '-'
  var offsetHour = pad(offset / 60)
  var offsetMinute = pad(offset % 60)

  return (
    year +
    '-' +
    month +
    '-' +
    date +
    'T' +
    hour +
    ':' +
    minute +
    ':' +
    second +
    '.' +
    millisecond +
    offsetSymbol +
    offsetHour +
    ':' +
    offsetMinute
  )
}
