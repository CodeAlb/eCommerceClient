import {CloudUploadIcon} from '@heroicons/react/outline'
import {FormEvent, useEffect} from 'react'
import {toast} from 'react-toastify'
import {useUploadImagesMutation} from '../../store/api/baseApi'

type InputProps = {
  name: string
  label: string
  productId: string
}

const css = {
  field: 'w-full text-center',
  control:
    'cursor-pointer inline-flex uppercase font-medium text-sm items-center justify-center px-3 h-10 sm:h-12 sm:px-4 bg-gray-200 border border-gray-200 hover:border-black hover:bg-white rounded duration-150',
  input: 'hidden',
  label: '',
  icon: 'mr-2 w-4',
}

const Images = ({name, label, productId}: InputProps) => {
  const [uploadImages, {isLoading, isSuccess, isError, error}] = useUploadImagesMutation()

  useEffect(() => {
    if (isSuccess) {
      toast.success('Images have been uploaded')
    }
    if (isError) {
      toast.error((error as any)?.data?.message || 'Something went wrong')
    }
  }, [isSuccess, isError, error])

  const onSubmitFile = (e: FormEvent) => {
    const formData = new FormData()
    const files = (e.target as HTMLInputElement).files

    Object.values(files as FileList).forEach((file: File) => {
      formData.append('file', file)
    })

    uploadImages({productId, formData})
  }

  return (
    <div className={css.field}>
      <label className={css.control} tabIndex={-1}>
        <input
          name={name}
          onChange={onSubmitFile}
          id={name}
          type="file"
          multiple
          autoComplete="off"
          accept="image/png,image/gif,image/jpeg"
          className={css.input}
        />
        <CloudUploadIcon className={css.icon} />
        <span className={css.label}>{label}</span>
      </label>
    </div>
  )
}

export default Images
