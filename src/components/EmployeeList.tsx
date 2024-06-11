import EmployeeListItem from './EmployeeListItem';
import EmployeeListModel from '../models/EmployeeListModel';

interface ExpenseListProps {
  employeeList: EmployeeListModel[];
  onToggleActive: (id: string, isActive: boolean) => void;
}

const EmployeeList = ({ employeeList, onToggleActive }: ExpenseListProps) => {
  return (
    <div className="p-4 bg-[#0B2447]">
      <h2 className="text-2xl font-bold mb-6">Employee List</h2>
      <ul role="list" className="space-y-4">
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




