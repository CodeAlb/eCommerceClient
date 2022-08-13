import Link from 'next/link'
import {ArrowNarrowRightIcon} from '../Svg'

interface MainHeroProps {}

const css = {
  wrapper: 'max-w-site mx-auto px-4',
  inner: 'relative rounded-xl overflow-hidden pt-[40%] md:pt-0 md:h-80 lg:h-96',
  image: 'absolute inset-0 w-full h-full object-cover',
  overlay: 'absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black opacity-60',
  body: ' relative px-4 py-8 flex flex-col justify-end sm:w-2/3 md:absolute md:left-0 md:top-0 md:p-14 md:h-full',
  title: 'text-3xl sm:text-4xl lg:text-5xl font-bold text-white',
  action: 'mt-6 sm:mt-8',
  link: 'rounded inline-flex group items-center justify-center bg-white/5 border-2 border-white px-4 h-10 sm:px-6 sm:h-12 text-white font-medium uppercase text-xs sm:text-sm tracking-wider hover:bg-white hover:text-black duration-150',
  icon: 'w-5 ml-2 -mr-1 group-hover:ml-4 duration-150',
}

const MainHero = ({}: MainHeroProps) => {
  const imageUrl =
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80'

  return (
    <div className={css.wrapper}>
      <div className={css.inner}>
        <img src={imageUrl} alt="Banner" className={css.image} />
        <div className={css.overlay} />
        <div className={css.body}>
          <h1 className={css.title}>Furnishing your home with experienced style</h1>
          <div className={css.action}>
            <Link href="/shop">
              <a className={css.link}>
                Our Shop <ArrowNarrowRightIcon className={css.icon} />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainHero
