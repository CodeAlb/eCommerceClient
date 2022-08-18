import {NextPage} from 'next'
import {NextSeo} from 'next-seo'
import Hero from '../components/elements/Hero'

const ContactPage: NextPage = () => {
  return (
    <div>
      <NextSeo title="Get in Touch" />
      <Hero title="Contact" />
    </div>
  )
}

export default ContactPage
