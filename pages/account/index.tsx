import {GetStaticProps, NextPage} from 'next'
import UpdateProfileForm from '../../components/account/UpdateProfileForm'
import Hero from '../../components/ui/Hero'
import {NextSeo} from 'next-seo'

const css = {
  main: 'max-w-site mx-auto px-4 pb-12 sm:pb-16',
}

const AccountPage: NextPage = () => {
  return (
    <div className={css.main}>
      <NextSeo title="My Account" />
      <Hero title="My Account" />
      <UpdateProfileForm />
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

export default AccountPage
