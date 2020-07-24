import canUseDOM from './canUseDOM'
import qs from 'qs'

export default function getBrowserQuery() {
  if (canUseDOM()) {
    const { search } = window.location
    const query = qs.parse(search.split('?')[1])
    return query
  } else {
    return {}
  }
}
