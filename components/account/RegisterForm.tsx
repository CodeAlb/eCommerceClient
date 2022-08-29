import Link from 'next/link'
import {useForm} from 'react-hook-form'
import {toast} from 'react-toastify'
import {useRegisterMutation} from '../../store/api/authApiSlice'
import {setUser, setAccessToken} from '../../store/slices/authSlice'
import {useDispatch} from '../../store/store'
import {cn} from '../../utils/helpers'
import Input, {PasswordInput} from '../fields/Input'

interface IRegisterCredentials {
  username: string
  name: string
  email: string
  password: string
}

interface IRegisterFormProps {
  className?: string
}

const css = {
  form: 'max-w-sm mx-auto',
  fields: 'space-y-6',
  action: 'mt-10',
  warning: 'mt-6 text-red-600',
  submit:
    'rounded inline-flex items-center px-6 h-10 sm:px-8 sm:h-12 font-medium uppercase text-xs sm:text-sm tracking-wider duration-150',
  submitDisabled: 'bg-gray-300 text-white',
  submitNormal: 'bg-black text-white hover:bg-gray-900',
  ref: 'mt-12 sm:mt-16 text-center',
  refOr: 'pb-4 text-sm uppercase text-gray-400 font-medium',
  refLink: 'text-sm sm:text-base text-gray-500 hover:text-black hover:underline duration-150',
}

const RegisterForm = ({className}: IRegisterFormProps) => {
  const dispatch = useDispatch()
  const [registerUser, {isLoading}] = useRegisterMutation()
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<IRegisterCredentials>()

  const sendCredentials = async (credentials: IRegisterCredentials) => {
    if (isLoading) {
      return
    }

    try {
      const result = await registerUser(credentials).unwrap()
      dispatch(setUser(result?.user))
      dispatch(setAccessToken(result?.accessToken))
      toast.info('You have been registered')
    } catch (err) {
      toast.error((err as any)?.data?.message)
    }
  }

  return (
    <form className={cn(css.form, className)} onSubmit={handleSubmit(sendCredentials)}>
      <div className={css.fields}>
        <Input
          name="username"
          label="Username"
          placeholder="johndoe"
          register={register}
          watch={watch}
          hints={{
            required: 'Username is required',
            minLength: 'Username is too short',
            maxLength: 'Username is too long',
          }}
          options={{
            minLength: 3,
            maxLength: 15,
            required: true,
          }}
          errors={errors}
        />
        <Input
          name="name"
          label="Name"
          placeholder="Full Name"
          register={register}
          watch={watch}
          hints={{
            required: 'Name is required',
            minLength: 'Name is too short',
            maxLength: 'Name is too long',
          }}
          options={{
            minLength: 3,
            maxLength: 30,
            required: true,
          }}
          errors={errors}
        />
        <Input
          name="email"
          label="Email"
          placeholder="Email Address"
          register={register}
          watch={watch}
          hints={{
            required: 'Email is required',
            pattern: 'Email is invalid',
          }}
          options={{
            required: true,
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
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
        <PasswordInput
          name="passwordConfirm"
          label="Comfirm Password"
          placeholder="Confirm password"
          register={register}
          watch={watch}
          hints={{
            validate: 'Password did not match',
          }}
          options={{
            validate: (value: any) => {
              const password = watch('password')
              return value === password
            },
          }}
          errors={errors}
        />
      </div>
      <div className={css.action}>
        <button
          type={isLoading ? 'button' : 'submit'}
          className={cn(css.submit, isLoading ? css.submitDisabled : css.submitNormal)}
        >
          Register
        </button>
      </div>
      <div className={css.ref}>
        <div className={css.refOr}>OR</div>
        <Link href="/auth/login">
          <a className={css.refLink}>Already Have An Account</a>
        </Link>
      </div>
    </form>
  )
}

export default RegisterForm
