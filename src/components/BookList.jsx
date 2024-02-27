import React, { useContext } from 'react';
import trash from '@/assets/trash.svg';
import pencil from '@/assets/pencil.svg';
import { Link, useNavigate } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import useFirestore from '../hooks/useFirestore';
import { AuthContext } from '../contexts/AuthContext';

export default function BookList() {
  // let location = useLocation();
  // let params = new URLSearchParams(location.search);
  // let search = params.get('search');

  // let { data: books, loading, error } = useFetch(`http://localhost:3001/books${search ? `?q=${search}` : ''}`);
  let { getCollection, deleteDocument } = useFirestore();

  let navigate = useNavigate();

  let { isDark } = useTheme();

  let deleteBook = async (e, id) => {
    e.preventDefault();
    await deleteDocument('books', id);
  };
  let { user } = useContext(AuthContext);
  let { data: books, loading, error } = getCollection('books', ['uid', '==', user.uid]);

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
              <div className={`${isDark ? 'text-white bg-dcard' : ''} border border-1 p-4 min-h-[500px] relative`}>
                <div className='image-container h-64 flex items-center justify-center'>
                  <img className='max-w-full max-h-full object-contain' src={b.cover} alt='' />
                </div>
                <div className='text-center space-y-3 mt-3'>
                  <h1>{b.title}</h1>
                  <p>{b.description}</p>
                  <div className='flex flex-wrap justify-between items-center'>
                    <div className='flex flex-wrap max-w-full'>
                      {b.categories.map((c) => (
                        <span className='mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-blue-500' key={c}>
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className='flex absolute bottom-3 right-3 items-center justify-end gap-3'>
                    <img
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/edit/${b.id}`);
                      }}
                      src={pencil}
                      alt=''
                    />

                    <img src={trash} alt='' onClick={(e) => deleteBook(e, b.id)} />
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
