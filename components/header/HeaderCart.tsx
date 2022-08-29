import {ShoppingBagIcon} from '@heroicons/react/outline'
import {getCartState, openCart} from '../../store/slices/cartSlice'
import {useDispatch, useSelector} from '../../store/store'
import {cn} from '../../utils/helpers'

interface IHeaderCartProps {
  className?: string
}

const css = {
  wrapper: 'relative flex items-center',
  btn: 'relative duration-150 hover:opacity-75',
  icon: 'w-7 h-7 text-black',
  badge:
    'absolute -top-0.5 -right-0.5 px-1 rounded-full bg-red-600 text-white text-[10px] font-bold',
}

const HeaderCart = ({className}: IHeaderCartProps) => {
  const {items} = useSelector(getCartState)
  const dispatch = useDispatch()
  const productItems = items.reduce((total: number, item: any) => {
    total += item.amount
    return total
  }, 0)
  const openCartModal = () => {
    dispatch(openCart())
  }

  return (
    <div className={cn(css.wrapper, className)}>
      <button className={css.btn} onClick={openCartModal}>
        <ShoppingBagIcon className={css.icon} strokeWidth={1.5} />
        {productItems > 0 && <div className={css.badge}>{productItems}</div>}
      </button>
    </div>
  )
}

export default HeaderCart
