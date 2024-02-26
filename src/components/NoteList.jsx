import React from 'react';
import { useParams } from 'react-router-dom';
import useFirestore from '../hooks/useFirestore';
import moment from 'moment';
import useTheme from '../hooks/useTheme';

export default function NoteList() {
  let { isDark } = useTheme();
  let { id } = useParams();
  let { getCollection } = useFirestore();
  let { data: notes, loading, error } = getCollection('notes', ['bookUid', '==', id]);
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <>
      {loading && <p>Loading ... </p>}
      {!!notes.length &&
        notes.map((n) => (
          <div className='w-5/6 mx-auto'>
            <div className={`${isDark ? 'text-white bg-dcard' : ''} border-2 shadow-md p-3 my-3`}>
              <div className='flex space-x-3'>
                <img className='w-12 h-12 rounded-full' src='https://atomichub-ipfs.com/ipfs/QmS3rH1LYZJvdWWQRcdfEZpEfdDbZANhpv4qhTgoedYghu' alt='' />
                <div>
                  <h3>Steven</h3>
                  <div className='text-gray-400'>{moment(n?.dateTime?.seconds * 1000).fromNow()}</div>
                </div>
              </div>
              <div className='mt-3'>{n.note}</div>
            </div>
          </div>
        ))}
    </>
  );
}
