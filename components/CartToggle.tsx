import {ShoppingBagIcon} from '@heroicons/react/outline'
import {getCartState, openCart} from '../store/slices/cartReducer'
import {useDispatch, useSelector} from '../store/store'

type CartToggleProps = {
  className?: string
}

const css = {
  wrapper: 'relative flex items-center',
  btn: 'relative duration-150 hover:opacity-75',
  icon: 'w-6 h-6 text-black',
  badge:
    'absolute -top-0.5 -right-0.5 px-1 rounded-full bg-red-600 text-white text-[10px] font-bold',
}

const CartToggle = ({className}: CartToggleProps) => {
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
    <div className={css.wrapper}>
      <button className={css.btn} onClick={openCartModal}>
        <ShoppingBagIcon className={css.icon} />
        {/* {productItems > 9 ? (
          <ShoppingCartIcon className={css.icon} />
        ) : (
          <ShoppingBagIcon className={css.icon} />
        )} */}
        {productItems > 0 && <div className={css.badge}>{productItems}</div>}
      </button>
    </div>
  )
}

export default CartToggle
