import React, { useEffect, useState } from 'react';
import book from '@/assets/book.jpg';
import { Link, useLocation } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import { db } from '@/firebase/firebaseConfig.js';
import { collection, getDocs } from 'firebase/firestore';

export default function BookList() {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let search = params.get('search');

  let [books, setBooks] = useState([]);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState('');

  // let { data: books, loading, error } = useFetch(`http://localhost:3001/books${search ? `?q=${search}` : ''}`);

  let { isDark } = useTheme();

  useEffect(() => {
    setLoading(true);
    let ref = collection(db, 'books');
    getDocs(ref).then((docs) => {
      if (docs.empty) {
        setError('No Documents Found');
        setLoading(false);
      }
      let books = [];
      docs.forEach((doc) => {
        let book = { id: doc.id, ...doc.data() };
        books.push(book);
      });
      setBooks(books);
      setLoading(false);
      setError('');
    });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div>
      {loading && <p>Loading ... </p>}
      {!!books && (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 my-3'>
          {books.map((b) => (
            <Link to={`/books/${b.id}`} key={b.id}>
              <div className={`${isDark ? 'text-white bg-dcard' : ''} border border-1 p-4 min-h-[540px]`}>
                <img src={book} alt='' />
                <div className='text-center space-y-2 mt-3'>
                  <h1>{b.title}</h1>
                  <p>{b.description}</p>
                  <div className='flex flex-wrap'>
                    {b.categories.map((c) => (
                      <span className='mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-blue-500' key={c}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {books && !books.length && <p className='text-center text-xl text-gray-500'>No Search Results Found</p>}
    </div>
  );
}
