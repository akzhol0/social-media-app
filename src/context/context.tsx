import { doc, getDoc } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';
import { db } from '../firebase/config';

type ContextProps = {
  userLoggedInfo: any;
  setUserLoggedInfo: (arg0: any) => void;
  userLogged: boolean;
  setUserLogged: (arg0: boolean) => void;
  bookmarks: any;
  setBookmarks: (arg0: any) => void;
  fetchedBooks: number;
  checkUserRegistration: () => void;
};

export const contextData = createContext({} as ContextProps);

type ContextOverAllProps = {
  children: React.ReactNode;
};

export function ContextOverAll({ children }: ContextOverAllProps) {
  const [userLoggedInfo, setUserLoggedInfo] = useState<any>([]);
  const [userLogged, setUserLogged] = useState(false);

  const [bookmarks, setBookmarks] = useState<any>([]);
  const [fetchedBooks, setFetchedBooks] = useState(0);

  useEffect(() => {
    !userLogged && checkUserRegistration();
  }, []);

  useEffect(() => {
    userLogged && getBookmarks();
  }, [userLogged]);

  // get all bookmarks
  const getBookmarks = async () => {
    const docRef = doc(db, 'users', `${userLoggedInfo.uid}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setBookmarks(docSnap.data().bookmarks);
      setFetchedBooks(fetchedBooks + 1);
    }
  };

  // check if user logged in
  const checkUserRegistration = async () => {
    const userId = localStorage.getItem('uid');

    if (userId !== null) {
      const docRef = doc(db, 'users', `${userId}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserLoggedInfo(docSnap.data());
        setUserLogged(true);
      }
    }
  };

  return (
    <contextData.Provider
      value={{
        userLoggedInfo,
        setUserLoggedInfo,
        userLogged,
        setUserLogged,
        checkUserRegistration,
        bookmarks,
        setBookmarks,
        fetchedBooks,
      }}>
      {children}
    </contextData.Provider>
  );
}
