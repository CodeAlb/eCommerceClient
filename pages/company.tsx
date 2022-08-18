import {NextPage} from 'next'
import {NextSeo} from 'next-seo'
import Hero from '../components/elements/Hero'

const CompanyPage: NextPage = () => {
  return (
    <div>
      <NextSeo title="Our Company" />
      <Hero title="Company" />
    </div>
  )
}

export default CompanyPage
