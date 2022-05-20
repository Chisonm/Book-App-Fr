import { createContext, useContext, useState, useEffect  } from 'react';

const booksContext = createContext();

export function ContextProvider({ children }) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
  
    useEffect(() => {
      setLoading(true);
      setError(false);
      fetch('https://danielchisom.me/api/books')
        .then(res => res.json())
        .then(data => {
          setBooks(data.Data);
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    }, []);

    return (
        <booksContext.Provider value={{ books, loading, error }}>
            {children}
        </booksContext.Provider>
    );
}

const useContextWrapper = () => {
    return useContext(booksContext);
};

export default useContextWrapper;   
