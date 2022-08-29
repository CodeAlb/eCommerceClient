import {formatDistance} from 'date-fns'

export const timeAgo = (date: Date) => {
  return formatDistance(new Date(date), new Date(), {addSuffix: true})
}
