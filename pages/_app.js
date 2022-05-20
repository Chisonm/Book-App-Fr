import '../styles/globals.css'
import {ContextProvider} from '../store/booksContext'
import Layout from '../components/layouts/Layout'
import { BooksContext, BooksContextProvider } from '../store/booksContext';

function MyApp({ Component, pageProps }) {

  return (
    <BooksContextProvider>
      <Layout>
          <Component {...pageProps} />
      </Layout>
    </BooksContextProvider>
  )
}

export default MyApp
