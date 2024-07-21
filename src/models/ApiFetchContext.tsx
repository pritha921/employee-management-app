import React, { createContext, useState, ReactNode } from 'react';

interface ApiFetchContextProps {
  apiFetch: boolean;
  setApiFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ApiFetchContext = createContext<ApiFetchContextProps | undefined>(undefined);

const ApiFetchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiFetch, setApiFetch] = useState<boolean>(false);

  return (
    <ApiFetchContext.Provider value={{ apiFetch, setApiFetch }}>
      {children}
    </ApiFetchContext.Provider>
  );
};

export default ApiFetchProvider;

