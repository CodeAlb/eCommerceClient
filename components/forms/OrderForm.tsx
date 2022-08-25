import {useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {toast} from 'react-toastify'
import {useUpdateOrderMutation} from '../../store/api/baseApi'
import {IOrder} from '../../types/order'
import {ORDER_STATUS_LIST} from '../../utils/constants'
import {cn} from '../../utils/helpers'
import Select from '../fields/Select'

const css = {
  form: 'max-w-3xl p-4 sm:p-6 md:p-8 bg-white shadow border border-gray-200 rounded mb-8 sm:mb-10',
  fields: 'space-y-6 max-w-sm',
  action: 'mt-6 flex items-center justify-between',
  submit:
    'rounded inline-flex items-center px-6 h-10 sm:px-8 sm:h-12 font-medium uppercase text-xs sm:text-sm tracking-wider duration-150',
  submitDisabled: 'bg-gray-300 text-white',
  submitNormal: 'bg-black text-white hover:bg-gray-900',
}

interface OrderFormProps {
  order: IOrder
}

const OrderForm = ({order}: OrderFormProps) => {
  const [updateOrder, {isLoading, isSuccess, isError, error}] = useUpdateOrderMutation()
  const {_id, orderStatus} = order || {}

  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm({
    defaultValues: {orderStatus},
  })

  useEffect(() => {
    if (isSuccess) {
      toast.success('Order was updated')
    }
    if (isError) {
      toast.error((error as any)?.data?.message)
    }
  }, [isSuccess, isError, error])

  const sendFormData = (data: any) => {
    if (!isLoading) {
      updateOrder({id: _id, data})
    }
  }

  return (
    <form className={css.form} onSubmit={handleSubmit(sendFormData)}>
      <div className={css.fields}>
        <Select
          name="orderStatus"
          label="Order Status"
          choices={ORDER_STATUS_LIST}
          placeholder="Select Status"
          register={register}
          watch={watch}
          hints={{
            required: 'Status is required',
          }}
          options={{
            required: true,
          }}
          errors={errors}
        />
      </div>
      <div className={css.action}>
        <button
          type="submit"
          className={cn(css.submit, isLoading ? css.submitDisabled : css.submitNormal)}
        >
          Update Order
        </button>
      </div>
    </form>
  )
}

export default OrderForm
