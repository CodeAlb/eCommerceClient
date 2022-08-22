import { ChevronDownIcon } from '@heroicons/react/outline'
import {cn} from '../../utils/helpers'

type InputProps = {
  name: string
  register: any
  errors?: any
  label: string
  placeholder?: string
  choices: any[]
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
  input: 'w-full h-10 sm:h-12 sm:text-lg pl-1.5 sm:pl-3.5 pr-7 sm:pr-9 border border-black appearance-none outline-0',
  arrow: 'absolute top-1/2 -translate-y-1/2 right-1.5 sm:right-3 w-4 sm:w-5 pointer-events-none',
}

const Select = ({
  name,
  label,
  placeholder,
  options,
  choices,
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
      <div className={css.control}>
        <select
          id={name}
          autoComplete="off"
          spellCheck="false"
          placeholder={placeholder}
          className={cn(css.control, css.input)}
          {...register(name, options)}
        >
          {choices.map((choice, i) => <option value={choice} key={i}>{choice}</option>)}
        </select>
        <ChevronDownIcon className={css.arrow} />
      </div>
    </div>
  )
}

export default Select