import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import useTheme from '../hooks/useTheme';
import { addDoc, collection, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';

export default function Create() {
  let { id } = useParams();
  let [title, setTitle] = useState('');
  let [description, setDescription] = useState('');
  let [newCategory, setNewCategory] = useState('');
  let [categories, setCategories] = useState([]);
  let [showCreating, setShowCreating] = useState(false);
  let [showCreated, setShowCreated] = useState(false);
  let [isCreated, setIsCreated] = useState(false);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState('');
  let [isEdit, setIsEdit] = useState(false);

  /*** Create or Edit ***/

  useEffect(() => {
    // Edit
    if (id) {
      setIsEdit(true);
      let ref = doc(db, 'books', id);
      getDoc(ref).then((doc) => {
        if (doc.exists()) {
          let { title, description, categories } = doc.data();
          setTitle(title);
          setDescription(description);
          setCategories(categories);
        }
      });
    }
    // Create
    else {
      setIsEdit(false);
      setTitle('');
      setDescription('');
      setCategories([]);
    }
  }, []);

  /*** Create button text change control & Navigation ***/

  let navigate = useNavigate();

  useEffect(() => {
    if (isCreated) {
      const timeoutId = setTimeout(() => {
        navigate('/');
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [isCreated, navigate]);

  useEffect(() => {
    if (loading && !isCreated) {
      setShowCreating(true);

      // Simulate asynchronous operation (e.g., API request)
      setTimeout(() => {
        setShowCreating(false);
      }, 2000);
    }
    if (!loading && isCreated) {
      setTimeout(() => {
        setShowCreated(true);
      }, 2000);
    }
  }, [loading, isCreated, showCreating, showCreated]);

  /*** Add Book Category ***/

  let addBookCategory = (e) => {
    if (newCategory && categories.includes(newCategory)) {
      setNewCategory('');
      return;
    }
    setCategories((prev) => [newCategory, ...prev]);
    setNewCategory('');
  };

  /*** Add Book ***/

  let addBook = (e) => {
    e.preventDefault();
    let data = {
      title,
      description,
      categories,
      datetime: serverTimestamp(),
    };
    setLoading(true);
    // Firebase store
    let ref = collection(db, 'books');
    addDoc(ref, data)
      .then(() => {
        setIsCreated(true);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to Create Book');
        setLoading(false);
      });
  };

  let { isDark } = useTheme();

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='w-full max-w-lg mx-auto mt-5 h-screen'>
      <div className='flex flex-wrap -mx-3 mb-6'>
        <div className='w-full px-3'>
          <label className={`${isDark ? 'text-white' : ''} block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2`} htmlFor='grid-title'>
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
          <label className={`${isDark ? 'text-white' : ''} block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2`} htmlFor='grid-description'>
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
          <label className={`${isDark ? 'text-white' : ''} block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2`} htmlFor='grid-category'>
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
            {!loading && !isCreated && !isEdit && (
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
              </svg>
            )}
            <>
              {!loading && !isCreated && <span className='hidden md:block'>{isEdit ? 'Update' : 'Create'} Book</span>}
              <CSSTransition in={showCreating} timeout={200} classNames='fade' unmountOnExit>
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
