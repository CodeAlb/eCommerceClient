import {Html, Head, Main, NextScript} from 'next/document'

const style = {
  html: 'light',
  body: '',
}

export default function Document() {
  return (
    <Html className={style.html} lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html:
              '!function(){try{var e=window,t=e.localStorage,a="theme",c=t[a],d="dark",m=document.documentElement.classList;c===d?m.add(d):a in t||!e.matchMedia("(prefers-color-scheme: dark)").matches?m.remove(d):(m.add(d),t.setItem(a,d))}catch{}}();',
          }}
        /> */}
      </Head>
      <body className={style.body}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
