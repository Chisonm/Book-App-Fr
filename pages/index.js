import Head from 'next/head'
import React, { useContext } from 'react';
import {BooksContext} from '../store/booksContext';
import Books from '../components/Books/Books';
import style from '../styles/Book.module.css'

export default function Home() {

  const {books,loading} = useContext(BooksContext);

  return (
    <div className={style.page__container}>
      <Head>
        <title>Books App</title>
        <meta name="description" content="Books data from api" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={style.grid__card}>
        {
          loading ? (<p>loading</p>) : books.map(book => (
            <Books key={book.id} book={book} />
          ))
        }
      </div>
    </div>
  )
}
