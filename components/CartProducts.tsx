import Link from 'next/link'
import {MinusIcon, PlusIcon, XIcon} from '@heroicons/react/outline'
import {
  decrementAmount,
  deleteCartItem,
  getCartState,
  incrementAmount,
} from '../store/slices/cartReducer'
import {useDispatch, useSelector} from '../store/store'
import {cn} from '../utils/helpers'
import Image from 'next/future/image'

type CartProductsProps = {
  isModal?: boolean
}

const css = {
  wrapper: 'flex flex-col space-y-6',
  wrapperBig: 'md:space-y-8',
  item: 'flex',
  media: 'shrink-0 relative',
  body: 'grow px-6 flex flex-col',
  amount: 'inline-flex mt-2 border border-gray-200 rounded',
  amountBig: '',
  image: 'w-16 h-16 rounded',
  imageBig: 'sm:w-20 sm:h-20 ',
  name: 'text-sm line-clamp-2',
  nameBig: 'line-clamp-3 sm:text-base md:text-lg', //'sm:text-xl',
  link: 'hover:text-gray-500 duration-150',
  price: 'shrink-0 flex flex-col items-end space-y-1 text-sm uppercase font-medium',
  priceBig: 'md:text-base',
  remove:
    'absolute -left-2.5 -top-2 p-1 rounded-full bg-white border border-gray-200 shadow-lg text-gray-500 hover:scale-110 hover:text-red-600 duration-150',
  removeIcon: 'w-4',
  amountBtn: 'px-1.5 py-1 flex items-center justify-center',
  amountBtnNormal: 'text-gray-500 duration-150 hover:text-black',
  amountBtnError: 'text-gray-300',
  amountInput: 'w-8 font-medium text-center text-sm',
  amountInputBig: 'sm:py-0.5',
  amountIcon: 'w-3',
}

const EmptyCart = () => <>No items in cart</>

const ProductAmount = ({product, isModal}: any) => {
  const dispatch = useDispatch()
  const isMaxedOut = product.amount === product.stock
  const isMinAllowed = product.amount === 1

  const increaseAmount = () => {
    if (!isMaxedOut) {
      dispatch(incrementAmount(product))
    }
  }
  const decreaseAmount = () => {
    if (!isMinAllowed) {
      dispatch(decrementAmount(product))
    }
  }

  return (
    <div>
      <div className={cn(css.amount, !isModal && css.amountBig)}>
        <button
          onClick={decreaseAmount}
          className={cn(css.amountBtn, isMinAllowed ? css.amountBtnError : css.amountBtnNormal)}
        >
          <MinusIcon className={css.amountIcon} />
        </button>
        <input
          className={cn(css.amountInput, !isModal && css.amountInputBig)}
          value={product.amount}
          readOnly
        />

        <button
          onClick={increaseAmount}
          className={cn(css.amountBtn, isMaxedOut ? css.amountBtnError : css.amountBtnNormal)}
        >
          <PlusIcon className={css.amountIcon} />
        </button>
      </div>
    </div>
  )
}

const CartProducts = ({isModal = false}: CartProductsProps) => {
  const {items} = useSelector(getCartState)
  const dispatch = useDispatch()

  if (!items?.length) {
    return <EmptyCart />
  }

  return (
    <div className={cn(css.wrapper, !isModal && css.wrapperBig)}>
      {items.map((item: any) => (
        <div key={item._id} className={css.item}>
          <div className={css.media}>
            <button
              className={css.remove}
              onClick={() => {
                dispatch(deleteCartItem(item))
              }}
            >
              <XIcon className={css.removeIcon} />
            </button>
            <Image
              src={item.image}
              alt={item.name}
              className={cn(css.image, !isModal && css.imageBig)}
              width={48}
              height={48}
            />
          </div>
          <div className={css.body}>
            <h3 className={cn(css.name, !isModal && css.nameBig)}>
              <Link href={`/product/${item._id}`}>
                <a className={css.link}>{item.name}</a>
              </Link>
            </h3>

            <ProductAmount product={item} isModal={isModal} />
          </div>
          <div className={cn(css.price, !isModal && css.priceBig)}>
            {item.oldPrice ? (
              <>
                <span>${Number(item.price * item.amount).toFixed(2)}</span>
                <span className="text-gray-500 line-through">
                  ${Number(item.oldPrice * item.amount).toFixed(2)}
                </span>
              </>
            ) : (
              <span>${Number(item.price * item.amount).toFixed(2)}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CartProducts
