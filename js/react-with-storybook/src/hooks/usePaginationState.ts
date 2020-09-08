const usePaginationState = ({
  offset = 0,
  limit = 10,
}: {
  offset: number
  limit: number
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  if (offset && limit) {
    if (isInteger(offset / limit)) {
      if (offset === 0) {
        setCurrentPage(0)
      } else {
        setCurrentPage(offset / limit)
      }
    } else {
      console.error('invalid offset and limit', offset, limit)
    }
  }

  return [currentPage]
}


export default usePaginationState