import Image from 'next/future/image'
import {cn} from '../../utils/helpers'

const css = {
  wrapper: 'grid gap-8 md:grid-cols-2 md:gap-16 md:items-center lg:gap-20',
  subtitle: 'text-sm uppercase font-medium mb-1 sm:mb-2 tracking-widest text-gray-500',
  title: 'text-2xl sm:text-3xl md:text-4xl font-medium',
  body: '',
  mediaReversed: 'md:order-2',
  content: 'mt-6 sm:mt-8',
  media: 'relative pb-[60%] md:pb-[90%] overflow-hidden',
  image: 'absolute inset-0 w-full h-full object-cover rounded-md',
}

interface AboutSectionProps {
  title: string
  subtitle?: string
  image?: string
  content: string
  isReversed?: boolean
}

const AboutSection = ({title, subtitle, image, content, isReversed}: AboutSectionProps) => {
  return (
    <div className={css.wrapper}>
      <div className={cn(css.media, isReversed && css.mediaReversed)}>
        {image && <Image src={image} alt={title} className={css.image} width={650} height={550} />}
      </div>
      <div className={css.body}>
        {subtitle && <p className={css.subtitle}>{subtitle}</p>}
        <h3 className={css.title}>{title}</h3>
        <div className={css.content} dangerouslySetInnerHTML={{__html: content}} />
      </div>
    </div>
  )
}

export default AboutSection
