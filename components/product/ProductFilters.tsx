import {useState} from 'react'
import {IProductFilter} from '../../types/product'
import {cn, fillArray} from '../../utils/helpers'
import {StarEmptyIcon, StarFilledIcon} from '../Svg'
import RangeSlider from '../elements/RangeSlider'
import StarRating from '../StarRating'

interface ProductFiltersProps {
  filter: IProductFilter
  setFilter: (filter: any) => void
}

const css = {
  wrapper: 'md:col-span-3 order-2 mt-12 md:mt-0 md:order-1',
  filterTitle: 'font-medium mb-6 text-xl uppercase mb-2',
  filters: 'space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16',
  filter: 'max-w-sm mx-auto sm:mx-0',
  categoryActive: 'opacity-50 line-through',
  ratingActive: 'opacity-50 line-through',
  action: '',
  applyBtn:
    'rounded px-2 h-6 bg-white border border-black text-black font-medium uppercase text-xs tracking-wider hover:bg-black hover:text-white duration-150',
  stars: 'mr-2 flex items-center [&>*]:w-4',
  filterList: 'space-y-1',
}

const PRICE_RANGE = [0, 1000]
const CATEGORIES = ['Chair', 'Lamp', 'Drawer', 'Table', 'Clock']

const ProductFilters = ({filter, setFilter}: ProductFiltersProps) => {
  const [price, setPrice] = useState<any>(PRICE_RANGE)

  let marks: any = {}
  marks[PRICE_RANGE[0]] = `$${price[0]}`
  marks[PRICE_RANGE[1]] = `$${price[1]}`

  return (
    <aside className={css.wrapper}>
      <div className={css.filters}>
        <div className={css.filter}>
          <h3 className={css.filterTitle}>Price range</h3>
          <RangeSlider
            min={PRICE_RANGE[0]}
            max={PRICE_RANGE[1]}
            step={10}
            onChange={(price) => setPrice(price)}
          >
            <button
              onClick={() => {
                setFilter({...filter, page: undefined, price})
              }}
              className={css.applyBtn}
            >
              Apply
            </button>
          </RangeSlider>
        </div>
        <div className={css.filter}>
          <h3 className={css.filterTitle}>Categories</h3>
          <ul className={css.filterList}>
            <li>
              <button
                className={filter.category ? '' : css.categoryActive}
                onClick={() => {
                  setFilter({...filter, page: undefined, price, category: null})
                }}
              >
                Show All
              </button>
            </li>
            {CATEGORIES.map((category, i) => (
              <li key={category}>
                <button
                  className={filter.category === category ? css.categoryActive : ''}
                  onClick={() => {
                    setFilter({...filter, page: undefined, price, category})
                  }}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className={css.filter}>
          <h3 className={css.filterTitle}>Ratings</h3>
          <ul className={css.filterList}>
            <li>
              <button
                className={filter.ratings ? '' : css.ratingActive}
                onClick={() => {
                  setFilter({...filter, page: undefined, price, ratings: null})
                }}
              >
                Show All
              </button>
            </li>
            {fillArray(5, 5).map((n, i) => (
              <li key={i} className={i ? 'pt-1.5' : ''}>
                <button
                  className={cn(css.stars, filter.ratings === n - i ? css.ratingActive : '')}
                  onClick={() => {
                    setFilter({...filter, page: undefined, price, ratings: n - i})
                  }}
                >
                  <StarRating rating={n - i} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  )
}

export default ProductFilters
