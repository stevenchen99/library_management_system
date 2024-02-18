import React from 'react';

export default function Register() {
  return (
    <div class='w-full max-w-lg mt-20 mx-auto'>
      <form class='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-2'>
        <h1 className='text-2xl text-primary text-bold my-5'>Register Form</h1>
        <div class='mb-4'>
          <label class='block text-gray-700 text-sm font-bold mb-2' for='email'>
            Email
          </label>
          <input
            class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='email'
            type='email'
            placeholder='Enter Email'
          />
        </div>
        <div class='mb-6'>
          <label class='block text-gray-700 text-sm font-bold mb-2' for='password'>
            Password
          </label>
          <input
            class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            id='password'
            type='password'
            placeholder='Enter Password'
          />
          {/* <p class='text-red-500 text-xs italic'>Please choose a password.</p> */}
        </div>
        <div class='flex items-center justify-between'>
          <button class='bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='button'>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
