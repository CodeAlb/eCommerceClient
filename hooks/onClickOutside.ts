import {useEffect, useRef} from 'react'

type Handler = (event: MouseEvent) => void

const useOnClickOutside = (handler: Handler) => {
  const ref = useRef<any>()
  useEffect(() => {
    const handleClick = (event: any) => {
      const el = ref?.current
      if (!el || el.contains(event.target as Node)) {
        return
      }
      handler(event)
    }
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])
  return ref
}

export default useOnClickOutside
