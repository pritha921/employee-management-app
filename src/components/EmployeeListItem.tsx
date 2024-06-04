interface EmployeeListItemProps{
    firstName:string,
    lastName:string,
    project:string
}

const ExpenseItem = ({firstName, lastName, project}:EmployeeListItemProps) => {
  return (
    <div>
        <p>First Name:{firstName}</p>
        <p>Last Name:{lastName}</p>
        <p>Project:{project}</p>

    </div>
  )
}

export default ExpenseItem
