import {useState} from 'react'
import {cn} from '../../utils/helpers'
import {EyeClosedIcon, EyeOpenIcon} from '../Svg'

type InputProps = {
  name: string
  register: any
  errors?: any
  type?: 'text' | 'email'
  label: string
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
  input: 'w-full h-10 sm:h-12 sm:text-lg px-2 sm:px-4 border border-black pr-7 sm:pr-9',
  toggle: 'absolute top-1/2 -translate-y-1/2 right-2 sm:right-4',
  eye: 'w-5 sm:w-6',
}

export const PasswordInput = ({
  name,
  label,
  placeholder,
  options,
  register,
  watch,
  errors,
  hints,
}: InputProps) => {
  const [visible, setVisible] = useState(false)
  const isError = errors?.[name]
  const errorType = errors?.[name]?.type
  const val = watch(name)

  return (
    <div className={cn(css.field, isError ? css.fieldError : css.fieldValid)}>
      <label htmlFor={name} className={cn(css.label, isError ? css.labelError : css.labelNormal)}>
        {isError ? hints?.[errorType] || label : label}
      </label>
      <div className={css.control}>
        <input
          id={name}
          type={visible ? 'text' : 'password'}
          autoComplete="off"
          spellCheck="false"
          placeholder={placeholder}
          className={cn(css.input, val && !visible && 'font-[small-caption]')}
          {...register(name, options)}
        />
        <button
          type="button"
          className={css.toggle}
          onClick={(e) => {
            e.preventDefault()
            setVisible(!visible)
          }}
        >
          {visible ? <EyeOpenIcon className={css.eye} /> : <EyeClosedIcon className={css.eye} />}
        </button>
      </div>
    </div>
  )
}

const Input = ({
  name,
  label,
  placeholder,
  type = 'text',
  options,
  register,
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
      <input
        id={name}
        type={type}
        autoComplete="off"
        spellCheck="false"
        placeholder={placeholder}
        className={cn(css.control, css.input)}
        {...register(name, options)}
      />
    </div>
  )
}

export default Input
