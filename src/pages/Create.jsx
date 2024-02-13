import React, { useEffect, useState } from 'react';
import useFetch from '@/hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

export default function Create() {
  let [title, setTitle] = useState('');
  let [description, setDescription] = useState('');
  let [newCategory, setNewCategory] = useState('');
  let [categories, setCategories] = useState([]);
  let [showCreating, setShowCreating] = useState(false);
  let [showCreated, setShowCreated] = useState(false);

  let { setPostData, data: book, loading } = useFetch('http://localhost:3001/books', 'POST');

  let navigate = useNavigate();

  useEffect(() => {
    if (book) {
      const timeoutId = setTimeout(() => {
        navigate('/');
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [book, navigate]);

  useEffect(() => {
    if (loading && !book) {
      setShowCreating(true);

      // Simulate asynchronous operation (e.g., API request)
      setTimeout(() => {
        setShowCreating(false);
      }, 2000);
    }
    if (!loading && book) {
      setTimeout(() => {
        setShowCreated(true);
      }, 2250);
    }
  }, [loading, book, showCreating, showCreated]);

  let addBookCategory = (e) => {
    setCategories((prev) => [newCategory, ...prev]);
    setNewCategory('');
  };

  let addBook = (e) => {
    e.preventDefault();
    let data = {
      title,
      description,
      categories,
    };
    setPostData(data);
  };

  return (
    <div className='w-full max-w-lg mx-auto mt-5'>
      <div className='flex flex-wrap -mx-3 mb-6'>
        <div className='w-full px-3'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-title'>
            Title
          </label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-title'
            placeholder='Book Title'
          />
        </div>
      </div>
      <div className='flex flex-wrap -mx-3 mb-6'>
        <div className='w-full px-3'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-description'>
            Description
          </label>
          <textarea
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-description'
            placeholder='Book Description'
          />
        </div>
      </div>
      <div className='flex flex-wrap -mx-3 mb-6'>
        <div className='w-full px-3'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-category'>
            Categories
          </label>
          <div className='flex items-center space-x-2'>
            <input
              type='text'
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-category'
              placeholder='Book Category'
            />
            <button type='button' onClick={addBookCategory} className='bg-primary p-1 mb-3 rounded-lg'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6 text-white p-1'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
              </svg>
            </button>
          </div>
          <div className='flex flex-wrap mb-7'>
            {categories.map((c) => (
              <span className='mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-blue-500' key={c}>
                {c}
              </span>
            ))}
          </div>
          <button onClick={addBook} className='text-white bg-primary px-3 py-2 rounded-2xl flex items-center justify-center gap-1 w-full'>
            {!loading && !book && (
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
              </svg>
            )}
            {/* {!loading && !book && <span className='hidden md:block'>Create Book</span>}
            {loading && !book && <span className='hidden md:block'>Creating...</span>}
            {!loading && !!book && <span className='hidden md:block'>Book Created!</span>} */}
            <>
              {!loading && !book && <span className='hidden md:block'>Create Book</span>}
              <CSSTransition in={showCreating} timeout={300} classNames='fade' unmountOnExit>
                <span className='hidden md:block'>Creating...</span>
              </CSSTransition>
              <CSSTransition in={showCreated} timeout={300} classNames='fade' unmountOnExit>
                <span className='hidden md:block'>Book Created!</span>
              </CSSTransition>
            </>
          </button>
        </div>
      </div>
    </div>
  );
}
