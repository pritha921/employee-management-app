import React, { createContext, useState, ReactNode } from 'react';

interface ApiFetchContextProps {
  apiFetch: boolean;
  setApiFetch: React.Dispatch<React.SetStateAction<boolean>>;
  cancelled: boolean;
  setCancelled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ApiFetchContext = createContext<ApiFetchContextProps | undefined>(undefined);

 const ApiFetchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiFetch, setApiFetch] = useState<boolean>(false);
  const [cancelled, setCancelled] = useState<boolean>(false);

  return (
    <ApiFetchContext.Provider value={{ apiFetch, setApiFetch, cancelled, setCancelled }}>
      {children}
    </ApiFetchContext.Provider>
  );
};

export default ApiFetchProvider;

