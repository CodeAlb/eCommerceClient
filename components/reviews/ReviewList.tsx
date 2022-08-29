import {useState} from 'react'
import {getAuthState} from '../../store/slices/authSlice'
import {useSelector} from '../../store/store'
import {IProduct} from '../../types/product'
import Review from './Review'
import ReviewsForm from './ReviewForm'

interface IReviewListProps {
  product?: IProduct
}

const css = {
  wrapper: 'max-w-2xl mx-auto mt-12 sm:mt-16',
  headline: 'flex items-center justify-between',
  title: 'text-xl sm:text-2xl md:text-3xl text-black',
  reviews: 'mt-8 sm:mt-10 space-y-6 sm:space-y-10',
  createBtn:
    'border border-gray-300 px-3 sm:px-4 h-9 sm:h-10 rounded-full inline-flex items-center justify-center font-medium hover:border-black duration-150 group',
  createIcon: '-ml-1 w-4 mr-2 text-gray-500',
  warning: 'mt-4 sm:mt-5 rounded-lg text-orange-700 bg-orange-50 py-2 px-4 text-center',
}

const ReviewList = ({product}: IReviewListProps) => {
  const [showForm, setShowForm] = useState(false)
  const {token} = useSelector(getAuthState)
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
        {token && (
          <button type="button" className={css.createBtn} onClick={toggleForm}>
            {showForm ? 'Close Form' : 'Add Review'}
          </button>
        )}
      </div>
      {token && showForm && <ReviewsForm productId={_id as string} />}
      {!token && <p className={css.warning}>You must be logged in to leave a review!</p>}
      {reviews?.length > 0 && (
        <div className={css.reviews}>
          {reviews?.map(({_id, ...props}: any) => (
            <Review key={_id} {...props} author={user} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ReviewList
