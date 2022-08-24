import {TrashIcon} from '@heroicons/react/outline'
import Image from 'next/future/image'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {toast} from 'react-toastify'
import {useCreateProductMutation} from '../../store/api/baseApi'
import {IImage} from '../../types/image'
import {IProduct} from '../../types/product'
import {DIR_PATHS, PRODUCT_CATEGORIES, PRODUCT_SELLERS} from '../../utils/constants'
import {cn} from '../../utils/helpers'
import Images from '../fields/Images'
import Input from '../fields/Input'
import Select from '../fields/Select'
import Textarea from '../fields/Textarea'

const css = {
  form: 'max-w-xl',
  fields: 'space-y-6',
  group: 'grid grid-cols-2 gap-4 sm:gap-6',
  action: 'mt-10 flex items-center justify-between',
  submit:
    'rounded inline-flex items-center px-6 h-10 sm:px-8 sm:h-12 font-medium uppercase text-xs sm:text-sm tracking-wider duration-150',
  submitDisabled: 'bg-gray-300 text-white',
  submitNormal: 'bg-black text-white hover:bg-gray-900',
  images: 'grid grid-cols-4 gap-2',
  imageItem: 'relative pt-[80%]',
  image: 'absolute inset-0 w-full h-full object-cover',
  deleteBtn: 'group rounded-full bg-white absolute top-0.5 right-0.5 p-1 shadow-md',
  deleteIcon: 'w-5 text-gray-500 group-hover:text-red-600 duration-150',
}

const NewProductForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<any>()
  const [createProduct, {isLoading, isSuccess, isError, error, data}] = useCreateProductMutation()
  const [images, setImages] = useState([])
  const {push} = useRouter()

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message)
      push(`${DIR_PATHS.dashboard}/products`)
    }
    if (isError) {
      toast.error((error as any)?.data?.message)
    }
  }, [isSuccess, isError, error, data])

  const onImageDelete = (index: number) => {
    setImages((state) => {
      let newArray = [...state]
      newArray.splice(index, 1)
      return newArray
    })
  }

  const sendFormData = (data: any) => {
    if (!isLoading) {
      const formData = new FormData()

      formData.set('name', data.name)
      formData.set('price', data.price)
      if (data.oldPrice) {
        formData.set('oldPrice', data.oldPrice)
      }
      formData.set('description', data.description)
      formData.set('excerpt', data.excerpt)
      formData.set('stock', data.stock)
      formData.set('seller', data.seller)
      formData.set('category', data.category)

      images.forEach((image) => {
        formData.append('images', JSON.stringify(image))
      })
      createProduct(formData)
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
          name="excerpt"
          label="Excerpt"
          placeholder="Short description..."
          register={register}
          minHeight={100}
          hints={{
            required: 'Excerpt is required',
          }}
          options={{
            required: true,
          }}
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
        <Images setImages={setImages} />
        <div className={css.images}>
          {images.map((image: IImage | string, i) => (
            <div key={i} className={css.imageItem}>
              <Image
                src={typeof image === 'string' ? image : image?.url}
                alt="Product Preview"
                className={css.image}
                width={128}
                height={128}
              />
              <button
                type="button"
                onClick={() => {
                  onImageDelete(i)
                }}
                className={css.deleteBtn}
              >
                <TrashIcon strokeWidth={1.4} className={css.deleteIcon} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className={css.action}>
        <button
          type="submit"
          className={cn(css.submit, isLoading ? css.submitDisabled : css.submitNormal)}
        >
          Create Product
        </button>
      </div>
    </form>
  )
}

export default NewProductForm
