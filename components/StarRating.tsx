import {useMemo} from 'react'
import {cn, tw} from '../utils/helpers'
import {StarIcon} from './Svg'

const css = tw({
  emptyStar: 'text-orange-400',
  halfStar: 'text-orange-400 [&_.half]:fill-orange-400',
  fullStar: 'text-orange-400 fill-orange-400',
})

interface StarRatingProps {
  rating: number
  className?: string
  starClassName?: string
  hasHalfStars?: boolean
}

const MAX_STARS = 5

const StarRating = ({className, rating, hasHalfStars}: StarRatingProps) => {
  const stars = useMemo(() => {
    const starList = Array(MAX_STARS).fill(1)

    return starList.map((_, i) => {
      let starClassName = css.emptyStar

      if (hasHalfStars) {
        const halfRoundedRating = Number((Math.round(rating * 2) / 2).toFixed(1))

        if (halfRoundedRating >= i + 1) {
          starClassName = css.fullStar
        } else if (halfRoundedRating === i + 0.5) {
          starClassName = css.halfStar
        }
      } else {
        const roundedRating = Math.round(rating)

        if (roundedRating > i) {
          starClassName = css.fullStar
        }
      }

      return <StarIcon key={i} className={cn(className, starClassName)} />
    })
  }, [rating, hasHalfStars, className])

  return <>{stars}</>
}

export default StarRating
