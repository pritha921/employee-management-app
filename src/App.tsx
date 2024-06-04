import  { useState, useEffect } from 'react';


type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  project: string;
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
   <h1 className="text-3xl font-bold underline">
    Employee List
    </h1>
      <ul>
        {employees.map(employee => (
          <li key={employee.id}>
            <strong>First Name:</strong> {employee.firstName} <br />
            <strong>Last Name:</strong> {employee.lastName} <br />
            <strong>Project:</strong> {employee.project}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

