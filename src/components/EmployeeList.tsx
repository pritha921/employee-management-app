import EmployeeListItem from './EmployeeListItem'
import EmployeeListModel from '../models/EmployeeListModel'

interface ExpenseListProps{
    employeeList:EmployeeListModel[]
  }
const EmployeeList = ({employeeList}:ExpenseListProps) => {
    return (
        <div>
    
          <h2>Expense List</h2>
          {employeeList.map((employee)=>(
                 <EmployeeListItem
                 key={employee.id}
                 firstName={employee.firstName}
                 lastName={employee.lastName}
                 project={employee.project}
               />
          ))}
        </div>
      )
}

export default EmployeeList
