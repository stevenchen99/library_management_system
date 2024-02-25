import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useTheme from '../hooks/useTheme';

import useFirestore from '../hooks/useFirestore';

export default function BookDetails() {
  let { id } = useParams();
  let { getDocument } = useFirestore();
  let { data: book, loading, error } = getDocument('books', id);

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
        <div className={`${isDark ? 'text-white' : ''} grid grid-cols-2`}>
          <div className='image-container h-80 flex items-center justify-center'>
            <img className='max-w-full max-h-full object-contain' src={book.cover} alt='' />
          </div>
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
