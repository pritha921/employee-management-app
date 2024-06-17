import { useState, useEffect } from "react";
import EmployeeList from "./EmployeeList";
import EmployeeListModel from "../models/EmployeeListModel";
import Loader from "./Loader";

const HomePage = () => {
  const [employees, setEmployees] = useState<EmployeeListModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          "https://664207cf3d66a67b3435e466.mockapi.io/api/v1/users"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: EmployeeListModel[] = await response.json();
        setEmployees(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the employees data", error);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      const response = await fetch(`https://664207cf3d66a67b3435e466.mockapi.io/api/v1/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.id === id ? { ...employee, isActive } : employee
        )
      );
    } catch (error) {
      console.error('Error updating employee status:', error);
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    try {
      await fetch(`https://664207cf3d66a67b3435e466.mockapi.io/api/v1/users/${id}`, {
        method: 'DELETE',
      });

      setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== id));
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
