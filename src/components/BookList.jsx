import React from 'react';
import book from '@/assets/book.jpg';
import trash from '@/assets/trash.svg';
import pencil from '@/assets/pencil.svg';
import { Link } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import useFirestore from '../hooks/useFirestore';

export default function BookList() {
  // let location = useLocation();
  // let params = new URLSearchParams(location.search);
  // let search = params.get('search');

  // let { data: books, loading, error } = useFetch(`http://localhost:3001/books${search ? `?q=${search}` : ''}`);
  let { getCollection, deleteDocument } = useFirestore();

  let { isDark } = useTheme();

  let deleteBook = async (e, id) => {
    e.preventDefault();
    await deleteDocument('books', id);
  };

  let { data: books, loading, error } = getCollection('books');

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
                  <div className='flex flex-wrap justify-between items-center'>
                    <div>
                      {b.categories.map((c) => (
                        <span className='mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-blue-500' key={c}>
                          {c}
                        </span>
                      ))}
                    </div>
                    <div className='flex space-x-2 items-center'>
                      <Link to={`/edit/${b.id}`}>
                        <img src={pencil} alt='' />
                      </Link>
                      <img src={trash} alt='' onClick={(e) => deleteBook(e, b.id)} />
                    </div>
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
