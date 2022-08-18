import {IProduct} from '../../types/product'
import {numToPrice} from '../../utils/helpers'
import Breadcrumb from '../Breadcrumb'
import StarRating from '../StarRating'
import ProductAction from './ProductAction'
import ProductDetailsLoading from './ProductDetailsLoading'

type ProductDetailsProps = {
  product?: IProduct
  isLoading?: boolean
}

const css = {
  crumbs: 'mb-2',

  name: 'text-2xl sm:text-3xl font-medium text-black uppercase',
  ratings: 'mt-4 flex items-center',
  stars: 'mr-2 flex items-center [&>*]:w-4',
  reviews: 'text-sm text-gray-500',
  price: 'mt-4 text-xl sm:text-2xl text-black flex items-center font-medium',
  oldPrice: 'line-through mr-4 text-gray-500',
  excerpt: 'mt-4 max-w-md',

  meta: 'mt-12 flex flex-col space-y-0.5',
  metaItem: 'flex items-center text-sm',
  metaLabel: 'w-20 pr-2 text-black font-medium',
  metaValue: 'text-gray-500',

  stock: 'mt-2 text-sm font-medium flex items-center space-x-2',
  stockGreen: 'text-green-600',
  stockRed: 'text-red-600',
}

const ProductDetails = ({product, isLoading}: ProductDetailsProps) => {
  if (isLoading) {
    return <ProductDetailsLoading />
  }

  const {
    name,
    ratings = 0,
    numOfReviews = 0,
    oldPrice = 0,
    price = 0,
    excerpt,
    stock = 0,
    _id,
    category,
    seller,
  } = product || {}
  const crumbLinks = [
    {title: 'Home', path: '/'},
    {title: 'Shop', path: '/shop'},
  ]

  return (
    <>
      <Breadcrumb className={css.crumbs} links={crumbLinks} />
      <h1 className={css.name}>{name}</h1>
      <div className={css.ratings}>
        <div className={css.stars}>
          <StarRating rating={ratings} hasHalfStars />
        </div>
        <span className={css.reviews}>
          ({numOfReviews} {numOfReviews === 1 ? 'Review' : 'Reviews'})
        </span>
      </div>
      <div className={css.price}>
        {Number(oldPrice) > 0 && <span className={css.oldPrice}>{numToPrice(oldPrice)}</span>}
        {<span>{numToPrice(price)}</span>}
      </div>
      <div className={css.excerpt}>{excerpt}</div>
      <ProductAction product={product} />
      <div className={css.stock}>
        {stock > 0 ? (
          <span className={css.stockGreen}>{stock} Available</span>
        ) : (
          <span className={css.stockRed}>Out of Stock</span>
        )}
      </div>
      <div className={css.meta}>
        <div className={css.metaItem}>
          <span className={css.metaLabel}>Product:</span>
          <span className={css.metaValue}>{_id}</span>
        </div>
        <div className={css.metaItem}>
          <span className={css.metaLabel}>Category:</span>
          <span className={css.metaValue}>{category}</span>
        </div>
        <div className={css.metaItem}>
          <span className={css.metaLabel}>Seller:</span>
          <span className={css.metaValue}>{seller}</span>
        </div>
      </div>
    </>
  )
}

export default ProductDetails
