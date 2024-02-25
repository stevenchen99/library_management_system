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
        <>
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
          <div>
            <h3 className='font-bold text-xl text-primary my-3 text-center'>My Notes</h3>
            <textarea className='p-3 shadow-md border-2 bg-gray-50 w-full' name='' id='' cols='30' rows='5'></textarea>
            <button className='text-white text-sm bg-primary px-3 py-2 rounded-lg flex items-center gap-1 my-3'>
              <span className='hidden md:block'>Add Note</span>
            </button>
            <div className='border-2 shadow-md p-3 my-3'>
              <div className='flex space-x-3'>
                <img className='w-12 h-12 rounded-full' src='https://atomichub-ipfs.com/ipfs/QmS3rH1LYZJvdWWQRcdfEZpEfdDbZANhpv4qhTgoedYghu' alt='' />
                <div>
                  <h3>Steven</h3>
                  <div className='text-gray-400'>25.02.2024</div>
                </div>
              </div>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt vitae cum reiciendis sequi architecto nostrum tenetur, doloribus libero
                voluptates magni natus sint, officiis nam. Consequatur asperiores excepturi deleniti vero reprehenderit?
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
