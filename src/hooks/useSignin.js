import { useState } from 'react';
import { auth } from '@/firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function useSignin() {
  let [error, setError] = useState('');
  let [loading, setLoading] = useState(false);
  let signIn = async (email, password) => {
    try {
      setLoading(true);
      let res = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      setError('');
      return res.user;
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    signIn,
  };
}
