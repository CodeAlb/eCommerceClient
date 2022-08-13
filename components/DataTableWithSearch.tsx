import React, {useState} from 'react'
import DT from 'react-data-table-component'
import SearchForm from './elements/SearchForm'

const css = {
  searchForm: 'mb-5 sm:mb-6 md:mb-7',
}

const DataTableWithSearch = ({
  data,
  columns,
  searchPattern,
  placeholder = 'Search...',
  ...props
}: any) => {
  const [filter, setFilter] = useState({
    text: '',
    pagination: false,
  })

  const filteredData = (data || []).filter((item: any) =>
    searchPattern(item).toLowerCase().includes(filter.text.toLowerCase())
  )

  const filterOrders = (value: string) => {
    setFilter(({pagination}: any) => ({
      pagination: !pagination,
      text: value,
    }))
  }

  return (
    <>
      <SearchForm
        className={css.searchForm}
        placeholder={placeholder}
        onSubmitValue={filterOrders}
      />
      <DT
        columns={columns}
        data={filteredData}
        noHeader
        defaultSortAsc={false}
        pagination
        responsive
        {...props}
      />
    </>
  )
}

export default DataTableWithSearch
