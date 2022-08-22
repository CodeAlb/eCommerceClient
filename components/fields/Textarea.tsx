import {cn} from '../../utils/helpers'

type InputProps = {
  name: string
  register: any
  errors?: any
  type?: 'text' | 'email'
  label: string
  minHeight?: number
  placeholder?: string
  options?: any
  watch?: any
  hints?: any
}

const css = {
  field: '',
  fieldValid: 'border-gray-400 dark:border-gray-700',
  fieldError: 'border-red-600 dark:border-red-400',
  label: 'inline-flex sm:text-lg mb-1 cursor-pointer',
  labelError: 'text-red-600',
  labelNormal: 'text-black',
  control: 'relative',
  input: 'w-full sm:text-lg p-2 sm:p-4 border border-black',
}

const Textarea = ({
  name,
  label,
  placeholder,
  type = 'text',
  options,
  register,
  minHeight = 120,
  errors,
  hints,
}: InputProps) => {
  const isError = errors?.[name]
  const errorType = errors?.[name]?.type

  return (
    <div className={cn(css.field, isError ? css.fieldError : css.fieldValid)}>
      <label htmlFor={name} className={cn(css.label, isError ? css.labelError : css.labelNormal)}>
        {isError ? hints?.[errorType] || label : label}
      </label>
      <textarea
        id={name}
        type={type}
        autoComplete="off"
        spellCheck="false"
        placeholder={placeholder}
        className={cn(css.control, css.input)}
        style={{
          minHeight: `${minHeight}px`
        }}
        {...register(name, options)}
      />
    </div>
  )
}

export default Textarea
