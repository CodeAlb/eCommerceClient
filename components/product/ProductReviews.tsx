import {getAuthState} from '../../store/slices/authReducer'
import {useSelector} from '../../store/store'
import {IProduct} from '../../types/product'
import {timeAgo} from '../../utils/timeAgo'
import StarRating from '../StarRating'
import dynamic from 'next/dynamic'
import {useState} from 'react'

const ReviewForm = dynamic(() => import('../../components/forms/ReviewForm'), {
  ssr: false,
})

interface ProductReviewsProps {
  product?: IProduct
}

const css = {
  wrapper: 'max-w-2xl mx-auto mt-12 sm:mt-16',
  headline: 'flex items-center justify-between',
  title: 'text-xl sm:text-2xl md:text-3xl text-black',
  reviews: 'mt-8 sm:mt-10 space-y-6 sm:space-y-10',
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
  createBtn:
    'border border-gray-300 px-3 sm:px-4 h-9 sm:h-10 rounded-full inline-flex items-center justify-center font-medium hover:border-black duration-150 group',
  createIcon: '-ml-1 w-4 mr-2 text-gray-500',
  noReviews: 'text-center text-gray-500',
  warning: 'mt-4 sm:mt-5 rounded-lg text-orange-700 bg-orange-50 py-2 px-4 text-center',
  modal: 'fixed inset-0 flex items-center justify-center z-40',
  modalOverlay: 'absolute inset-0 bg-black/5',
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
            <StarRating rating={rating} />
          </div>
          <div className={css.createdAt}>{timeAgo(createdAt)}</div>
        </div>
        <div className={css.comment}>{comment}</div>
      </div>
    </div>
  )
}

const ProductReviews = ({product}: ProductReviewsProps) => {
  const [showForm, setShowForm] = useState(false)
  const {accessToken} = useSelector(getAuthState)
  const {_id, numOfReviews = 0, reviews = [], user} = product || {}

  const toggleForm = () => {
    setShowForm((state) => !state)
  }

  return (
    <div className={css.wrapper}>
      <div className={css.headline}>
        <h2 className={css.title}>
          {numOfReviews > 0 ? `Reviews (${numOfReviews})` : 'No Reviews'}
        </h2>
        {accessToken && (
          <button type="button" className={css.createBtn} onClick={toggleForm}>
            {showForm ? 'Close Form' : 'Add Review'}
          </button>
        )}
      </div>
      {accessToken && showForm && <ReviewForm productId={_id as string} />}
      {!accessToken && <p className={css.warning}>You must be logged in to leave a review!</p>}
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
