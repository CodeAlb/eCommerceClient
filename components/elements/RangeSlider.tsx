import {useCallback, useEffect, useState, useRef, ReactNode} from 'react'

interface RangeSliderMinMax {
  min: number
  max: number
}

interface RangeSliderProps {
  min: number
  max: number
  step?: number
  onChange: (minMax: [number, number]) => void
  children?: ReactNode
}

const css = {
  wrapper: 'mt-4 relative flex flex-col items-center justify-center w-full',
  action: 'mt-6 flex items-center justify-between w-full',
  priceRange: 'text-sm',
  slider: 'relative w-full',
  track: 'absolute rounded bg-gray-300 w-full z-[1] h-1',
  range: 'absolute rounded bg-black z-[2] h-1',
}

const RangeSlider = ({min, max, step = 1, onChange, children}: RangeSliderProps) => {
  const [values, setValues] = useState<RangeSliderMinMax>({min, max})
  const minValRef = useRef<number>(min)
  const maxValRef = useRef<number>(max)
  const range = useRef<HTMLDivElement>(null)

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  )

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(values.min)
    const maxPercent = getPercent(maxValRef.current)

    if (range.current) {
      range.current.style.left = `${minPercent}%`
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [values.min, getPercent])

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current)
    const maxPercent = getPercent(values.max)

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [values.max, getPercent])

  return (
    <div className={css.wrapper}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={values.min}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), values.max - 1)
          setValues({...values, min: value})
          onChange([value, values.max])
          minValRef.current = value
        }}
        className="thumb thumb--left"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={values.max}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), values.min + 1)
          setValues({...values, max: value})
          onChange([values.min, value])
          maxValRef.current = value
        }}
        className="thumb thumb--right"
      />

      <div className={css.slider}>
        <div className={css.track} />
        <div ref={range} className={css.range} />
      </div>
      <div className={css.action}>
        <div className={css.priceRange}>
          Price: ${values.min} — ${values.max}
        </div>
        {children}
      </div>
    </div>
  )
}

export default RangeSlider
