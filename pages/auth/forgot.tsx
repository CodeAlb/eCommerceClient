import {GetStaticProps, NextPage} from 'next'
import ForgotPasswordForm from '../../components/forms/ForgotPasswordForm'
import Hero from '../../components/elements/Hero'

const css = {
  main: 'max-w-site mx-auto px-4 pb-12 sm:pb-16',
}

const ForgotPasswordPage: NextPage = () => {
  return (
    <div className={css.main}>
      <Hero title="Forgot Password" />
      <ForgotPasswordForm />
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

export default ForgotPasswordPage
