import {LocationMarkerIcon, MailIcon, PhoneIcon} from '@heroicons/react/outline'
import {NextPage} from 'next'
import {NextSeo} from 'next-seo'
import Hero from '../components/elements/Hero'
import Input from '../components/fields/Input'
import Textarea from '../components/fields/Textarea'

const css = {
  main: 'pb-12 sm:pb-16 max-w-site px-4 mx-auto',
  grid: 'grid md:grid-cols-2',
  info: 'md:py-6 lg:py-8',
  infoBox: 'bg-gray-100 text-black p-6 sm:p-8 md:p-10 lg:p-14 h-full',
  form: 'border border-gray-200 p-6 sm:p-8 md:p-10 lg:p-14 shadow-2xl shadow-gray-300',
  sectionTitle: 'text-xl sm:text-2xl md:text-3xl uppercase font-medium mb-4 sm:mb-6',
  infoSummary: 'mb-6 sm:mb-8 text-gray-600 italic',
  meta: 'space-y-6',
  metaItem: 'flex items-start space-x-4',
  metaIcon: 'mt-1 w-6 text-gray-400',
  metaValue: 'font-medium',
  fields: 'space-y-6',
  action: 'mt-6 flex items-center justify-between',
  submit:
    'rounded inline-flex items-center px-6 h-10 sm:px-8 sm:h-12 font-medium uppercase text-xs sm:text-sm tracking-wider duration-150 bg-black text-white hover:bg-gray-900',
}

const ContactPage: NextPage = () => {
  return (
    <div>
      <NextSeo title="Get in Touch" />
      <Hero title="Contact" />
      <div className={css.main}>
        <div className={css.grid}>
          <div className={css.info}>
            <div className={css.infoBox}>
              <h3 className={css.sectionTitle}>Information</h3>
              <p className={css.infoSummary}>
                Feel free to drop us a line via this contact form, or visit our headquarter. The NDA
                Sport team is always looking for feedbacks and comments from you to improve our
                service quality. Our working hours is from 9:00AM to 5:00PM from Monday to Friday
                (except holidays and weekends).
              </p>
              <div className={css.meta}>
                <div className={css.metaItem}>
                  <LocationMarkerIcon className={css.metaIcon} />
                  <div className={css.metaValue}>
                    South Forest School
                    <br />
                    New Zeeland
                  </div>
                </div>
                <div className={css.metaItem}>
                  <PhoneIcon className={css.metaIcon} />
                  <div className={css.metaValue}>
                    +84 0123 456 789
                    <br />
                    +84 0987 654 321
                  </div>
                </div>
                <div className={css.metaItem}>
                  <MailIcon className={css.metaIcon} />
                  <div className={css.metaValue}>
                    support@example.com
                    <br />
                    sales@example.com
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={css.form}>
            <h3 className={css.sectionTitle}>Send a message</h3>
            <div className={css.fields}>
              <Input
                name="name"
                label="Full Name"
                placeholder="John Doe"
                register={() => {}}
                watch={() => {}}
              />
              <Input
                name="subject"
                label="Subject"
                placeholder="Business partnership"
                register={() => {}}
                watch={() => {}}
              />
              <Textarea
                name="message"
                label="Message"
                placeholder="I would like to..."
                register={() => {}}
                watch={() => {}}
              />
            </div>
            <div className={css.action}>
              <button type="submit" className={css.submit}>
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
