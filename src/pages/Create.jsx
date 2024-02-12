import React, { useState } from 'react';

export default function Create() {
  let [title, setTitle] = useState('');
  let [description, setDescription] = useState('');
  let [category, setCategory] = useState('');

  return (
    <form class='w-full max-w-lg mx-auto mt-5'>
      <div class='flex flex-wrap -mx-3 mb-6'>
        <div class='w-full px-3'>
          <label class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' for='grid-title'>
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-title'
            placeholder='Book Title'
          />
        </div>
      </div>
      <div class='flex flex-wrap -mx-3 mb-6'>
        <div class='w-full px-3'>
          <label class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' for='grid-description'>
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-description'
            placeholder='Book Description'
          />
        </div>
      </div>
      <div class='flex flex-wrap -mx-3 mb-6'>
        <div class='w-full px-3'>
          <label class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' for='grid-category'>
            Categories
          </label>
          <div className='flex items-center space-x-2'>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-category'
              placeholder='Book Category'
            />
            <button className='bg-primary p-1 mb-3 rounded-lg'>
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

          <button className='text-white bg-primary px-3 py-2 rounded-2xl flex items-center justify-center gap-1 w-full'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
            </svg>
            <span className='hidden md:block'>Create Book</span>
          </button>
        </div>
      </div>
    </form>
  );
}
