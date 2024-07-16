// import { useState, useEffect } from "react";

// import EmployeeList from "./EmployeeList";
// import EmployeeListModel from "../models/EmployeeListModel";
// import Loader from "./Loader";

// const HomePage = () => {
//   const [employees, setEmployees] = useState<EmployeeListModel[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [apiFetch, setApiFetch] = useState<boolean>(true);

//   useEffect(() => {
//     if (apiFetch) {
//       const fetchEmployees = async () => {
//         try {
//           const response = await fetch(
//             "https://664207cf3d66a67b3435e466.mockapi.io/api/v1/users"
//           );
//           if (!response.ok) {
//             throw new Error("Network response was not ok");
//           }
//           const data: EmployeeListModel[] = await response.json();
//           setEmployees(data);
//           setLoading(false);
//           setApiFetch(false);
//         } catch (error) {
//           console.error("Error fetching the employees data", error);
//           setLoading(false);
//           setApiFetch(false);
//         }
//       };

//       fetchEmployees();
//     }
//   }, [apiFetch]);

//   const handleToggleActive = async (id: string, isActive: boolean) => {
//     try {
//       await fetch(
//         `https://664207cf3d66a67b3435e466.mockapi.io/api/v1/users/${id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ isActive }),
//         }
//       );

//       setEmployees((prevEmployees) =>
//         prevEmployees.map((employee) =>
//           employee.id === id ? { ...employee, isActive } : employee
//         )
//       );
//     } catch (error) {
//       console.error("Error updating the employee data", error);
//     }
//   };

//   const handleDeleteEmployee = async (id: string) => {
//     try {
//       await fetch(
//         `https://664207cf3d66a67b3435e466.mockapi.io/api/v1/users/${id}`,
//         {
//           method: "DELETE",
//         }
//       );

//       setEmployees((prevEmployees) =>
//         prevEmployees.filter((employee) => employee.id !== id)
//       );
//     } catch (error) {
//       console.error("Error deleting the employee", error);
//     }
//   };

//   return (
//     <div>
//       {loading ? (
//         <Loader />
//       ) : (
//         <EmployeeList
//           employeeList={employees}
//           onToggleActive={handleToggleActive}
//           onDelete={handleDeleteEmployee}
//         />
//       )}
//     </div>
//   );
// };

// export default HomePage;


import { useEffect, useState } from "react";
import EmployeeList from "./EmployeeList";
import EmployeeListModel from "../models/EmployeeListModel";
import Loader from "./Loader";
import { useApiFetch } from "../models/ApiFetchContext";

const HomePage = () => {
  const [employees, setEmployees] = useState<EmployeeListModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { apiFetch, setApiFetch } = useApiFetch();

  useEffect(() => {
    if (apiFetch) {
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
          setApiFetch(false); // Reset apiFetch to false after data is fetched
        } catch (error) {
          console.error("Error fetching the employees data", error);
          setLoading(false);
          setApiFetch(false); // Reset apiFetch to false in case of error
        }
      };

      fetchEmployees();
    }
  }, [apiFetch, setApiFetch]);

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
