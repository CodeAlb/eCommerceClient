import {Fragment} from 'react'
import {IProduct} from '../../types/product'
import {fillArray} from '../../utils/helpers'
import {timeAgo} from '../../utils/timeAgo'
import {StarEmptyIcon, StarFilledIcon} from '../Svg'

interface ProductReviewsProps {
  product?: IProduct
}

const css = {
  wrapper: 'max-w-2xl mx-auto mt-12 sm:mt-16',
  title: 'text-xl sm:text-2xl md:text-3xl text-black',
  reviews: 'mt-2 sm:mt-3 space-y-6 sm:space-y-10',
  review: 'flex',
  media: 'pr-4',
  avatar:
    'w-8 h-8 sm:w-10 sm:h-10 rounded-full inline-flex items-center justify-center font-bold bg-black text-white',
  body: '',
  name: 'sm:text-lg font-medium inline-flex items-center',
  badge:
    'ml-2 px-1 py-1 leading-none rounded text-[10px] tracking-wider uppercase bg-gray-400 text-white',
  ratings: 'flex items-center',
  stars: 'mr-4 sm:mr-5 text-orange-600/60 mr-2 flex items-center [&>*]:w-4',
  createdAt: 'text-sm text-gray-500',
  comment: 'mt-2 text-gray-500',
}

const ProductReview = ({user, comment, createdAt, rating, author}: any) => {
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
            {fillArray(5).map((n, i) => (
              <Fragment key={i}>
                {rating >= i + 1 ? <StarFilledIcon /> : <StarEmptyIcon />}
              </Fragment>
            ))}
          </div>
          <div className={css.createdAt}>{timeAgo(createdAt)}</div>
        </div>
        <div className={css.comment}>{comment}</div>
      </div>
    </div>
  )
}

const ProductReviews = ({product}: ProductReviewsProps) => {
  const {numOfReviews = 0, reviews = [], user} = product || {}

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>
        {(numOfReviews || 0) > 0 ? `Reviews (${numOfReviews})` : 'Make a Review'}
      </h2>
      {reviews?.length > 0 && (
        <div className={css.reviews}>
          {reviews?.map(({_id, ...props}: any) => (
            <ProductReview key={_id} {...props} author={user} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductReviews
