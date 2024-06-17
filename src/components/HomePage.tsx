import { useEffect, useState } from "react";
import EmployeeList from "./EmployeeList";
import EmployeeListModel from "../models/EmployeeListModel";

const HomePage = () => {
  const [employeeList, setEmployeeList] = useState<EmployeeListModel[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          "https://664207cf3d66a67b3435e466.mockapi.io/api/v1/users"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEmployeeList(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      const response = await fetch(
        `https://664207cf3d66a67b3435e466.mockapi.io/api/v1/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isActive }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setEmployeeList((prevList) =>
        prevList.map((employee) =>
          employee.id === id ? { ...employee, isActive } : employee
        )
      );
    } catch (error) {
      console.error("Error updating employee status:", error);
    }
  };

  return (
    <EmployeeList
      employeeList={employeeList}
      onToggleActive={handleToggleActive}
    />
  );
};

export default HomePage;
