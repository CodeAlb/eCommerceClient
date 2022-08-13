interface ProductDescriptionProps {
  description?: string
}

const css = {
  wrapper: 'max-w-2xl mx-auto mt-12 sm:mt-16',
  title: 'text-xl sm:text-2xl md:text-3xl text-black',
  body: 'mt-2 sm:mt-3 text-gray-500',
}

const ProductDescription = ({description = ''}: ProductDescriptionProps) => {
  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Description</h2>
      <div className={css.body}>{description}</div>
    </div>
  )
}

export default ProductDescription
