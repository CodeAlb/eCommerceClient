import {useForm} from 'react-hook-form'
import { cn } from '../../utils/helpers'
import Input from '../fields/Input'

const css = {
  form: 'max-w-sm mx-auto',
  fields: 'space-y-6',
  action: 'mt-10 flex items-center justify-between',
  warning: 'mt-6 text-red-600',
  submit:
    'rounded inline-flex items-center px-6 h-10 sm:px-8 sm:h-12 font-medium uppercase text-xs sm:text-sm tracking-wider duration-150',
  submitDisabled: 'bg-gray-300 text-white',
  submitNormal: 'bg-black text-white hover:bg-gray-900',
}

const NewProductForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<any>()
  const isLoading = false
  const isError = false
  const error = {}

  const sendFormData = (data: any) => {
    if (!isLoading) {
      // createProduct(data)
    }
  }

  return (
    <form className={css.form} onSubmit={handleSubmit(sendFormData)}>
      <div className={css.fields}>
        <Input
          name="name"
          label="Product Name"
          placeholder="Product Name"
          register={register}
          watch={watch}
          hints={{
            required: 'Product Name is required',
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
          Create Product
        </button>
      </div>
      {isError && <div className={css.warning}>{(error as any)?.data?.message}</div>}
    </form>
  )
}

export default NewProductForm