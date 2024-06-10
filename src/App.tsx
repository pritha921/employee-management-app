import  { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeListModel from './models/EmployeeListModel';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import AddNewEmployee from './components/AddNewEmployee';

const App = () => {
  const [employees, setEmployees] = useState<EmployeeListModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          'https://664207cf3d66a67b3435e466.mockapi.io/api/v1/users'
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: EmployeeListModel[] = await response.json();
        setEmployees(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the employees data', error);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleToggleActive = (id: string, isActive: boolean) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === id ? { ...employee, isActive } : employee
      )
    );
  };

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              loading ? (
                <Loader />
              ) : (
                <EmployeeList employeeList={employees} onToggleActive={handleToggleActive} />
              )
            }
          />
          <Route path="/add" element={<AddNewEmployee />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
