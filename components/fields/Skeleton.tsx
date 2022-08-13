import {cn} from '../../utils/helpers'

const css = {
  shimmer:
    'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent',
  field: '',
  label: 'mt-2 mb-2.5 h-4 w-1/4 bg-gray-200',
  input: 'w-full h-10 sm:h-12 bg-gray-300',
  action: '',
  submit: 'w-24 sm:w-28 h-10 sm:h-12 rounded bg-gray-300',
  resetLink: 'h-4 w-32 bg-gray-200',
}

export const SkeletonInput = () => (
  <div className={cn(css.field, css.shimmer)}>
    <div className={css.label} />
    <div className={css.input} />
  </div>
)

export const SkeletonAction = ({hasResetLink = false}: {hasResetLink?: boolean}) => (
  <>
    <div className={cn(css.submit, css.shimmer)} />
    {hasResetLink && <div className={cn(css.resetLink, css.shimmer)} />}
  </>
)
