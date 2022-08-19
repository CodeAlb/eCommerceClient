import Link from 'next/link'
import {useEffect} from 'react'
import {closeCart, getCartState} from '../store/slices/cartReducer'
import {useDispatch, useSelector} from '../store/store'
import {cn} from '../utils/helpers'
import CartProducts from './CartProducts'

const css = {
  wrapper: 'fixed inset-0 z-10',
  wrapperHide: 'invisible',
  wrapperShow: 'visible',
  overlay: 'absolute inset-0 bg-black/30',
  overlayHide: 'opacity-0 invisible',
  overlayShow: 'opacity-100 visible delay-150 duration-500',
  modal: 'absolute w-[90%] max-w-sm h-full top-0 right-0 bg-white flex flex-col',
  modalHide: 'translate-x-full',
  modalShow: 'translate-x-0 duration-500',
  products: 'py-6 px-4 sm:px-8 grow overflow-y-auto',
  headline: 'px-4 pt-8 pb-3 border-b border-b-gray-200',
  title: 'text-lg sm:text-xl font-medium text-center',
  action: 'px-4 sm:px-8 pb-8 text-center',
  total: 'py-3 flex items-center justify-between border-y border-gray-200',
  totalTitle: 'uppercase font-medium',
  totalPrice: 'font-bold',
  cartBtn:
    'mt-6 flex items-center justify-center h-10 px-4 text-sm uppercase font-medium bg-black text-white rounded hover:bg-gray-700 duration-150',
  checkoutBtn:
    'mt-2 inline-flex items-center justify-center h-10 px-4 text-xs uppercase font-bold text-black hover:text-gray-700 duration-150',
}

const calculateTotal = (items: any[]) => {
  let sum = 0
  items?.forEach((i: any) => {
    sum += i.price * i.amount
  })
  return sum
}

const CartModal = () => {
  const {isCartOpen, items} = useSelector(getCartState)
  const dispatch = useDispatch()

  useEffect(() => {
    const body = document.body.classList
    if (isCartOpen) {
      body.add('fixed')
      body.add('inset-0')
    } else {
      body.remove('fixed')
      body.remove('inset-0')
    }
  }, [isCartOpen])

  const closeModal = () => {
    dispatch(closeCart())
  }

  return (
    <div className={cn(css.wrapper, isCartOpen ? css.wrapperShow : css.wrapperHide)}>
      <div
        className={cn(css.overlay, isCartOpen ? css.overlayShow : css.overlayHide)}
        onClick={closeModal}
      ></div>
      <div className={cn(css.modal, isCartOpen ? css.modalShow : css.modalHide)}>
        <div className={css.headline}>
          <h3 className={css.title}>Shopping Cart</h3>
        </div>
        <div className={css.products}>
          <CartProducts isModal={true} />
        </div>
        <div className={css.action}>
          <div className={css.total}>
            <span className={css.totalTitle}>Total:</span>
            <span className={css.totalPrice}>${calculateTotal(items).toFixed(2)}</span>
          </div>
          <Link href="/cart/checkout">
            <a onClick={closeModal} className={css.cartBtn}>
              Go to checkout
            </a>
          </Link>
          <Link href="/cart">
            <a onClick={closeModal} className={css.checkoutBtn}>
              View Shopping Cart
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CartModal
