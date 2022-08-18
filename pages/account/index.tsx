import {GetStaticProps, NextPage} from 'next'
import UpdateProfileForm from '../../components/forms/UpdateProfile'
import Booting from '../../components/elements/Booting'
import Hero from '../../components/elements/Hero'
import {getAuthState} from '../../store/slices/authReducer'
import {useSelector} from '../../store/store'
import {NextSeo} from 'next-seo'

const css = {
  main: 'max-w-site mx-auto px-4 pb-12 sm:pb-16',
}

const AccountPage: NextPage = () => {
  const {booted} = useSelector(getAuthState)

  return (
    <div className={css.main}>
      <NextSeo title="My Account" />
      <Hero title="My Account" />
      {booted ? <UpdateProfileForm /> : <Booting />}
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
