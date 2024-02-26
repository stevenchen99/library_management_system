import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFirestore from '../hooks/useFirestore';

export default function NoteForm() {
  let { id } = useParams();
  let [note, setNote] = useState('');
  let { addDocument } = useFirestore();
  let addNote = async () => {
    let data = {
      note,
      bookUid: id,
    };
    await addDocument('notes', data);
    setNote('');
  };
  return (
    <div className='w-4/6 mx-auto'>
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
      <button onClick={addNote} className='text-white text-sm bg-primary px-3 py-2 rounded-lg flex items-center gap-1 my-3 ml-3'>
        <span>Add Note</span>
      </button>
    </div>
  );
}
