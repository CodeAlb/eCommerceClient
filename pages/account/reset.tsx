import {GetStaticProps, NextPage} from 'next'
import ResetPasswordForm from '../../components/account/ResetPasswordForm'
import Hero from '../../components/ui/Hero'
import {NextSeo} from 'next-seo'

const css = {
  main: 'max-w-site mx-auto px-4 pb-12 sm:pb-16',
}

const ForgotPasswordPage: NextPage = () => {
  return (
    <div className={css.main}>
      <NextSeo title="Reset Password" />
      <Hero title="Reset Password" />
      <ResetPasswordForm />
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
