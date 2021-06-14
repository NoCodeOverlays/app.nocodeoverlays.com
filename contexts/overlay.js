import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './auth';
import { firebaseAPI } from '../lib/firebase';

const DEFAULT_DATA = { width: '', height: '', widgets: [] };
const DEFAULT_DATA_LOADING = false;

const OverlayContext = createContext({
  data: DEFAULT_DATA,
  dataLoading: DEFAULT_DATA_LOADING,
});

export const OverlayProvider = ({ children }) => {
  const { user, userLoading } = useAuth();
  const [dataLoading, setDataLoading] = useState(DEFAULT_DATA_LOADING);
  const [data, setData] = useState(DEFAULT_DATA);

  useEffect(() => {
    setDataLoading(true);
    return firebaseAPI('getOverlayData').then((res) => {
      setData({ ...DEFAULT_DATA, ...res });
      setDataLoading(false);
    });
  }, [user, userLoading]);

  return (
    <OverlayContext.Provider
      value={{ data, dataLoading, setDataLoading, setData }}
    >
      {children}
    </OverlayContext.Provider>
  );
};

export const useOverlay = () => useContext(OverlayContext);
