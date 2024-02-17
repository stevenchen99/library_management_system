import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import bookImage from '@/assets/book.jpg';
import useTheme from '../hooks/useTheme';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';

export default function BookDetails() {
  let { id } = useParams();

  let [book, setBook] = useState(null);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    let ref = doc(db, 'books', id);
    getDoc(ref).then((doc) => {
      if (doc.exists()) {
        let book = { id: doc.id, ...doc.data() };
        setBook(book);
        setLoading(false);
        setError('');
      } else {
        setError('No Document Found');
        setLoading(false);
      }
    });
  }, [id]);

  let navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        navigate('/');
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [error, navigate]);

  let { isDark } = useTheme();

  return (
    <>
      {error && (
        <div>
          <h4>{error}</h4>
          <p>Redirecting to Home page...</p>
        </div>
      )}
      {loading && <div>loading...</div>}
      {book && (
        <div className={`${isDark ? 'text-white' : ''} grid grid-cols-2 h-screen`}>
          <img src={bookImage} alt='' />
          <div className='space-y-4'>
            <h1 className='text-2xl font-bold'>{book.title}</h1>
            <div className='space-x-3'>
              {book.categories.map((category) => (
                <span className='text-white bg-blue-500 rounded-full text-sm px-2 py-1' key={category}>
                  {category}
                </span>
              ))}
            </div>
            <p>{book.description}</p>
          </div>
        </div>
      )}
    </>
  );
}
