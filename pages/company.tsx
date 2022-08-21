import {NextPage} from 'next'
import {NextSeo} from 'next-seo'
import AboutSection from '../components/elements/AboutSection'
import Hero from '../components/elements/Hero'

const css = {
  main: 'max-w-site px-4 mx-auto pb-12 sm:pb-16 space-y-16',
}

const CompanyPage: NextPage = () => {
  return (
    <div>
      <NextSeo title="Our Company" />
      <Hero title="Company" />
      <div className={css.main}>
        <AboutSection
          subtitle="Our story"
          title="This is where you tell the story of your brand"
          content="This is where you tell the story of your brand. Iconic brands such as Disney and Coca-Cola have long realized the power of their brand story to build a connection with their audience. Companies like Apple possess brand stories that are legendary in their status.<br/><br/>What’s in a story, though? How does the story develop authenticity? More to the point, how does such a story create that trusting feeling that customers crave?"
          image="https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=850&q=80"
        />
        <AboutSection
          subtitle="Brand vision"
          title="Safe & Environment friendly"
          content="This is where you tell the story of your brand. Iconic brands such as Disney and Coca-Cola have long realized the power of their brand story to build a connection with their audience. Companies like Apple possess brand stories that are legendary in their status.<br/><br/>What’s in a story, though? How does the story develop authenticity? More to the point, how does such a story create that trusting feeling that customers crave?"
          image="https://images.unsplash.com/photo-1616048056617-93b94a339009?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=850&q=80"
          isReversed
        />
        <AboutSection
          subtitle="Meet the team"
          title="“Any quotes? Spend some time thinking and make it memorable”"
          content="This is where you tell the story of your brand. Iconic brands such as Disney and Coca-Cola have long realized the power of their brand story to build a connection with their audience. Companies like Apple possess brand stories that are legendary in their status.<br/><br/>What’s in a story, though? How does the story develop authenticity? More to the point, how does such a story create that trusting feeling that customers crave?"
          image="https://images.unsplash.com/photo-1572021335469-31706a17aaef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=850&q=80"
        />
      </div>
    </div>
  )
}

export default CompanyPage
