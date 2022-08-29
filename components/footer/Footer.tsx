import Newsletter from './Newsletter'

type FooterProps = {}

const css = {
  wrapper: 'sticky top-[100vh]',
  copyright: 'max-w-inner mx-auto px-4 py-6 sm:py-8 text-center text-sm font-medium text-gray-600',
}

const Footer = ({}: FooterProps) => {
  const currentYear = new Date().getFullYear().toString()

  return (
    <>
      <footer className={css.wrapper}>
        <Newsletter />
        <p className={css.copyright}>(c) e-Shop {currentYear} / Developed by Jozi Bashaj</p>
      </footer>
    </>
  )
}

export default Footer
