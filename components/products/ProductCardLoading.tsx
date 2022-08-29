const css = {
  wrapper: '',
  link: 'max-w-sm mx-auto relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent',
  media: 'bg-gray-200 pt-[100%] rounded',
  body: 'pt-5 space-y-1',
  ratings: 'h-6 rounded bg-gray-200 w-3/5',
  name: 'h-6 rounded bg-gray-200 w-full',
  price: 'h-6 rounded bg-gray-300 w-1/4',
}

export const ProductCardLoading = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.link}>
        <div className={css.media} />
        <div className={css.body}>
          <div className={css.ratings} />
          <div className={css.name} />
          <div className={css.price} />
        </div>
      </div>
    </div>
  )
}

export default ProductCardLoading
