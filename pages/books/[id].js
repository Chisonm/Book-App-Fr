import React from 'react'
import style from '../../styles/Book.module.css'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Book({ bookData }) {
  const [name, setName] = React.useState("")
  const [comment, setComment] = React.useState("")
  const [commentList, setCommentList] = React.useState(bookData.comments)
  const [commentCount, setCommentCount] = React.useState(bookData.comment_count)
  
  const formatDate = (date) => {
    const dateObj = new Date(date)
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  const submitComment = (e) => {
    e.preventDefault();
    let newComment = {
      name: name,
      body: comment,
      book_id: bookData.id
    }
    fetch(`https://danielchisom.me/api/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newComment)
    })
      .then(res => res.json())
      .then((data) => toast.success(data.message))

    setCommentList([...commentList, newComment])
    setCommentCount(commentCount + 1)
    setName("")
    setComment("")
  }

  const handleCommentChange = (e) => {
    setComment(e.target.value)
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
  }


  return (
    <>
      <div>
         
        <ul className={style.book__single}>
          <li>{bookData.id}</li>
          <li>Title: <h2>{bookData.title}</h2></li>
          <li>Authors: <p>{bookData.authors}</p></li>
          <li>Release: <span>{formatDate(bookData.released)}</span></li>
          <li>Publisher: <small>{bookData.publisher}</small></li>
          <li>Pages: {bookData.number_of_pages}</li>
          <li>Isbn: {bookData.isbn}</li>
        </ul>
      </div>
      <div>
        <h3 style={{ marginBottom: '10px' }}>Comments ({commentCount})</h3>
        <div className={style.book__comment__flex}>
          {commentList.map((comment, index) => (
            <div key={index} className={style.book__comment}>
              <span className={style.book__comment_name}>{comment.name}</span>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>

      </div>

      <div>
        <h3 style={{ marginBottom: '10px' }}>Comment</h3>
        <div className={style.book__comment__form_wrapper}>
          <form className={style.book__comment__form} onSubmit={submitComment}>
            <div className={style.book__comment__input__wrapper}>
              <input
                type="text"
                value={name}
                onChange={handleNameChange} placeholder="Name" required />
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
      <ToastContainer />
    </>
  )
}





// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://danielchisom.me/api/books')
  const books = await res.json()
  const booksData = books.data;

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
  const bookData = book.data;

  // Pass book data to the page via props
  return { props: { bookData } }
}

export default Book