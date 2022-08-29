import {ReactNode} from 'react'
import {cn} from '../../utils/helpers'

const css = {
  message: 'mb-4 text-center sm:text-left text-gray-500',
}

interface QueryResultsProps {
  className?: string
  isLoading?: boolean
  children?: ReactNode
  page: number
  total: number
  found: number
  limit: number
}

const QueryResults = (props: QueryResultsProps) => {
  const {isLoading, className, children, page, total, found, limit} = props
  if (isLoading) {
    return (
      <>
        <p className={cn(css.message, className)}>Loading data...</p>
        {children}
      </>
    )
  }
  if (!found) {
    return (
      <>
        <p className={cn(css.message, className)}>No data was found</p>
        {children}
      </>
    )
  }

  const minFound = (page - 1) * limit + 1
  const maxFound = minFound + found - 1

  return (
    <>
      <p className={cn(css.message, className)}>
        {maxFound === total && minFound === 1
          ? `Showing all ${total} results`
          : `Showing ${minFound.toString()}–${maxFound} of ${total} results`}
      </p>
      {children}
    </>
  )
}

export default QueryResults
