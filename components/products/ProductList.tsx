import {cn, fillArray} from '../../utils/helpers'
import ProductCard, {IProductCardProps} from './ProductCard'
import ProductCardLoading from './ProductCardLoading'

interface IProductListProps {
  className?: string
  isLoading?: boolean
  data: IProductCardProps[]
  skeletons?: number
  withSidebar?: boolean
}

const css = {
  wrapper: 'max-w-site mx-auto grid sm:grid-cols-2 gap-y-12 sm:gap-x-4 sm:gap-y-16',
  fourPerRow: 'md:grid-cols-3 lg:grid-cols-4',
  threePerRow: 'lg:grid-cols-3',
}

const ProductList = ({
  className,
  data,
  isLoading = true,
  skeletons = 8,
  withSidebar = false,
}: IProductListProps) => {
  if (!isLoading && data?.length === 0) {
    return null
  }

  return (
    <div className={cn(css.wrapper, className, withSidebar ? css.threePerRow : css.fourPerRow)}>
      {isLoading
        ? fillArray(skeletons).map((n, i) => <ProductCardLoading key={i} />)
        : data.map((product) => <ProductCard key={product._id} {...product} />)}
    </div>
  )
}

export default ProductList
