import {IUser} from '../../types/user'
import {timeAgo} from '../../utils/timeAgo'
import StarRating from '../ui/StarRating'

interface IReviewProps {
  user: IUser
  comment: string
  createdAt: Date
  rating: number
  author: IUser
}

const css = {
  review: 'flex',
  media: 'pr-4',
  avatar:
    'w-8 h-8 sm:w-10 sm:h-10 rounded-full inline-flex items-center justify-center font-bold bg-black text-white',
  body: '',
  name: 'sm:text-lg font-medium inline-flex items-center',
  badge:
    'ml-2 px-1 py-1 leading-none rounded text-[10px] tracking-wider uppercase bg-gray-400 text-white',
  ratings: 'flex items-center',
  stars: 'sm:mr-5 mr-2 flex items-center [&_svg]:w-4',
  createdAt: 'text-sm text-gray-500',
  comment: 'mt-2 text-gray-500',
}

const Review = ({user, comment, createdAt, rating, author}: IReviewProps) => {
  return (
    <div className={css.review}>
      <div className={css.media}>
        <div className={css.avatar}>{user?.name?.slice(0, 1)}</div>
      </div>
      <div className={css.body}>
        <div className={css.name}>
          {user?.name}
          {author?._id === user?._id && <span className={css.badge}>Author</span>}
        </div>
        <div className={css.ratings}>
          <div className={css.stars}>
            <StarRating rating={rating} />
          </div>
          <div className={css.createdAt}>{timeAgo(createdAt)}</div>
        </div>
        <div className={css.comment}>{comment}</div>
      </div>
    </div>
  )
}

export default Review
