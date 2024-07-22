import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import useApiFetch from "../hooks/apiFetchHook";

interface FormData {
  firstName: string;
  lastName: string;
  city: string;
  project: string;
  isActive: string;
}

interface EmployeeFormProps {
  mode: "add" | "edit";
}

const EmployeeForm = ({ mode }: EmployeeFormProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      city: "",
      project: "",
      isActive: "Yes",
    },
  });
  const { setApiFetch } = useApiFetch();

  useEffect(() => {
    if (mode === "edit" && id) {
      const fetchEmployee = async () => {
        try {
          const response = await fetch(
            `https://664207cf3d66a67b3435e466.mockapi.io/api/v1/users/${id}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setValue("firstName", data.firstName);
          setValue("lastName", data.lastName);
          setValue("city", data.city);
          setValue("project", data.project);
          setValue("isActive", data.isActive ? "Yes" : "No");
        } catch (error) {
          console.error("Error fetching the employee data", error);
        }
      };
      fetchEmployee();
    }
  }, [mode, id, setValue]);



  const onSubmit = async (formData: FormData) => {
    

    const url =
      mode === "add"
        ? "https://664207cf3d66a67b3435e466.mockapi.io/api/v1/users"
        : `https://664207cf3d66a67b3435e466.mockapi.io/api/v1/users/${id}`;
    const method = mode === "add" ? "POST" : "PUT";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          isActive: formData.isActive === "Yes",
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setApiFetch(true); 
      navigate("/");
    } catch (error) {
    
        console.error("Error saving the employee data", error);
  
    }
  };

  const handleCancel = () => {
    
    setApiFetch(false);
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0B2447]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 bg-[#A5D7E8] shadow rounded-lg w-full max-w-lg mt-10"
      >
        <h2 className="text-lg font-semibold leading-7 text-gray-900 mb-6 text-center">
          {mode === "add" ? "Add New Employee" : "Edit Employee"}
        </h2>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              First name
            </label>
            <input
              type="text"
              id="firstName"
              {...register("firstName", { required: "First name is required" })}
              autoComplete="given-name"
              className={`mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                errors.firstName ? "ring-red-500" : "ring-gray-300"
              } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                errors.firstName
                  ? "focus:ring-red-500"
                  : "focus:ring-indigo-600"
              } sm:text-sm sm:leading-6`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              {...register("lastName")}
              autoComplete="family-name"
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              {...register("city", { required: "City is required" })}
              autoComplete="address-level2"
              className={`mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                errors.city ? "ring-red-500" : "ring-gray-300"
              } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                errors.city ? "focus:ring-red-500" : "focus:ring-indigo-600"
              } sm:text-sm sm:leading-6`}
            />
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="project"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Project
            </label>
            <input
              type="text"
              id="project"
              {...register("project", { required: "Project is required" })}
              autoComplete="project-name"
              className={`mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                errors.project ? "ring-red-500" : "ring-gray-300"
              } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                errors.project ? "focus:ring-red-500" : "focus:ring-indigo-600"
              } sm:text-sm sm:leading-6`}
            />
            {errors.project && (
              <p className="text-red-500 text-xs mt-1">
                {errors.project.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="isActive"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Active Status
            </label>
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <select
                  id="isActive"
                  {...field}
                  className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
              )}
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={handleCancel}
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

export default EmployeeForm;
