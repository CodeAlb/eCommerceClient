import {ReactNode} from 'react'

interface ResultsProps {
  children?: ReactNode
}

interface ResultsFoundProps extends ResultsProps {
  page: number
  total: number
  found: number
  limit: number
}

const css = {
  label: 'mb-4 text-center sm:text-left',
}

export const ResultsLoading = ({children}: ResultsProps) => (
  <>
    <p className={css.label}>Loading products...</p>
    {children}
  </>
)

export const ResultsNotFound = ({children}: ResultsProps) => (
  <>
    <p className={css.label}>No product was found</p>
    {children}
  </>
)

export const ResultsFound = ({page, total, found, limit, children}: ResultsFoundProps) => {
  const minFound = (page - 1) * limit + 1
  const maxFound = minFound + found - 1

  return (
    <>
      <p className={css.label}>
        {maxFound === total && minFound === 1 ? (
          <>Showing all {total} results</>
        ) : (
          <>
            Showing {minFound.toString()}–{maxFound} of {total} results
          </>
        )}
      </p>
      {children}
    </>
  )
}
