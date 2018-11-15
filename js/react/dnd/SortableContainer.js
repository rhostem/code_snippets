const sortByInsert = ({ list = [], targetIndex = 0, insertIndex = 0 }) => {
  if (!Array.isArray(list) || list.length === 0) {
    return list
  }

  const target = R.clone(list[targetIndex])
  const result = R.pipe(
    R.remove(targetIndex, 1),
    R.insert(insertIndex, target)
  )(list)

  return result
}
