import React from 'react'
import bookStyle from '../../styles/Book.module.css'
import Link from 'next/link'
function BookData({ book }) {
    return (
        <div className={bookStyle.book__card} key={book.id}>
            <Link href={`books/${book.id}`}> 
                <a>
                    <h2>{book.title}</h2>
                    <p>Find in-depth information about Next.js features and API.</p>
                </a>
            </Link>
          
        </div>
    )
}

export default BookData