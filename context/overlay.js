import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './auth';
import { firebaseAPI } from '../lib/firebase';

const OverlayContext = createContext({ data: null, dataLoading: null });

export const OverlayProvider = ({ children }) => {
  const { user, userLoading } = useAuth();
  const [dataLoading, setDataLoading] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    setDataLoading(true);
    return firebaseAPI('getOverlayData').then((res) => {
      setData(res);
      setDataLoading(false);
    });
  }, [user, userLoading]);

  return (
    <OverlayContext.Provider value={{ data, dataLoading }}>
      {children}
    </OverlayContext.Provider>
  );
};

export const useOverlay = () => useContext(OverlayContext);
