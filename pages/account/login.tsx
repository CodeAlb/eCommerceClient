import {GetStaticProps, NextPage} from 'next'
import LoginForm from '../../components/account/LoginForm'
import Hero from '../../components/ui/Hero'
import {NextSeo} from 'next-seo'

const css = {
  main: 'max-w-site mx-auto px-4 pb-12 sm:pb-16',
}

const LoginPage: NextPage = () => {
  return (
    <div className={css.main}>
      <NextSeo title="Login" />
      <Hero title="Login" />
      <LoginForm />
    </div>
  )
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      userRoles: ['guest'],
    },
  }
}

export default LoginPage
