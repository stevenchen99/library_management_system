import { useEffect, useState } from 'react';

function useFetch(url, method = 'GET') {
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);
  let [postData, setPostData] = useState(null);

  useEffect(() => {
    let abortController = new AbortController();
    let signal = abortController.signal;
    let options = { signal, method };

    setLoading(true);

    let fetchData = () =>
      fetch(url, options)
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

    if (method === 'POST' && postData) {
      options = {
        ...options,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      };
      fetchData();
    }

    if (method === 'GET') {
      fetchData();
    }

    // Clean up function
    return () => {
      abortController.abort();
    };
  }, [url, postData]);
  return { setPostData, data, loading, error };
}

export default useFetch;
