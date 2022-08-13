import {GetStaticProps, NextPage} from 'next'
import ChangePasswordForm from '../../components/forms/ChangePasswordForm'
import Booting from '../../components/elements/Booting'
import Hero from '../../components/elements/Hero'
import {getAuthState} from '../../store/slices/authReducer'
import {useSelector} from '../../store/store'

const css = {
  main: 'max-w-site mx-auto px-4 pb-12 sm:pb-16',
}

const PasswordPage: NextPage = () => {
  const {booted} = useSelector(getAuthState)

  return (
    <div className={css.main}>
      <Hero title="Change Password" />
      {booted ? <ChangePasswordForm /> : <Booting />}
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
