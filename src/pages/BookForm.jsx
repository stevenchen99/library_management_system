import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import useTheme from '../hooks/useTheme';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import useFirestore from '../hooks/useFirestore';
import { AuthContext } from '../contexts/AuthContext';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase/firebaseConfig';

export default function BookForm() {
  let { id } = useParams();
  let [title, setTitle] = useState('');
  let [description, setDescription] = useState('');
  let [newCategory, setNewCategory] = useState('');
  let [categories, setCategories] = useState([]);
  let [showProgress, setshowProgress] = useState(false);
  let [showFinished, setshowFinished] = useState(false);
  let [isEdit, setIsEdit] = useState(false);
  let [isFinished, setisFinished] = useState(false);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState('');
  let [file, setFile] = useState(null);
  let [imagePreview, setImagePreview] = useState('');

  let { isDark } = useTheme();

  let { user } = useContext(AuthContext);

  let { addDocument, updateDocument } = useFirestore();

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
    if (isFinished) {
      const timeoutId = setTimeout(() => {
        navigate('/');
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [isFinished, navigate]);

  useEffect(() => {
    if (loading && !isFinished) {
      setshowProgress(true);

      // Simulate asynchronous operation (e.g., API request)
      setTimeout(() => {
        setshowProgress(false);
      }, 1900);
    }
    if (!loading && isFinished) {
      setTimeout(() => {
        setshowFinished(true);
      }, 2000);
    }
  }, [loading, isFinished, showProgress, showFinished]);

  /*** Add Book Category ***/
  let addBookCategory = (e) => {
    if (newCategory && categories.includes(newCategory)) {
      setNewCategory('');
      return;
    }
    setCategories((prev) => [newCategory, ...prev]);
    setNewCategory('');
  };

  /*** Image Preview ***/
  let handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };
  let handlePreviewImage = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImagePreview(reader.result);
    };
  };

  useEffect(() => {
    if (file) {
      handlePreviewImage(file);
    }
  }, [file]);

  /*** Upload Book Cover Image to Firebase Storage ***/
  let uploadToFirebase = async (file) => {
    let uniqueFileName = Date.now().toString() + '_' + file.name;
    let path = '/covers/' + user.uid + '/' + uniqueFileName;
    let storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  /*** Submit Form ***/
  let submitForm = async (e) => {
    e.preventDefault();
    let url = await uploadToFirebase(file);
    let data = {
      title,
      description,
      categories,
      uid: user.uid,
      cover: url,
    };
    setLoading(true);
    // Update
    if (isEdit) {
      try {
        await updateDocument('books', id, data);
        setisFinished(true);
        setLoading(false);
      } catch (error) {
        setError('Failed to Update Book');
        setLoading(false);
      }
    }
    // Create
    else {
      try {
        await addDocument('books', data);
        setisFinished(true);
        setLoading(false);
      } catch (error) {
        setError('Failed to Create Book');
        setLoading(false);
      }
    }
  };

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
          <div className='w-full px-3 my-3'>
            <label className={`${isDark ? 'text-white' : ''} block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2`} htmlFor='grid-title'>
              Book Cover
            </label>
            <input type='file' onChange={handleImageChange} />
            {!!imagePreview && <img src={imagePreview} alt='' className='my-3 mx-auto' width={300} height={300} />}
          </div>
          <button onClick={submitForm} className='text-white bg-primary px-3 py-2 rounded-2xl flex items-center justify-center gap-1 w-full'>
            {!loading && !isFinished && (
              <div className='flex'>
                {!isEdit && (
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
                  </svg>
                )}
                {isEdit && (
                  <svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24' fill='currentColor'>
                    <path d='M480-120q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-480q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q82 0 155.5 35T760-706v-94h80v240H600v-80h110q-41-56-101-88t-129-32q-117 0-198.5 81.5T200-480q0 117 81.5 198.5T480-200q105 0 183.5-68T756-440h82q-15 137-117.5 228.5T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z' />
                  </svg>
                )}
              </div>
            )}
            <>
              {!loading && !isFinished && <span className='hidden md:block'>{isEdit ? 'Update' : 'Create'} Book</span>}
              <CSSTransition in={showProgress} timeout={300} classNames='fade' unmountOnExit>
                <div className='flex items-center'>
                  {!isEdit && (
                    <div className='flex items-center'>
                      <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                        <path
                          className='opacity-75'
                          fill='currentColor'
                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                        ></path>
                      </svg>
                      <span className='hidden md:block'>Creating...</span>
                    </div>
                  )}
                  {isEdit && (
                    <div className='flex items-center'>
                      <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                        <path
                          className='opacity-75'
                          fill='currentColor'
                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                        ></path>
                      </svg>
                      <span className='hidden md:block'>Updating...</span>
                    </div>
                  )}
                </div>
              </CSSTransition>
              <CSSTransition in={showFinished} timeout={300} classNames='fade' unmountOnExit>
                <div>
                  {!isEdit && (
                    <div className='flex items-center space-x-2'>
                      <svg xmlns='http://www.w3.org/2000/svg' height='20' viewBox='0 -960 960 960' width='20' fill='white'>
                        <path d='M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35l65-65q11 32 17 66t6 70q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-216L254-466l56-56 114 114 400-401 56 56-456 457Z' />
                      </svg>
                      <span className='hidden md:block'>Book Created!</span>
                    </div>
                  )}
                  {isEdit && (
                    <div className='flex items-center space-x-2'>
                      <svg xmlns='http://www.w3.org/2000/svg' height='20' viewBox='0 -960 960 960' width='20' fill='white'>
                        <path d='M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35l65-65q11 32 17 66t6 70q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-216L254-466l56-56 114 114 400-401 56 56-456 457Z' />
                      </svg>
                      <span className='hidden md:block'>Book Updated!</span>
                    </div>
                  )}
                </div>
              </CSSTransition>
            </>
          </button>
        </div>
      </div>
    </div>
  );
}
