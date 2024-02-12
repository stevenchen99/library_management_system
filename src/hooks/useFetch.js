import { useEffect, useState } from 'react';

function useFetch(url) {
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);

  useEffect(() => {
    let abortController = new AbortController();
    let signal = abortController.signal;

    setLoading(true);
    fetch(url, { signal })
      .then((res) => {
        if (!res.ok) {
          throw Error('Something went wrong');
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
        setError(null);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
    // Clean up function
    return () => {
      abortController.abort();
    };
  }, [url]);
  return { data, loading, error };
}

export default useFetch;
