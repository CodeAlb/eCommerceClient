import {Navigation, Thumbs, Pagination, Lazy} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import {IProduct} from '../../types/product'

interface ProductGalleryProps {
  product?: IProduct
  isLoading?: boolean
}

const css = {
  wrapper: 'max-w-2xl mx-auto',
  gallery:
    'shrink-0 [&_.swiper-button-prev]:text-black [&_.swiper-button-next]:text-black [&_.swiper-pagination-bullet-active]:bg-black',
  slide: 'pt-[100%] overflow-hidden relative',
  image: 'absolute inset-0 w-full h-full object-cover',
  wrapperThumb: 'mt-2',
  slideThumb: 'pt-[25%] overflow-hidden relative cursor-pointer',
  imageThumb: 'absolute inset-0 w-full h-full object-cover',
  imageThumbActive: 'opacity-100',
  imageThumbNormal: 'opacity-40 hover:opacity-100 duration-250',
}

const ProductGalleryLoading = () => (
  <div className={css.slide}>
    <div className="absolute inset-0 bg-gray-200 overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent" />
  </div>
)

const ProductGalleryEmpty = () => (
  <div className={css.slide}>
    <div className="absolute inset-0 bg-gray-200 overflow-hidden" />
  </div>
)

const ProductGallery = ({product, isLoading = false}: ProductGalleryProps) => {
  const {images} = product || {}
  if (isLoading) {
    return <ProductGalleryLoading />
  }
  if (!product || !images || images?.length === 0) {
    return <ProductGalleryEmpty />
  }

  return (
    <div className={css.wrapper}>
      <Swiper
        spaceBetween={10}
        navigation={true}
        grabCursor={true}
        preloadImages={false}
        pagination={true}
        lazy={true}
        thumbs={{}}
        modules={[Navigation, Thumbs, Pagination, Lazy]}
        className={css.gallery}
      >
        {images.map(({url}, i) => (
          <SwiperSlide className={css.slide} key={i}>
            <img src={url} className={css.image} alt="Product images" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ProductGallery
