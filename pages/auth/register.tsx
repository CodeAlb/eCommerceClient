import {GetStaticProps, NextPage} from 'next'
import RegisterForm from '../../components/forms/RegisterForm'
import Hero from '../../components/elements/Hero'

const css = {
  main: 'max-w-site mx-auto px-4 pb-12 sm:pb-16',
}

const RegisterPage: NextPage = () => {
  return (
    <div className={css.main}>
      <Hero title="Register" />
      <RegisterForm />
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

export default RegisterPage
