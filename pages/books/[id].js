import React from 'react'
import style from '../../styles/Book.module.css'

function Book({bookData}) {
  const [name, setName] = React.useState("")
  const [comment, setComment] = React.useState("")

  const formatDate = (date) => {
    const dateObj = new Date(date)
    return dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
  }

  const submitComment = (e) => {
    e.preventDefault()
    console.log(e.target.comment.value)
  }

  const handleCommentChange = (e) => {
    setComment(e.target.value)
    console.log(e.target.value)
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
    console.log(e.target.value)
  }

  return (
   <>
    <div>
      <ul className={style.book__single}>
        <li>{bookData.id}</li>
        <li><h2>{bookData.title}</h2></li>
        <li><p>{bookData.authors}</p></li>
        <li><span>{formatDate(bookData.released)}</span></li>
        <li><small>{bookData.publisher}</small></li>
        <li>{bookData.number_of_pages}</li>
        <li>{bookData.isbn}</li>
      </ul>
    </div>
    <div>
        <h3 style={{ marginBottom: '10px' }}>Comments</h3>
        <dv className={style.book__comment__flex}>
          <div className={style.book__comment}>
            <span>Daniel</span>
            <p>we know this book</p>
          </div>
          <div className={style.book__comment}>
            <span>Daniel</span>
            <p>we know this book</p>
          </div>
        </dv>
    </div>

    <div>
      <h3 style={{ marginBottom: '10px' }}>Comment</h3>
      <div className={style.book__comment__form_wrapper}>
         <form className={style.book__comment__form} onSubmit={() => submitComment}>
        <div className={style.book__comment__input__wrapper}>
          <input 
            type="text" 
            value={name}
            onChange={handleNameChange} placeholder="Name" required/>
        </div>
        <div className={style.book__comment__input__wrapper}>
          <textarea 
            type="text" 
            value={comment}
            onChange={handleCommentChange} placeholder="comment" rows="10" cols="50" maxLength="500" required></textarea>
        </div>
        <div>
        <button className={style.book__comment__sumbit_btn}>Submit</button>
        </div>
      </form>
      </div>
     
    </div>
   </>
  )
}





// This function gets called at build time
export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await fetch('https://danielchisom.me/api/books')
    const books = await res.json()
    const booksData = books.Data;
  
    // Get the paths we want to pre-render based on book
    const paths = booksData.map((book) => ({
      params: { id: book.id.toString() },
    }))
  
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
  }

  // This also gets called at build time
export async function getStaticProps({ params }) {
  
    const res = await fetch(`https://danielchisom.me/api/books/${params.id}`)
    const book = await res.json()
    const bookData = book.Data;
  
    // Pass book data to the page via props
    return { props: { bookData } }
  }

export default Book