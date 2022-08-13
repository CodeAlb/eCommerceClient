import {fillArray, roundByHalf} from '../../utils/helpers'
import {StarEmptyIcon, StarFilledIcon, StarHalfIcon} from '../Svg'

interface ProductStarReviewsProps {
  className?: string
  ratings: number
}

const ProductStarReviews = ({className, ratings}: ProductStarReviewsProps) => {
  const roundedRating = roundByHalf(ratings)
  const stars = fillArray(5).map((n, i) => {
    if (roundedRating >= i + 1) {
      return <StarFilledIcon key={i} />
    } else if (roundedRating === i + 0.5) {
      return <StarHalfIcon key={i} />
    }
    return <StarEmptyIcon key={i} />
  })

  return <div className={className}>{stars}</div>
}

export default ProductStarReviews
