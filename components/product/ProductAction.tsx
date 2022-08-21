import {useState} from 'react'
import {MinusIcon, PlusIcon} from '@heroicons/react/outline'
import {IProduct} from '../../types/product'
import {addToCard} from '../../store/slices/cartReducer'
import {useDispatch} from '../../store/store'
import {cn} from '../../utils/helpers'

interface ProductActionProps {
  product?: IProduct
}

const css = {
  action: 'mt-10 flex items-center space-x-2',
  actionDisable: 'opacity-30 pointer-events-none select-none',
  amount: 'flex px-2 items-center rounded shadow-[inset_0_0_0_1px_#ddd] leading-none',
  amountBtn: 'inline-flex items-center justify-center w-6 h-9 text-2xl font-medium',
  amountBtnFade: 'text-gray-300',
  amountBtnShow: 'text-black',
  amountIcon: 'w-3.5',
  amountInput: 'h-10 w-8 font-medium bg-transparent text-gray-900 text-center',
  addToCard:
    'rounded px-6 h-10 bg-black text-white font-medium uppercase text-sm tracking-wider hover:opacity-75 duration-150',
}

const ProductAction = ({product}: ProductActionProps) => {
  const {stock = 0} = product || {}
  const canBuyProduct = stock > 0
  const [amount, setAmount] = useState(1)
  const dispatch = useDispatch()

  const updateAmount = (e: any) => {
    const value: any = Number(e.target.value)
    let isNum = /^\d+$/.test(value)
    if (isNum) {
      setAmount(value > stock ? stock : value < 1 ? 1 : value)
    }
  }
  const increaseAmount = () => {
    if (amount < stock) {
      setAmount(amount + 1)
    }
  }
  const decreaseAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1)
    }
  }
  const addItemToCard = () => {
    dispatch(
      addToCard({
        product,
        amount,
      })
    )
  }

  return (
    <div className={cn(css.action, !canBuyProduct && css.actionDisable)}>
      <div className={css.amount}>
        <button
          onClick={decreaseAmount}
          className={cn(css.amountBtn, amount === 1 ? css.amountBtnFade : css.amountBtnShow)}
        >
          <MinusIcon className={css.amountIcon} />
        </button>
        <input
          onChange={updateAmount}
          className={css.amountInput}
          value={canBuyProduct ? amount : 0}
        />
        <button
          onClick={increaseAmount}
          className={cn(css.amountBtn, amount === stock ? css.amountBtnFade : css.amountBtnShow)}
        >
          <PlusIcon className={css.amountIcon} />
        </button>
      </div>
      <button className={css.addToCard} onClick={addItemToCard}>
        Add to Card
      </button>
    </div>
  )
}

export default ProductAction
