import Link from 'next/link'
import {useRouter} from 'next/router'
import {useForm} from 'react-hook-form'
import {toast} from 'react-toastify'
import {useResetPasswordMutation} from '../../store/api/authApiSlice'
import {setAccessToken, setUser} from '../../store/slices/authSlice'
import {useDispatch} from '../../store/store'
import {DIR_PATHS} from '../../utils/constants'
import {cn} from '../../utils/helpers'
import {PasswordInput} from '../fields/Input'

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

const ResetPasswordForm = () => {
  const {query} = useRouter()
  const [resetPassword, {isLoading}] = useResetPasswordMutation()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm()

  const sendUpdatedPassword = async (credentials: any) => {
    if (isLoading) {
      return
    }

    try {
      const resetToken = query?.token
      const result = await resetPassword({resetToken, credentials}).unwrap()

      dispatch(setUser(result?.user))
      dispatch(setAccessToken(result?.accessToken))
      toast.info('Wohoo! Welcome back')
    } catch (err: any) {
      toast.error(err?.data?.message)
    }
  }

  return (
    <form className={css.form} onSubmit={handleSubmit(sendUpdatedPassword)}>
      <div className={css.fields}>
        <PasswordInput
          name="password"
          label="New Password"
          placeholder="Your new password"
          register={register}
          watch={watch}
          hints={{
            minLength: 'Password is too short',
            required: 'New password is required',
          }}
          options={{
            minLength: 6,
            required: true,
          }}
          errors={errors}
        />
        <PasswordInput
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Your new password"
          register={register}
          watch={watch}
          hints={{
            validate: 'Passwords does not match',
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
          type="submit"
          className={cn(css.submit, isLoading ? css.submitDisabled : css.submitNormal)}
        >
          Update
        </button>
        <Link href={DIR_PATHS.account}>
          <a className={css.resetLink}>Change profile?</a>
        </Link>
      </div>
    </form>
  )
}

export default ResetPasswordForm
