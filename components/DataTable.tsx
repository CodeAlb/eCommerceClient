import Link from 'next/link'
import React, {ReactNode} from 'react'
import {cn, fillArray} from '../utils/helpers'

const css = {
  wrapper: 'space-y-4',
  headRow: 'grid grid-cols-12 gap-3 sm:gap-4 px-3',
  headCell: 'flex items-center font-medium text-gray-600',
  bodyRow:
    'group grid grid-cols-12 gap-3 sm:gap-4 p-3 min-h-[74px] rounded bg-white shadow border border-gray-200 duration-150',
  bodyRowHover: 'hover:border-orange-400 hover:shadow-md',
  bodyCell: 'flex items-center',
  cellBolder: 'font-medium',
  skeletons:
    'space-y-4 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent',
  skeletonItem: 'bg-gray-200 min-h-[74px] rounded',
}

type DataTableProps = {
  className?: string
  isLoading?: boolean
  skeletons?: number
  rowClassName?: string
  skeletonClassName?: string
  data: any[]
  basePath: string
  structure: {
    title?: string
    className?: string
    isBold?: boolean
    selector: (i?: any) => ReactNode
  }[]
}

const DataTable = (props: DataTableProps) => {
  const {
    isLoading,
    className,
    skeletons,
    skeletonClassName,
    structure,
    data,
    basePath,
    rowClassName,
  } = props

  return (
    <div className={cn(css.wrapper, className)}>
      <div className={cn(css.headRow, rowClassName)}>
        {structure.map(({title, className}, i) => (
          <div className={cn(css.headCell, className)} key={i}>
            {title}
          </div>
        ))}
      </div>
      {isLoading ? (
        <div className={css.skeletons}>
          {fillArray(skeletons || 10, 0).map((_, i) => (
            <div className={cn(css.skeletonItem, skeletonClassName)} />
          ))}
        </div>
      ) : (
        <>
          {data.map((item, i) => (
            <Link key={item._id} href={`${basePath}/${item?._id}`}>
              <a className={cn(css.bodyRow, css.bodyRowHover, rowClassName)}>
                {structure.map(({selector, className, isBold}, i) => (
                  <div className={cn(css.bodyCell, className, isBold && css.cellBolder)} key={i}>
                    {selector(item)}
                  </div>
                ))}
              </a>
            </Link>
          ))}
        </>
      )}
    </div>
  )
}

export default DataTable
