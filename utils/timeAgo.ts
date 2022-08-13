import TimeAgo, {DateInput} from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

/* Typescript.
 ********************************/

type Time = DateInput

/* Initializers.
 ********************************/

TimeAgo.addLocale(en)
TimeAgo.setDefaultLocale('en')

/* Utilities.
 ********************************/

export const timeAgo = (time: Time) => {
  return new TimeAgo('en').format(new Date(time))
}
