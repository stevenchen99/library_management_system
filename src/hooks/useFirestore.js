import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { db } from '@/firebase/firebaseConfig';

export default function useFirestore() {
  /*** Get All Documents from a Collection ***/
  let getCollection = (collectionName, _q, search) => {
    let qRef = useRef(_q).current;
    let [data, setData] = useState([]);
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState('');

    useEffect(() => {
      setLoading(true);
      let ref = collection(db, collectionName);
      let queries = [];
      if (qRef) {
        queries.push(where(...qRef));
      }
      queries.push(orderBy('dateTime', 'desc'));
      let q = query(ref, ...queries);
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
        if (search?.field && search?.value) {
          let searchedData = collection.filter((doc) => {
            return doc[search?.field].match(new RegExp(search?.value, 'i'));
          });
          setData(searchedData);
        } else {
          setData(collection);
        }
        setLoading(false);
        setError('');
      });
    }, [qRef, search?.field, search?.value]);
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
    data.dateTime = serverTimestamp();
    let ref = collection(db, collectionName);
    return addDoc(ref, data);
  };

  /*** Update a Document in a Collection ***/
  let updateDocument = async (collectionName, id, data, updateDate = true) => {
    if (updateDate) {
      data.dateTime = serverTimestamp();
    }
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
