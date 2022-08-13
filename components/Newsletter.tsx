import {ArrowNarrowRightIcon} from './Svg'

const css = {
  wrapper: 'py-16 sm:py-20 md:py-24 lg:py-28 border-y border-gray-200',
  inner: 'max-w-2xl mx-auto px-4',
  title: 'text-xl sm:text-2xl md:text-3xl text-center',
  form: 'relative mt-6 sm:mt-8 md:mt-10 lg:mt-12 max-w-md mx-auto',
  input: 'pl-2 sm:pl-4 pr-24 sm:pr-32 h-10 sm:h-12 sm:text-lg border border-black w-full',
  btn: 'absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-xs sm:text-sm font-medium inline-flex items-center uppercase hover:opacity-75 duration-150',
  btnIcon: 'w-5 sm:w-6 ml-1',
}

const Newsletter = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.inner}>
        <h2 className={css.title}>
          Subscribe to our newsletter and receive the latest product news, stories, invitations to
          exclusive design events and much, much more.
        </h2>
        <div className={css.form}>
          <input className={css.input} placeholder="Enter Email Address" />
          <button className={css.btn}>
            Subscribe <ArrowNarrowRightIcon className={css.btnIcon} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Newsletter
