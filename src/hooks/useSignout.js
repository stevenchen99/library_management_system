import { useState } from 'react';
import { auth } from '@/firebase/firebaseConfig';
import { signOut } from 'firebase/auth';

export default function useSignout() {
  let [error, setError] = useState('');
  let [loading, setLoading] = useState(false);
  let logout = async () => {
    try {
      setLoading(true);
      let res = await signOut(auth);
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
    logout,
  };
}
