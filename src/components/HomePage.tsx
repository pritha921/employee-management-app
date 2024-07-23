import React, { useEffect, useCallback, useState } from "react";
import EmployeeList from "./EmployeeList";
import Loader from "./Loader";
import useApiFetch from "../hooks/apiFetchHook";
import { useEmployees } from "../models/EmployeeContext";
const HomePage: React.FC = () => {
  const { employees, setEmployees } = useEmployees();
  const { apiFetch, setApiFetch } = useApiFetch();
  const [loading, setLoading] = React.useState(true);
  const [lastVisibleTime, setLastVisibleTime] = useState(Date.now());

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://664207cf3d66a67b3435e466.mockapi.io/api/v1/users"
      );
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching the employees data", error);
    } finally {
      setLoading(false);
    }
  }, [setEmployees]);

  useEffect(() => {
    if (apiFetch) {
      fetchEmployees();
      setApiFetch(false);
    } else {
      setLoading(false);
    }
  }, [apiFetch, fetchEmployees, setApiFetch]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const currentTime = Date.now();
        const timeDifference = currentTime - lastVisibleTime;

        if (timeDifference > 300000) {
          setApiFetch(true);
          fetchEmployees();
        }

        setLastVisibleTime(currentTime);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchEmployees, setApiFetch, lastVisibleTime]);

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      await fetch(
        `https://664207cf3d66a67b3435e466.mockapi.io/api/v1/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
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
      console.error("Error updating the employee data", error);
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    try {
      await fetch(
        `https://664207cf3d66a67b3435e466.mockapi.io/api/v1/users/${id}`,
        {
          method: "DELETE",
        }
      );

      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.id !== id)
      );
    } catch (error) {
      console.error("Error deleting the employee", error);
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
