import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {StarIcon} from '@heroicons/react/outline'
import {useCreateReviewMutation} from '../../store/api/baseApi'
import {cn} from '../../utils/helpers'
import Textarea from '../fields/Textarea'

const css = {
  wrapper: 'mt-4 sm:mt-6',
  form: 'border border-gray-300 p-4 sm:p-6 md:p-8 rounded',
  fields: 'space-y-4',
  label: 'inline-flex sm:text-lg mb-1',
  ratings: '',
  stars: 'flex items-center [&_svg]:w-7 [&:hover_svg]:fill-orange-400',
  starBtn: '[&:hover~button>svg]:fill-[none]',
  emptyStar: 'text-orange-400',
  fullStar: 'text-orange-400 fill-orange-400',
  action: 'mt-6',
  submit:
    'rounded inline-flex items-center px-6 h-10 sm:px-8 sm:h-12 font-medium uppercase text-xs sm:text-sm tracking-wider duration-150',
  submitDisabled: 'bg-gray-300 text-white',
  submitNormal: 'bg-black text-white hover:bg-gray-900',
  message: 'mt-4 sm:mt-5 rounded-lg py-2 px-4 flex justify-between space-x-4',
  messageSuccess: 'bg-green-50 text-green-800',
  messageError: 'bg-red-50 text-red-800',
}

interface ReviewFormProps {
  productId: string
}
interface IReviewData {
  comment: string
}

const ReviewForm = ({productId}: ReviewFormProps) => {
  const [rating, setRating] = useState(5)
  const [createReview, {isLoading, isSuccess, isError, error, data}] = useCreateReviewMutation()
  const message = (error as any)?.data?.message || data?.message || ''

  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<IReviewData>()

  const sendFormData = (data: IReviewData) => {
    const reviewData = {...data, rating, productId}
    if (!isLoading) {
      createReview(reviewData)
    }
  }

  return (
    <div className={css.wrapper}>
      <form className={css.form} onSubmit={handleSubmit(sendFormData)}>
        <div className={css.fields}>
          <div>
            <label className={css.label}>Rating</label>
            <div className={css.stars}>
              {Array(5)
                .fill(1)
                .map((_, i) => (
                  <button
                    type="button"
                    key={i}
                    className={css.starBtn}
                    onClick={() => setRating(i + 1)}
                  >
                    <StarIcon className={rating > i ? css.fullStar : css.emptyStar} />
                  </button>
                ))}
            </div>
          </div>
          <Textarea
            name="comment"
            label="Comment"
            placeholder="Enter a comment"
            register={register}
            watch={watch}
            hints={{
              required: 'Comment is required',
            }}
            options={{
              required: true,
            }}
            errors={errors}
          />
        </div>
        <div className={css.action}>
          <button
            type="submit"
            className={cn(css.submit, isLoading ? css.submitDisabled : css.submitNormal)}
          >
            Publish
          </button>
        </div>
        {!isLoading && (isSuccess || isError) && (
          <p className={cn(css.message, isError ? css.messageError : css.messageSuccess)}>
            {message}
          </p>
        )}
      </form>
    </div>
  )
}

export default ReviewForm
