import {MailIcon} from '@heroicons/react/outline'

const css = {
  wrapper: 'py-16 sm:py-20 md:py-24 lg:py-28 border-y border-gray-200',
  inner: 'max-w-2xl mx-auto px-4',
  title: 'text-xl sm:text-2xl md:text-3xl text-center',
  form: 'relative mt-6 sm:mt-8 md:mt-10 lg:mt-12 max-w-md mx-auto',
  input:
    'pl-3 sm:pl-4 pr-28 sm:pr-32 h-12 sm:h-14 sm:text-lg rounded-full border border-gray-200 shadow-[1px_1px_2px_#ddd] focus:shadow-[1px_3px_4px_#ccc] hover:shadow-[1px_2px_3px_#ddd] w-full',
  btn: 'absolute bg-black text-xs font-medium text-white px-3.5 sm:px-4 h-8 sm:h-10 rounded-full right-2 top-1/2 -translate-y-1/2 inline-flex items-center uppercase hover:bg-gray-900 duration-150',
  btnIcon: 'ml-2 w-4 -mr-1 sm:w-5',
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
          <input className={css.input} placeholder="Email Address" />
          <button className={css.btn}>
            Subscribe <MailIcon className={css.btnIcon} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Newsletter
