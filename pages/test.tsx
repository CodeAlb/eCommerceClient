import React from 'react'
import {useGetAllProductsQuery} from '../store/api/baseApi'

const Test = () => {
  const {data, error, isLoading} = useGetAllProductsQuery({})
  console.log(data, error, isLoading)
  return <div>test</div>
}

export default Test
