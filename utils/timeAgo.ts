import TimeAgo, {DateInput} from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addLocale(en)
TimeAgo.setDefaultLocale('en')

export const timeAgo = (time: DateInput) => {
  return new TimeAgo('en').format(new Date(time))
}
