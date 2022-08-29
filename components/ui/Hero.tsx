interface HeroProps {
  title?: string
}

const css = {
  wrapper: 'py-12 sm:py-16',
  inner: 'max-w-site mx-auto px-4 text-center',
  title: 'text-3xl sm:text-4xl md:text-5xl font-medium uppercase',
}

const Hero = ({title}: HeroProps) => {
  return (
    <div className={css.wrapper}>
      <div className={css.inner}>
        <h1 className={css.title}>{title}</h1>
      </div>
    </div>
  )
}

export default Hero
