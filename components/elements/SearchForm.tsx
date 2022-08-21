import {FormEvent, useEffect, useRef} from 'react'
import {SearchIcon} from '@heroicons/react/outline'
import {cn} from '../../utils/helpers'

type SearchFormProps = {
  onSubmitValue: (value: any) => void
  label?: string
  focusOnMount?: boolean
  placeholder?: string
  className?: string
}

const css = {
  wrapper: 'relative max-w-md mx-auto',
  input:
    'pl-3 sm:pl-4 pr-28 sm:pr-32 h-12 sm:h-14 sm:text-lg rounded-full border border-gray-200 shadow-[1px_1px_2px_#ddd] focus:shadow-[1px_3px_4px_#ccc] hover:shadow-[1px_2px_3px_#ddd] w-full',
  btn: 'absolute bg-black text-xs font-medium text-white px-3.5 sm:px-4 h-8 sm:h-10 rounded-full right-2 top-1/2 -translate-y-1/2 inline-flex items-center uppercase hover:bg-gray-900 duration-150',
  btnIcon: 'ml-2 w-4 -mr-1 sm:w-5 -scale-x-100',
}

const SearchForm = ({
  label = 'Search',
  placeholder,
  focusOnMount = true,
  className,
  onSubmitValue,
}: SearchFormProps) => {
  const ref = useRef<any>()

  useEffect(() => {
    if (focusOnMount && ref.current) {
      ref.current.focus()
    }
  }, [ref, focusOnMount])

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmitValue(ref.current.value)
  }

  return (
    <form className={cn(css.wrapper, className)} onSubmit={onFormSubmit}>
      <input ref={ref} className={css.input} placeholder={placeholder} />
      <button onClick={onFormSubmit} className={css.btn}>
        <span>{label}</span>
        <SearchIcon className={css.btnIcon} />
      </button>
    </form>
  )
}

export default SearchForm
