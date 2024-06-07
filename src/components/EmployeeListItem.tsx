import { Switch } from '@headlessui/react';

interface EmployeeListItemProps {
  id: string;
  firstName: string;
  lastName: string;
  project: string;
  city: string;
  isActive: boolean;
  onToggleActive: (id: string, isActive: boolean) => void;
}

const EmployeeListItem = ({ id, firstName, lastName, project, city, isActive, onToggleActive }: EmployeeListItemProps) => {
  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">{`${firstName} ${lastName}`}</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{project}</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{city}</p>
        </div>
      </div>
      <div className="flex items-center">
        <Switch
          checked={isActive}
          onChange={() => onToggleActive(id, !isActive)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out ${
            isActive ? 'bg-emerald-500' : 'bg-gray-200'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
              isActive ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </Switch>
      </div>
    </li>
  );
};

export default EmployeeListItem;

