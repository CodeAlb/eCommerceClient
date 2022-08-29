import Link from 'next/link'
import {useForm} from 'react-hook-form'
import {toast} from 'react-toastify'
import {useLogInMutation} from '../../store/api/authApiSlice'
import {setAccessToken, setUser} from '../../store/slices/authSlice'
import {useDispatch} from '../../store/store'
import {DIR_PATHS} from '../../utils/constants'
import {cn} from '../../utils/helpers'
import Input, {PasswordInput} from '../fields/Input'

interface ILoginCredentials {
  username: string
  password: string
}

interface ILoginFormProps {
  className?: string
}

const css = {
  form: 'max-w-sm mx-auto',
  fields: 'space-y-6',
  action: 'mt-10 flex items-center justify-between',
  submit:
    'rounded inline-flex items-center px-6 h-10 sm:px-8 sm:h-12 font-medium uppercase text-xs sm:text-sm tracking-wider duration-150',
  submitDisabled: 'bg-gray-300 text-white',
  submitNormal: 'bg-black text-white hover:bg-gray-900',
  resetLink: 'text-sm sm:text-base text-gray-500 hover:text-black hover:underline duration-150',
  ref: 'mt-12 sm:mt-16 text-center',
  refOr: 'pb-4 text-sm uppercase text-gray-400 font-medium',
  refLink: 'text-sm sm:text-base text-gray-500 hover:text-black hover:underline duration-150',
}

const LoginForm = ({className}: ILoginFormProps) => {
  const dispatch = useDispatch()
  const [logIn, {isLoading}] = useLogInMutation()
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<ILoginCredentials>()

  const sendCredentials = async (credentials: ILoginCredentials) => {
    if (isLoading) {
      return
    }

    try {
      const result = await logIn(credentials).unwrap()
      dispatch(setUser(result?.user))
      dispatch(setAccessToken(result?.accessToken))
    } catch (err: any) {
      toast.error(err?.data?.message)
    }
  }

  return (
    <form className={cn(css.form, className)} onSubmit={handleSubmit(sendCredentials)}>
      <div className={css.fields}>
        <Input
          name="username"
          label="Username"
          placeholder="Enter Username"
          register={register}
          watch={watch}
          hints={{
            required: 'Username is required',
          }}
          options={{
            required: true,
          }}
          errors={errors}
        />
        <PasswordInput
          name="password"
          label="Password"
          placeholder="Enter Password"
          register={register}
          watch={watch}
          hints={{
            minLength: 'Password is too short',
            required: 'Password is required',
          }}
          options={{
            minLength: 6,
            required: true,
          }}
          errors={errors}
        />
      </div>
      <div className={css.action}>
        <button
          type="submit"
          className={cn(css.submit, isLoading ? css.submitDisabled : css.submitNormal)}
        >
          Login
        </button>
        <Link href={`${DIR_PATHS.account}/forgot`}>
          <a className={css.resetLink}>Forgot password?</a>
        </Link>
      </div>
      <div className={css.ref}>
        <div className={css.refOr}>OR</div>
        <Link href={`${DIR_PATHS.account}/register`}>
          <a className={css.refLink}>Create New Account</a>
        </Link>
      </div>
    </form>
  )
}

export default LoginForm
