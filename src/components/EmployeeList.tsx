import EmployeeListItem from './EmployeeListItem';
import EmployeeListModel from '../models/EmployeeListModel';

interface ExpenseListProps {
  employeeList: EmployeeListModel[];
  onToggleActive: (id: string, isActive: boolean) => void;
}

const EmployeeList = ({ employeeList, onToggleActive }: ExpenseListProps) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Employee List</h2>
      <ul role="list" className="divide-y divide-gray-100">
        {employeeList.map((employee) => (
          <EmployeeListItem
            key={employee.id}
            id={employee.id}
            firstName={employee.firstName}
            lastName={employee.lastName}
            project={employee.project}
            city={employee.city}
            isActive={employee.isActive}
            onToggleActive={onToggleActive}
          />
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;



