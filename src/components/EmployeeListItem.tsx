interface EmployeeListItemProps {
  firstName: string;
  lastName: string;
  project: string;
  city: string;
  isActive: boolean
}

const EmployeeListItem = ({ firstName, lastName, project, city, isActive }: EmployeeListItemProps) => {
  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">{`${firstName} ${lastName}`}</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{project}</p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 text-gray-900">{city}</p>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 text-gray-900">{isActive}</p>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{isActive}</p>
            {isActive ? (
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Inactive
              </p>
            ) : (
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-xs leading-5 text-gray-500">Active</p>
              </div>
            )}
          </div>
  
    </li>
  );
};

export default EmployeeListItem;
