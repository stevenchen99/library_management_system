import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';

export default function Navbar() {
  let [search, setSearch] = useState('');
  let navigate = useNavigate();
  let handleSearch = (e) => {
    if (e.key == 'Enter') {
      navigate('/?search=' + search);
    }
  };

  let { theme } = useContext(ThemeContext);

  return (
    <nav className={`border border-b-1 ${theme === 'dark' ? 'bg-blue-200' : 'bg-yellow-200'}`}>
      <ul className='flex justify-between items-center p-3 max-w-6xl mx-auto'>
        <li className='flex items-center gap-3'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
            <path strokeLinecap='round' strokeLinejoin='round' d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z' />
          </svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleSearch} placeholder='Search books...' className='outline-none' />
        </li>
        <Link
          to='/'
          onClick={(e) => {
            setSearch('');
          }}
          className='flex items-center gap-3 md:-ml-20 cursor-pointer'
        >
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6 mt-1'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25'
            />
          </svg>
          <span className='text-2xl font-bold text-primary hidden md:block'>Book Store</span>
        </Link>
        <li className='flex items-center gap-3'>
          <Link to='/create' className='text-white bg-primary px-3 py-2 rounded-2xl flex items-center gap-1'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
            </svg>
            <span className='hidden md:block'>Create Book</span>
          </Link>
          <div className='w-11'>
            <img src='https://atomichub-ipfs.com/ipfs/QmS3rH1LYZJvdWWQRcdfEZpEfdDbZANhpv4qhTgoedYghu' alt='' className='w-full rounded-full' />
          </div>
        </li>
      </ul>
    </nav>
  );
}
