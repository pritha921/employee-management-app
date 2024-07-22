import React, { createContext, useState, ReactNode, useContext } from 'react';
import EmployeeListModel from "../models/EmployeeListModel";

interface EmployeeContextProps {
  employees: EmployeeListModel[];
  setEmployees: React.Dispatch<React.SetStateAction<EmployeeListModel[]>>;
}

const EmployeeContext = createContext<EmployeeContextProps | undefined>(undefined);

export const EmployeeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<EmployeeListModel[]>([]);

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees }}>
      {children}
    </EmployeeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
};