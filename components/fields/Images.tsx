import {CloudUploadIcon} from '@heroicons/react/outline'
import {FormEvent} from 'react'

type InputProps = {
  setImages: any
}

const css = {
  field: 'w-full text-center',
  control:
    'cursor-pointer inline-flex uppercase font-medium text-sm items-center justify-center px-3 h-10 sm:h-12 sm:px-4 bg-gray-200 border border-gray-200 hover:border-black hover:bg-white rounded duration-150',
  input: 'hidden',
  label: '',
  icon: 'mr-2 w-4',
}

const Images = ({setImages}: InputProps) => {
  const onUploadFile = (e: FormEvent) => {
    const files = Array.from((e.target as HTMLInputElement).files as FileList)

    files.forEach((file) => {
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((state: any[]) => [...state, reader.result])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  return (
    <div className={css.field}>
      <label className={css.control} tabIndex={-1}>
        <input
          name="upload"
          onChange={onUploadFile}
          id="upload"
          type="file"
          multiple
          autoComplete="off"
          accept="image/png,image/gif,image/jpeg"
          className={css.input}
        />
        <CloudUploadIcon className={css.icon} />
        <span className={css.label}>Upload Images</span>
      </label>
    </div>
  )
}

export default Images
