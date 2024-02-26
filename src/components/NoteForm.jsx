import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFirestore from '../hooks/useFirestore';

export default function NoteForm({ type = 'create', setEditNote, editNote }) {
  let { id } = useParams();
  let [note, setNote] = useState('');
  let { addDocument, updateDocument } = useFirestore();
  let submitNote = async () => {
    if (type === 'create') {
      let data = {
        note,
        bookUid: id,
      };
      await addDocument('notes', data);
      setNote('');
    } else {
      editNote.note = note;
      await updateDocument('notes', editNote.id, editNote, false);
      setEditNote(null);
    }
  };

  useEffect(() => {
    if (type === 'update') {
      setNote(editNote.note);
    }
  }, [type]);
  return (
    <div className={`${type === 'update' ? 'w-5/6 mx-auto' : 'w-4/6 mx-auto'}`}>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className='p-3 shadow-md border-2 bg-gray-50 w-full'
        name=''
        id=''
        cols='30'
        rows='5'
        placeholder='Enter Note'
      ></textarea>
      <div className='flex space-x-3'>
        <button onClick={submitNote} className='text-white text-sm bg-primary px-3 py-2 rounded-lg flex items-center gap-1 my-3 ml-3'>
          <span>{type === 'update' ? 'Update' : 'Add'} Note</span>
        </button>
        {type === 'update' && (
          <button
            onClick={() => setEditNote(null)}
            className='text-primary text-sm border-2 border-primary px-3 py-2 rounded-lg flex items-center gap-1 my-3 ml-3'
          >
            <span>Cancel</span>
          </button>
        )}
      </div>
    </div>
  );
}
