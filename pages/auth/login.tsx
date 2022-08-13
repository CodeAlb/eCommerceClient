import {GetStaticProps, NextPage} from 'next'
import LoginForm from '../../components/forms/LoginForm'
import Hero from '../../components/elements/Hero'

const css = {
  main: 'max-w-site mx-auto px-4 pb-12 sm:pb-16',
}

const LoginPage: NextPage = () => {
  return (
    <div className={css.main}>
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
