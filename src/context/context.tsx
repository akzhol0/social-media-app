import { doc, getDoc } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';
import { db } from '../firebase/config';

type ContextProps = {
  userLoggedInfo: any;
  setUserLoggedInfo: (arg0: any) => void;
  userLogged: boolean;
  setUserLogged: (arg0: boolean) => void;
  checkUserRegistration: () => void;
};

export const contextData = createContext({} as ContextProps);

type ContextOverAllProps = {
  children: React.ReactNode;
};

export function ContextOverAll({ children }: ContextOverAllProps) {
  const [userLoggedInfo, setUserLoggedInfo] = useState<any>([]);
  const [userLogged, setUserLogged] = useState(false);

  useEffect(() => {
    !userLogged && checkUserRegistration();
  });

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
      }}>
      {children}
    </contextData.Provider>
  );
}
