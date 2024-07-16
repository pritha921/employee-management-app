import React, { createContext, useContext, useState } from 'react';

interface ApiFetchContextType {
  apiFetch: boolean;
  setApiFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const ApiFetchContext = createContext<ApiFetchContextType | undefined>(undefined);

export const ApiFetchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apiFetch, setApiFetch] = useState<boolean>(true);

  return (
    <ApiFetchContext.Provider value={{ apiFetch, setApiFetch }}>
      {children}
    </ApiFetchContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useApiFetch = () => {
  const context = useContext(ApiFetchContext);
  if (!context) {
    throw new Error('useApiFetch must be used within an ApiFetchProvider');
  }
  return context;
};
