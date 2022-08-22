const css = {
  form: 'max-w-xl relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent',
  fields: 'space-y-6',
  group: 'grid grid-cols-2 gap-4 sm:gap-6',
  field: 'h-16 sm:h-20 rounded bg-gray-200',
  description: 'h-56 rounded bg-gray-200',
  excerpt: 'h-32 rounded bg-gray-200',
  btn: 'mt-10 h-10 sm:h-12 w-24 sm:w-28 rounded bg-gray-300',
}

const EditProductLoader = () => {
  return (
    <div className={css.form}>
      <div className={css.fields}>
        <div className={css.field}></div>
        <div className={css.group}>
          <div className={css.field}></div>
          <div className={css.field}></div>
        </div>
        <div className={css.description}></div>
        <div className={css.excerpt}></div>
        <div className={css.group}>
          <div className={css.field}></div>
          <div className={css.field}></div>
        </div>
        <div className={css.field}></div>
      </div>
      <div className={css.btn}></div>
    </div>
  )
}

export default EditProductLoader
