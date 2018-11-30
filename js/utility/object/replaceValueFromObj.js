function replaceValueFromObj(obj, targetVal, replace) {
  var trimmed = Object.assign({}, obj)

  for (var key in trimmed) {
    if (trimmed.hasOwnProperty(key)) {
      var val = trimmed[key]

      if (typeof val === 'object') {
        trimmed[key] = replaceValueFromObj(val, targetVal, replace)
      } else if (val === targetVal) {
        trimmed[key] = replace
      }
    }
  }

  return trimmed
}

var example = {
  1: 1,
  2: 'ALL',
  3: {
    31: 'ALL',
    32: {
      321: 'ALL',
    },
  },
}

var result = replaceValueFromObj(example, 'ALL', '')
// {
//   1: 1,
//   2: '',
//   3: {
//     31: '',
//     32: {
//       321: '',
//     }
// }
