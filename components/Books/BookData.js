import React from 'react'
import bookStyle from '../../styles/Book.module.css'
import Link from 'next/link'
import Books from './Books'
function BookData({ book }) {

    const formatDate = (date) => {
        const dateObj = new Date(date)
        return dateObj.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
      }
    return (
        <div className={bookStyle.book__card} key={book.id}>
            <Link href={`books/${book.id}`}> 
                <a>
                    <h2>{book.title}</h2>
                    <p>{book.authors}</p>
                    <small>{formatDate(book.released)}</small>
                </a>
            </Link>
          
        </div>
    )
}

export default BookData