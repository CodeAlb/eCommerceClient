import {useForm} from 'react-hook-form'
import {PRODUCT_CATEGORIES, PRODUCT_SELLERS} from '../../utils/constants'
import {cn} from '../../utils/helpers'
import Input from '../fields/Input'
import Select from '../fields/Select'
import Textarea from '../fields/Textarea'

const css = {
  form: 'max-w-xl',
  fields: 'space-y-6',
  group: 'grid grid-cols-2 gap-4 sm:gap-6',
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
    console.log(data)
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
          placeholder="Wooden Chair"
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
        <div className={css.group}>
          <Input
            name="price"
            label="Price ($)"
            placeholder="22.99"
            register={register}
            watch={watch}
            hints={{
              required: 'Price is required',
            }}
            options={{
              required: true,
            }}
            errors={errors}
          />
          <Input
            name="oldPrice"
            label="Old Price ($)"
            placeholder="35.99"
            register={register}
            watch={watch}
            errors={errors}
          />
        </div>
        <Textarea
          name="description"
          label="Description"
          placeholder="Long description..."
          register={register}
          watch={watch}
          minHeight={200}
          hints={{
            required: 'Description is required',
          }}
          options={{
            required: true,
          }}
          errors={errors}
        />
        <Textarea
          name="exceprt"
          label="Excerpt"
          placeholder="Short description..."
          register={register}
          minHeight={100}
          watch={watch}
          errors={errors}
        />
        <div className={css.group}>
          <Input
            name="stock"
            label="Stock"
            placeholder="22"
            register={register}
            watch={watch}
            hints={{
              required: 'Stock is required',
              validate: 'Not enough stock',
            }}
            options={{
              required: true,
              validate: (value: any) => Number(value) >= 0,
            }}
            errors={errors}
          />
          <Select
            name="seller"
            label="Seller"
            choices={PRODUCT_SELLERS}
            placeholder="Select Seller"
            register={register}
            watch={watch}
            hints={{
              required: 'Seller is required',
            }}
            options={{
              required: true,
            }}
            errors={errors}
          />
        </div>

        <Select
          name="category"
          label="Category"
          choices={PRODUCT_CATEGORIES}
          placeholder="Select Category"
          register={register}
          watch={watch}
          hints={{
            required: 'Category is required',
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
          Publish
        </button>
      </div>
      {isError && <div className={css.warning}>{(error as any)?.data?.message}</div>}
    </form>
  )
}

export default NewProductForm
