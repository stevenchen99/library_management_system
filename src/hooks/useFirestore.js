import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/firebaseConfig';

export default function useFirestore() {
  /*** Get All Documents from a Collection ***/
  let getCollection = (collectionName) => {
    let [data, setData] = useState([]);
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState('');

    useEffect(() => {
      setLoading(true);
      let ref = collection(db, collectionName);
      let q = query(ref, orderBy('datetime', 'desc'));
      onSnapshot(q, (docs) => {
        if (docs.empty) {
          setError('No Documents Found');
          setLoading(false);
        }
        let collection = [];
        docs.forEach((doc) => {
          let document = { id: doc.id, ...doc.data() };
          collection.push(document);
        });
        setData(collection);
        setLoading(false);
        setError('');
      });
    }, []);
    return { data, loading, error };
  };

  /*** Get a Document from a Collection ***/
  let getDocument = (collectionName, id) => {
    let [data, setData] = useState(null);
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState('');
    useEffect(() => {
      setLoading(true);
      let ref = doc(db, collectionName, id);
      onSnapshot(ref, (doc) => {
        if (doc.exists()) {
          let document = { id: doc.id, ...doc.data() };
          setData(document);
          setLoading(false);
          setError('');
        } else {
          setError('No Document Found');
          setLoading(false);
        }
      });
    }, [id]);
    return { data, loading, error };
  };

  /*** Create a Document in a Collection ***/
  let addDocument = async (collectionName, data) => {
    data.datetime = serverTimestamp();
    let ref = collection(db, collectionName);
    return addDoc(ref, data);
  };

  /*** Update a Document in a Collection ***/
  let updateDocument = async (collectionName, id, data) => {
    data.datetime = serverTimestamp();
    let ref = doc(db, collectionName, id);
    return updateDoc(ref, data);
  };

  /*** Delete a Document in a Collection ***/
  let deleteDocument = async (collectionName, id) => {
    let ref = doc(db, collectionName, id);
    return deleteDoc(ref);
  };

  return { getCollection, getDocument, addDocument, updateDocument, deleteDocument };
}
