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

  const handleToggleActive = (id: string, isActive: boolean) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === id ? { ...employee, isActive } : employee
      )
    );
  };
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <EmployeeList
          employeeList={employees}
          onToggleActive={handleToggleActive}
        />
      )}
    </div>
  );
};

export default HomePage;
