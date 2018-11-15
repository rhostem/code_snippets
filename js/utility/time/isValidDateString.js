/**
 * 적절한 데이트스트링인지 검사한다.
 * @param  {[String]} dateString [ex. 2015-01-01]
 */
export const isValidDateString = (dateString) => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return false;
  }

  return true;
};
