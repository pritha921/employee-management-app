import  { useState, useEffect } from 'react';
import EmployeeList from './components/EmployeeList';


type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  project: string;
  city: string;
  isActive: boolean
};

const App = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('https://664207cf3d66a67b3435e466.mockapi.io/api/v1/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Employee[] = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching the employees data', error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div>
  
    <EmployeeList employeeList={employees} />
    </div>
  );
};

export default App;

