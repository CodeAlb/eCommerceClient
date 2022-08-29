import {cn} from '../../utils/helpers'

const css = {
  wrapper:
    'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent',
  crumbs: 'h-3 w-36 rounded bg-gray-200',
  nameTop: 'mt-4 h-6 sm:h-7 w-3/5 rounded bg-gray-300',
  nameBottom: 'mt-1.5 h-6 sm:h-7 w-4/5 rounded bg-gray-300',
  reviews: 'mt-7 h-4 w-36 rounded bg-gray-200',
  price: 'mt-6 h-6 sm:h-7 w-24 rounded bg-gray-300',
  action: 'mt-10 flex items-center space-x-2',
  excerpt: 'mt-6 max-w-md space-y-1.5',
  excerptTop: 'h-4 w-full rounded bg-gray-200',
  excerptBottom: 'h-4 w-3/4 rounded bg-gray-200',
  amount: 'h-10 w-24 rounded bg-gray-200',
  addToCard: 'h-10 w-36 rounded bg-gray-300',
  stock: 'mt-3 h-4 w-40 rounded bg-gray-200',
  meta: 'mt-10 flex flex-col space-y-1.5',
  metaItem: 'h-4 rounded bg-gray-200',
}

const ProductBodyLoading = () => (
  <div className={css.wrapper}>
    <div className={css.crumbs} />
    <div className={css.nameTop} />
    <div className={css.nameBottom} />
    <div className={css.reviews} />
    <div className={css.price} />
    <div className={css.excerpt}>
      <div className={css.excerptTop} />
      <div className={css.excerptBottom} />
    </div>
    <div className={css.action}>
      <div className={css.amount} />
      <div className={css.addToCard} />
    </div>
    <div className={css.stock} />
    <div className={css.meta}>
      <div className={cn(css.metaItem, 'w-52')} />
      <div className={cn(css.metaItem, 'w-40')} />
      <div className={cn(css.metaItem, 'w-32')} />
    </div>
  </div>
)

export default ProductBodyLoading
