import Document, { Html, Head, Main, NextScript } from 'next/document'
import { PageContainer, PageContainerItem, Header, Footer } from '../src/components'

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <PageContainer>
            <PageContainerItem>
              <Header />
            </PageContainerItem>
            <PageContainerItem ariaRole='main' fillHeight>
              <Main />
              <NextScript />
            </PageContainerItem>
            <PageContainerItem>
              <Footer />
            </PageContainerItem>
          </PageContainer>
        </body>
      </Html>
    )
  }
}

export default MyDocument
