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
    <li className="flex justify-between items-center p-4 bg-[#A5D7E8] shadow rounded-lg mb-4 max-w-3xl mx-auto">
      <div className="flex flex-col space-y-1">
        <p className="text-lg font-semibold text-gray-900">{`${firstName} ${lastName}`}</p>
        <p className="text-sm text-gray-500">{project}</p>
        <p className="text-sm text-gray-500">{city}</p>
      </div>
      <div className="flex items-center ml-4">
        <Switch
          checked={isActive}
          onChange={() => onToggleActive(id, !isActive)}
          className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-200 ease-in-out ${
            isActive ? 'bg-[#0B2447]' : 'bg-gray-300'
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
