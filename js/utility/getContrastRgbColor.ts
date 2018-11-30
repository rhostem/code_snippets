export function hexToRgb(hex: string) {
  let color

  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    color = hex.substring(1).split('')
    if (color.length === 3) {
      color = [color[0], color[0], color[1], color[1], color[2], color[2]]
    }
    color = '0x' + color.join('')
    const result =
      'rgb(' +
      [(color >> 16) & 255, (color >> 8) & 255, color & 255].join(',') +
      ')'

    return result
  }

  console.error('유효한 16진수 컬러값이 아닙니다:', hex)

  return ''
}

/**
 * rgb(a, b, c) => [a,b,c]
 */
export function rgbstringToTriplet(rgb: string) {
  var commadelim = rgb.substring(4, rgb.length - 1)
  var strings = commadelim.split(',')
  var numeric: Array<number> = []

  for (var i = 0; i < 3; i++) {
    numeric[i] = parseInt(strings[i], 10)
  }

  return numeric
}

/**
 * 색을 계산해서 white, 또는 black을 리턴한다.
 */
export const getContrastRgbColor = (rgbString: string) => {
  var triplet = rgbstringToTriplet(rgbString)
  var newtriplet: Array<number> = []

  // black or white:
  var total = 0
  for (var i = 0; i < triplet.length; i++) {
    total += triplet[i]
  }
  if (total > (3 * 256) / 2) {
    newtriplet = [0, 0, 0]
  } else {
    newtriplet = [255, 255, 255]
  }
  var calcualted = 'rgb(' + newtriplet.join(',') + ')'

  return calcualted
}
