import React, { useEffect, useState } from 'react';
import useSignup from '@/hooks/useSignup';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let { error, loading, signUp } = useSignup();
  let [user, setUser] = useState(undefined);
  let navigate = useNavigate();

  let registerUser = async () => {
    let user = await signUp(email, password);
    setUser(user);
  };

  useEffect(() => {
    if (user) {
      const timeoutId = setTimeout(() => {
        navigate('/');
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [user, navigate]);

  return (
    <div className='w-full max-w-lg mt-20 mx-auto'>
      <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-2'>
        <h1 className='text-2xl text-primary text-bold my-5'>Register Form</h1>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='email'
            type='email'
            placeholder='Enter Email'
          />
        </div>
        <div className='mb-6'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            id='password'
            type='password'
            placeholder='Enter Password'
          />
          <p className='text-red-500 text-xs italic'>{error}</p>
        </div>
        <div className='flex items-center justify-between'>
          <button
            onClick={registerUser}
            className='flex items-center bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='button'
          >
            <>
              {loading && (
                <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
              )}
              {!user && <span>Register</span>}
              {!loading && user && <span>Registered!</span>}
            </>
          </button>
        </div>
      </div>
    </div>
  );
}
