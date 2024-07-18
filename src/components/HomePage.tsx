import React, { useEffect, useState } from 'react';
import EmployeeList from './EmployeeList';
import EmployeeListModel from '../models/EmployeeListModel';
import Loader from './Loader';
import { useApiFetch } from '../models/ApiFetchContext';

const HomePage: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeListModel[]>([]);
  const { apiFetch, setApiFetch } = useApiFetch();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://664207cf3d66a67b3435e466.mockapi.io/api/v1/users'
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: EmployeeListModel[] = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching the employees data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (apiFetch) {
      fetchEmployees();
      setApiFetch(false);
    }
  }, [apiFetch, setApiFetch]);

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      await fetch(
        `https://664207cf3d66a67b3435e466.mockapi.io/api/v1/users/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isActive }),
        }
      );

      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.id === id ? { ...employee, isActive } : employee
        )
      );
    } catch (error) {
      console.error('Error updating the employee data', error);
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    try {
      await fetch(
        `https://664207cf3d66a67b3435e466.mockapi.io/api/v1/users/${id}`,
        {
          method: 'DELETE',
        }
      );

      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.id !== id)
      );
    } catch (error) {
      console.error('Error deleting the employee', error);
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <EmployeeList
          employeeList={employees}
          onToggleActive={handleToggleActive}
          onDelete={handleDeleteEmployee}
        />
      )}
    </div>
  );
};

export default HomePage;