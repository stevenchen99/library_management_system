import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import lightIcon from '@/assets/light.svg';
import darkIcon from '@/assets/dark.svg';
import useSignout from '../hooks/useSignout';
import { AuthContext } from '../contexts/AuthContext';

export default function Navbar() {
  let [search, setSearch] = useState('');
  let navigate = useNavigate();
  let handleSearch = (e) => {
    if (e.key == 'Enter') {
      navigate('/?search=' + search);
    }
  };

  let { isDark, changeTheme } = useTheme();

  let { user } = useContext(AuthContext);

  let { logout } = useSignout();
  let signOutUser = async () => {
    await logout();
    const timeoutId = setTimeout(() => {
      navigate('/login');
    }, 3000);

    return () => clearTimeout(timeoutId);
  };

  return (
    <nav className={`border border-b-1`}>
      <ul className='flex justify-between items-center p-3 max-w-6xl mx-auto'>
        <li className='flex items-center gap-3'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke={`${isDark ? 'white' : 'currentColor'}`}
            className='w-6 h-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z' />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            placeholder='Search books...'
            className={`${!isDark ? 'outline-gray-500 bg-slate-200' : ''} px-2 py-1 rounded-lg`}
          />
        </li>
        <Link
          to='/'
          onClick={(e) => {
            setSearch('');
          }}
          className='flex items-center gap-3 md:-ml-26 cursor-pointer'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill={`${isDark ? 'white' : 'none'}`}
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 mt-1'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25'
            />
          </svg>
          <span className='text-2xl font-bold text-primary hidden md:block'>Book Store</span>
        </Link>
        <li className='flex items-center gap-3'>
          <Link to='/create' className='text-white text-sm bg-primary px-3 py-2 rounded-2xl flex items-center gap-1'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
            </svg>
            <span className='hidden md:block'>Create Book</span>
          </Link>
          <div className='w-11'>
            <img src='https://atomichub-ipfs.com/ipfs/QmS3rH1LYZJvdWWQRcdfEZpEfdDbZANhpv4qhTgoedYghu' alt='' className='w-full rounded-full' />
          </div>
          <div className='cursor-pointer'>
            {isDark && <img src={lightIcon} alt='' className='w-8' onClick={() => changeTheme('light')} />}
            {!isDark && <img src={darkIcon} alt='' className='w-8' onClick={() => changeTheme('dark')} />}
          </div>
          <div className='flex space-x-3'>
            {!user && (
              <>
                <Link to='/login' className='flex items-center border-2 text-sm rounded-lg px-2 py-2 space-x-1'>
                  <>
                    <svg xmlns='http://www.w3.org/2000/svg' height='20' viewBox='0 -960 960 960' width='20'>
                      <path d='M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z' />
                    </svg>
                    <span>Login</span>
                  </>
                </Link>
                <Link to='/register' className='flex items-center bg-primary text-white text-sm rounded-lg px-2 py-2 space-x-1'>
                  <>
                    <svg xmlns='http://www.w3.org/2000/svg' height='20' viewBox='0 -960 960 960' width='20' fill='white'>
                      <path d='M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z' />
                    </svg>
                    <span>Register</span>
                  </>
                </Link>
              </>
            )}
            {user && (
              <button onClick={signOutUser} className='flex items-center bg-red-500 text-white text-sm rounded-lg px-2 py-2 space-x-1'>
                <>
                  <svg xmlns='http://www.w3.org/2000/svg' height='20' viewBox='0 -960 960 960' width='20' fill='white'>
                    <path d='M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z' />
                  </svg>
                  <span>Logout</span>
                </>
              </button>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
}
