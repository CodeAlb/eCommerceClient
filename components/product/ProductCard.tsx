import Link from 'next/link'
import {IProductCard} from '../../types/product'
import {numToPrice} from '../../utils/helpers'
import ProductStarReviews from './ProductStarReviews'

const css = {
  wrapper: '',
  link: 'group block max-w-sm mx-auto',
  media:
    'group-hover:opacity-75 duration-250 bg-gray-100 pt-[100%] relative rounded overflow-hidden',
  image: 'absolute inset-0 w-full h-full object-cover',
  body: 'mt-5 space-y-2',
  price: 'font-medium text-black flex items-center font-medium',
  oldPrice: 'line-through mr-4 text-gray-500',
  name: 'text-black truncate',
  ratings: 'flex items-center',
  stars: 'text-orange-600/60 mr-2 flex items-center [&>*]:w-4',
  reviews: 'text-sm text-gray-500',
}

const ProductCard = ({name, price, oldPrice, images, ratings, numOfReviews, _id}: IProductCard) => {
  const mainImageUrl = images?.[0]?.url

  return (
    <div className={css.wrapper}>
      <Link href={`/product/${_id}`}>
        <a className={css.link}>
          <div className={css.media}>
            <img src={mainImageUrl} className={css.image} />
          </div>
          <div className={css.body}>
            <div className={css.ratings}>
              <ProductStarReviews className={css.stars} ratings={ratings} />
              <span className={css.reviews}>
                ({numOfReviews} {numOfReviews === 1 ? 'Review' : 'Reviews'})
              </span>
            </div>
            <h3 className={css.name}>{name}</h3>
            <div className={css.price}>
              {Number(oldPrice) > 0 && <span className={css.oldPrice}>{numToPrice(oldPrice)}</span>}
              {<span>{numToPrice(price)}</span>}
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default ProductCard
