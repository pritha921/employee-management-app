import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ApiFetchContextProps {
  apiFetch: boolean;
  setApiFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const ApiFetchContext = createContext<ApiFetchContextProps | undefined>(undefined);

export const ApiFetchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiFetch, setApiFetch] = useState<boolean>(false);

  return (
    <ApiFetchContext.Provider value={{ apiFetch, setApiFetch }}>
      {children}
    </ApiFetchContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useApiFetch = () => {
  const context = useContext(ApiFetchContext);
  if (context === undefined) {
    throw new Error('useApiFetch must be used within an ApiFetchProvider');
  }
  return context;
};
