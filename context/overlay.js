import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './auth';
import { firebaseAPI } from '../lib/firebase';

const OverlayContext = createContext({ data: null, loading: true });

export const OverlayProvider = ({ children }) => {
  const { user, loading } = useAuth();
  const [dataLoading, setDataLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    if (!user && loading) {
      return;
    } else if (!user && !loading) {
      setDataLoading(false);
      return;
    }

    firebaseAPI('getOverlayData').then((res) => {
      setData(res);
      setDataLoading(false);
    });
  }, [user, loading]);

  return (
    <OverlayContext.Provider value={{ data, loading: dataLoading }}>
      {children}
    </OverlayContext.Provider>
  );
};

export const useOverlay = () => useContext(OverlayContext);
