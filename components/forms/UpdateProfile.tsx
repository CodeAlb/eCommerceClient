import Link from 'next/link'
import {useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {useUpdateLoggedUserMutation} from '../../store/api/baseApi'
import {getAuthState, updateUserData} from '../../store/slices/authReducer'
import {useDispatch, useSelector} from '../../store/store'
import {IUserLogin} from '../../types/user'
import {DIR_PATHS} from '../../utils/constants'
import {cn} from '../../utils/helpers'
import Input from '../fields/Input'

const css = {
  form: 'max-w-sm mx-auto',
  fields: 'space-y-6',
  action: 'mt-10 flex items-center justify-between',
  warning: 'mt-6 text-red-600',
  success: 'mt-6 text-green-600',
  submit:
    'rounded inline-flex items-center px-6 h-10 sm:px-8 sm:h-12 font-medium uppercase text-xs sm:text-sm tracking-wider duration-150',
  submitDisabled: 'bg-gray-300 text-white',
  submitNormal: 'bg-black text-white hover:bg-gray-900',
  resetLink: 'text-sm sm:text-base text-gray-500 hover:text-black hover:underline duration-150',
  ref: 'mt-12 sm:mt-16 text-center',
  refOr: 'pb-4 text-sm uppercase text-gray-400 font-medium',
  refLink: 'text-sm sm:text-base text-gray-500 hover:text-black hover:underline duration-150',
}

const UpdateProfileForm = () => {
  const {user} = useSelector(getAuthState)
  const dispatch = useDispatch()
  const {name = '', email = ''} = user || {}
  const [updateLoggedUser, {isLoading, isSuccess, isError, originalArgs}] =
    useUpdateLoggedUserMutation()

  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm({
    defaultValues: {email, name},
  })

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateUserData(originalArgs))
    }
  }, [isSuccess, dispatch, originalArgs])

  const sendFormData = (data: any) => {
    if (!isLoading) {
      updateLoggedUser(data)
    }
  }

  return (
    <form className={css.form} onSubmit={handleSubmit(sendFormData)}>
      <div className={css.fields}>
        <Input
          name="name"
          label="Full Name"
          placeholder="Your Full Name"
          register={register}
          watch={watch}
          hints={{
            required: 'Your name is required',
          }}
          options={{
            required: true,
          }}
          errors={errors}
        />
        <Input
          name="email"
          label="Email Address"
          placeholder="Your Email Address"
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
      </div>
      <div className={css.action}>
        <button
          type="submit"
          className={cn(css.submit, isLoading ? css.submitDisabled : css.submitNormal)}
        >
          Update
        </button>
        <Link href={`${DIR_PATHS.account}/password`}>
          <a className={css.resetLink}>Change password?</a>
        </Link>
      </div>
      {isError && <div className={css.warning}>Something went wrong!</div>}
      {isSuccess && <div className={css.success}>Your profile has been updated!</div>}
    </form>
  )
}

export default UpdateProfileForm
