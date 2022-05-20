import React from 'react'
import bookStyle from '../../styles/Book.module.css'
import BookData from './BookData'
function Books({ book }) {
    return (
        <>
            <BookData book={book} />
        </>
    )
}

export default Books