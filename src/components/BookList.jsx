import React from 'react';
import book from '@/assets/book.jpg';
import useFetch from '@/hooks/useFetch';

export default function BookList() {
  let { data: books, loading, error } = useFetch('http://localhost:3001/books');

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div>
      {loading && <p>Loading ... </p>}
      {!!books && (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 my-3'>
          {books.map((b) => (
            <div className='border border-1 p-4' key={b.id}>
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
          ))}
        </div>
      )}
    </div>
  );
}
