import axios from 'axios'

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API,
})

export const axiosPrivate = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})
