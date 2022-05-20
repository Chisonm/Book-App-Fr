import React, { createContext, useState, useEffect } from "react";

// create context
const BooksContext = createContext();

const BooksContextProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // fetch a books 
  useEffect(() => {
    const fetchBooks = () => {
        setLoading(true);
        setError(false);
        fetch('https://danielchisom.me/api/books')
          .then(res => res.json())
          .then(data => {
            setBooks(data.data);
            setLoading(false);
          })
          .catch(() => {
            setError(true);
            setLoading(false);
          });
    };
         fetchBooks();
  }, []);

  return (
    <BooksContext.Provider value={{ books, loading, error}}>
      {children}
    </BooksContext.Provider>
  );
};

export { BooksContext, BooksContextProvider };  