import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    city: '',
    project: '',
    isActive: 'Yes',
  });

  const [errors, setErrors] = useState({
    firstName: false,
    city: false,
    project: false,
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`https://664207cf3d66a67b3435e466.mockapi.io/api/v1/users/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFormData({
          firstName: data.firstName,
          lastName: data.lastName,
          city: data.city,
          project: data.project,
          isActive: data.isActive ? 'Yes' : 'No',
        });
      } catch (error) {
        console.error('Error fetching the employee data', error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      firstName: !formData.firstName,
      city: !formData.city,
      project: !formData.project,
    };

    setErrors(newErrors);

    if (!newErrors.firstName && !newErrors.city && !newErrors.project) {
      try {
        const response = await fetch(`https://664207cf3d66a67b3435e466.mockapi.io/api/v1/users/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            city: formData.city,
            project: formData.project,
            isActive: formData.isActive === 'Yes',
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        navigate('/');
      } catch (error) {
        console.error('Error updating the employee data', error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0B2447]">
      <form onSubmit={handleSubmit} className="p-6 bg-[#A5D7E8] shadow rounded-lg w-full max-w-lg mt-10">
        <h2 className="text-lg font-semibold leading-7 text-gray-900 mb-6 text-center">Edit Employee</h2>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
              First name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              autoComplete="given-name"
              className={`mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                errors.firstName ? 'ring-red-500' : 'ring-gray-300'
              } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                errors.firstName ? 'focus:ring-red-500' : 'focus:ring-indigo-600'
              } sm:text-sm sm:leading-6`}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">First name is required</p>}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
              Last name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              autoComplete="family-name"
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              value={formData.city}
              onChange={handleChange}
              autoComplete="address-level2"
              className={`mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                errors.city ? 'ring-red-500' : 'ring-gray-300'
              } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                errors.city ? 'focus:ring-red-500' : 'focus:ring-indigo-600'
              } sm:text-sm sm:leading-6`}
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">City is required</p>}
          </div>

          <div>
            <label htmlFor="project" className="block text-sm font-medium leading-6 text-gray-900">
              Project
            </label>
            <input
              type="text"
              name="project"
              id="project"
              value={formData.project}
              onChange={handleChange}
              autoComplete="project-name"
              className={`mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                errors.project ? 'ring-red-500' : 'ring-gray-300'
              } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                errors.project ? 'focus:ring-red-500' : 'focus:ring-indigo-600'
              } sm:text-sm sm:leading-6`}
            />
            {errors.project && <p className="text-red-500 text-xs mt-1">Project is required</p>}
          </div>

          <div>
            <label htmlFor="isActive" className="block text-sm font-medium leading-6 text-gray-900">
              Active Status
            </label>
            <select
              id="isActive"
              name="isActive"
              value={formData.isActive}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-[#0B2447] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
