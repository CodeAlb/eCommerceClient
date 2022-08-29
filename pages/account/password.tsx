import {GetStaticProps, NextPage} from 'next'
import ChangePasswordForm from '../../components/account/ChangePasswordForm'
import Hero from '../../components/ui/Hero'
import {NextSeo} from 'next-seo'

const css = {
  main: 'max-w-site mx-auto px-4 pb-12 sm:pb-16',
}

const PasswordPage: NextPage = () => {
  return (
    <div className={css.main}>
      <NextSeo title="Change Password" />
      <Hero title="Change Password" />
      <ChangePasswordForm />
    </div>
  )
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      withAuth: true,
    },
  }
}

export default PasswordPage
