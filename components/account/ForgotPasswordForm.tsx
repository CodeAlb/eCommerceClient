import Link from 'next/link'
import {useRouter} from 'next/router'
import {useForm} from 'react-hook-form'
import {toast} from 'react-toastify'
import {useForgotPasswordMutation, useLogInMutation} from '../../store/api/authApiSlice'
import {DIR_PATHS} from '../../utils/constants'
import {cn} from '../../utils/helpers'
import Input from '../fields/Input'

interface IForgotPasswordCredentials {
  email: string
}

interface IForgotPasswordFormProps {
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
  ref: 'mt-12 sm:mt-16 text-center',
  refOr: 'pb-4 text-sm uppercase text-gray-400 font-medium',
  refLink: 'text-sm sm:text-base text-gray-500 hover:text-black hover:underline duration-150',
}

const ForgotPasswordForm = ({className}: IForgotPasswordFormProps) => {
  const {push} = useRouter()
  const [forgotPassword, {isLoading}] = useForgotPasswordMutation()
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<IForgotPasswordCredentials>()

  const sendCredentials = async (credentials: IForgotPasswordCredentials) => {
    if (isLoading) {
      return
    }

    try {
      const result = await forgotPassword(credentials).unwrap()
      setTimeout(() => {
        toast.success(result?.message)
      }, 50)
      push('/')
    } catch (err) {
      toast.error((err as any)?.data?.message)
    }
  }

  return (
    <form className={cn(css.form, className)} onSubmit={handleSubmit(sendCredentials)}>
      <div className={css.fields}>
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
            pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
          }}
          errors={errors}
        />
      </div>
      <div className={css.action}>
        <button
          type="submit"
          className={cn(css.submit, isLoading ? css.submitDisabled : css.submitNormal)}
        >
          Send Link
        </button>
      </div>
      <div className={css.ref}>
        <div className={css.refOr}>OR</div>
        <Link href={`${DIR_PATHS.account}/login`}>
          <a className={css.refLink}>Back To Login</a>
        </Link>
      </div>
    </form>
  )
}

export default ForgotPasswordForm
