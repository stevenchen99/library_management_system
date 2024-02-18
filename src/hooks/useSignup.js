import { useState } from 'react';
import { auth } from '@/firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function useSignup() {
  let [error, setError] = useState('');
  let [loading, setLoading] = useState(false);
  let signUp = async (email, password) => {
    try {
      setLoading(true);
      let res = await createUserWithEmailAndPassword(auth, email, password);
      setLoading(false);
      return res.user;
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    signUp,
  };
}
