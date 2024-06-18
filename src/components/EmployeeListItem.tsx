import { useState } from "react";
import { Switch } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";

interface EmployeeListItemProps {
  id: string;
  firstName: string;
  lastName: string;
  project: string;
  city: string;
  isActive: boolean;
  onToggleActive: (id: string, isActive: boolean) => void;
  onDelete: (id: string) => void;
}

const EmployeeListItem = ({
  id,
  firstName,
  lastName,
  project,
  city,
  isActive,
  onToggleActive,
  onDelete,
}: EmployeeListItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/edit/${id}`);
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    onDelete(id);
    setIsModalOpen(false);
  };

  return (
    <li className="relative flex justify-between items-center p-4 bg-[#A5D7E8] shadow rounded-lg mb-4 max-w-3xl mx-auto">
      <div className="flex flex-col space-y-1">
        <p className="text-lg font-semibold text-gray-900">{`${firstName} ${lastName}`}</p>
        <p className="text-sm text-gray-500">{project}</p>
        <p className="text-sm text-gray-500">{city}</p>
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex flex-col items-center space-y-2">
          <Switch
            checked={isActive}
            onChange={() => onToggleActive(id, !isActive)}
            className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-200 ease-in-out ${
              isActive ? "bg-[#0B2447]" : "bg-[#C80036]"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                isActive ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </Switch>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <button
            onClick={handleEditClick}
            className="text-sm font-medium text-gray-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </button>
          <button
            onClick={handleDeleteClick}
            className="text-sm font-medium text-[#C80036]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
            </svg>
          </button>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this employee?"
      />
    </li>
  );
};

export default EmployeeListItem;

