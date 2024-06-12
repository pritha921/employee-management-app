import { Switch } from "@headlessui/react";
import { useNavigate } from 'react-router-dom';

interface EmployeeListItemProps {
  id: string;
  firstName: string;
  lastName: string;
  project: string;
  city: string;
  isActive: boolean;
  onToggleActive: (id: string, isActive: boolean) => void;
}

const EmployeeListItem = ({
  id,
  firstName,
  lastName,
  project,
  city,
  isActive,
  onToggleActive,
}: EmployeeListItemProps) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <li className="relative flex justify-between items-center p-4 bg-[#A5D7E8] shadow rounded-lg mb-4 max-w-3xl mx-auto">
      <div className="flex flex-col space-y-1">
        <p className="text-lg font-semibold text-gray-900">{`${firstName} ${lastName}`}</p>
        <p className="text-sm text-gray-500">{project}</p>
        <p className="text-sm text-gray-500">{city}</p>
      </div>
      <div className="absolute top-0 right-0 m-2">
        <button onClick={handleEditClick} className="text-sm font-medium text-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <Switch
          checked={isActive}
          onChange={() => onToggleActive(id, !isActive)}
          className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-200 ease-in-out ${
            isActive ? "bg-[#0B2447]" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
              isActive ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </Switch>
      </div>
    </li>
  );
};

export default EmployeeListItem;

