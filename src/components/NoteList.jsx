import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFirestore from '../hooks/useFirestore';
import moment from 'moment';
import useTheme from '../hooks/useTheme';
import trashIcon from '@/assets/trash.svg';
import pencilIcon from '@/assets/pencil.svg';
import NoteForm from '@/components/NoteForm';

export default function NoteList() {
  let { isDark } = useTheme();
  let { id } = useParams();
  let { getCollection, deleteDocument } = useFirestore();
  let { data: notes, loading, error } = getCollection('notes', ['bookUid', '==', id]);
  let [editNote, setEditNote] = useState(null);

  let deleteNote = async (id) => {
    await deleteDocument('notes', id);
  };

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <>
      {loading && <p>Loading ... </p>}
      {!!notes.length &&
        notes.map((n) => (
          <div className='w-5/6 mx-auto' key={n.id}>
            <div className={`${isDark ? 'text-white bg-dcard' : ''} border-2 shadow-md p-3 my-3`}>
              <div className='flex justify-between'>
                <div className='flex space-x-3'>
                  <img className='w-12 h-12 rounded-full' src='https://atomichub-ipfs.com/ipfs/QmS3rH1LYZJvdWWQRcdfEZpEfdDbZANhpv4qhTgoedYghu' alt='' />
                  <div>
                    <h3>Steven</h3>
                    <div className='text-gray-400'>{moment(n?.dateTime?.seconds * 1000).fromNow()}</div>
                  </div>
                </div>
                <div className='space-y-2'>
                  <img onClick={() => setEditNote(n)} className='cursor-pointer' src={pencilIcon} alt='' />
                  <img onClick={() => deleteNote(n.id)} className='cursor-pointer' src={trashIcon} alt='' />
                </div>
              </div>
              <div className='mt-3'>
                {editNote?.id !== n.id && n.note}
                {editNote?.id === n.id && <NoteForm type='update' setEditNote={setEditNote} editNote={editNote} />}
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
