import {useMemo} from 'react'
import {StarIcon} from '@heroicons/react/outline'
import {cn} from '../../utils/helpers'

const css = {
  emptyStar: 'text-orange-400',
  fullStar: 'text-orange-400 fill-orange-400',
  starWrapper: 'relative',
  halfWrapper: 'absolute left-0 top-0 overflow-hidden w-1/2',
}

interface IStarRatingProps {
  rating: number
  className?: string
  starClassName?: string
  hasHalfStars?: boolean
}

const MAX_STARS = 5

const StarRating = ({className, rating, hasHalfStars}: IStarRatingProps) => {
  const stars = useMemo(() => {
    const starList = Array(MAX_STARS).fill(1)

    return starList.map((_, i) => {
      if (hasHalfStars) {
        const halfRoundedRating = Number((Math.round(rating * 2) / 2).toFixed(1))

        if (halfRoundedRating >= i + 1) {
          return <StarIcon key={i} className={cn(className, css.fullStar)} />
        } else if (halfRoundedRating === i + 0.5) {
          return (
            <span className={css.starWrapper}>
              <StarIcon key={i} className={cn(className, css.emptyStar)} />
              <span className={css.halfWrapper}>
                <StarIcon key={i} className={cn(className, css.fullStar)} />
              </span>
            </span>
          )
        }
      } else {
        const roundedRating = Math.round(rating)

        if (roundedRating > i) {
          return <StarIcon key={i} className={cn(className, css.fullStar)} />
        }
      }

      return <StarIcon key={i} className={cn(className, css.emptyStar)} />
    })
  }, [rating, hasHalfStars, className])

  return <>{stars}</>
}

export default StarRating
