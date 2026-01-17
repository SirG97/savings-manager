import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import CreateEmployee from "./modals/CreateEmployee";
import { getEmployees } from "../../apis/Employees";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import numeral from "numeral";
import LoadingIcon from "../../components/loaders/LoadingIcon";
import EmptyState from "../../components/loaders/EmptyState";
import StatusWithDot from "../../components/badges/StatusWithDot";
import Status from "../../components/badges/Status";
import { getModelType, getModelColor } from "../../utils/helper";

numeral.defaultFormat("$0,0.00");

export default function EmployeesList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selector = JSON.parse(useSelector((state) => state.auth.userInfo));
  const [openBranchModal, setOpenBranchModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isLoanManager =
    selector?.loan_manager === true ||
    selector?.loan_manager === "1" ||
    selector?.loan_manager === 1;

  useEffect(() => {
    fetchLatestEmployees();
  }, []);

  const fetchLatestEmployees = () => {
    setIsLoading(true);
    getEmployees(dispatch)
      .then((resp) => {
        if (resp?.data?.success) {
          setEmployees(resp?.data?.data);
          setIsLoading(false);
        } else {
          toast.error("An error occurred. Try again!");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("An error occurred. Try again!");
      });
  };

  return (
    <div className="mt-4 rounded-xl bg-white shadow-sm">
      <div className="flex justify-between px-4 py-2 sm:items-center sm:px-6 lg:px-4">
        <div className="sm:flex-auto">
          <h1 className="mt-1 text-base font-semibold text-gray-900">
            Employees
          </h1>
        </div>
        <div className="sm:ml-16 sm:mt-4 sm:flex-none">
          {!isLoanManager && (
            <button
              type="button"
              onClick={() => setOpenBranchModal(true)}
              className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PlusIcon aria-hidden="true" className="-ml-0.5 size-5" />
              Add Employee
            </button>
          )}
        </div>
      </div>
      <div className="mt-6 flow-root">
        <div className="-my-2 mb-3 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="mr-3 bg-gray-100">
                <tr className="">
                  <th
                    scope="col"
                    className="py-3.5 pl-2 pr-1 text-left text-sm font-semibold text-gray-900 sm:pl-4"
                  >
                    Name
                  </th>

                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    User type
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Phone
                  </th>

                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>

                  <th
                    scope="col"
                    className="relative py-3.5 pl-3 pr-4 text-center text-sm font-semibold text-gray-900 sm:pr-0"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              {isLoading ? (
                <tbody>
                  <tr>
                    <td colSpan="7">
                      <LoadingIcon />
                    </td>
                  </tr>
                </tbody>
              ) : employees.length > 0 ? (
                <tbody className="divide-y divide-gray-200 bg-white pb-3">
                  {employees.map((employee) => (
                    <tr key={employee.id}>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {employee?.name}
                      </td>

                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <StatusWithDot
                          status={getModelColor(employee.model)}
                          text={getModelType(employee.model)}
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {employee?.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {employee?.phone}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <Status
                          text={
                            employee.suspended_at !== null
                              ? "suspended"
                              : "active"
                          }
                          status={
                            employee.suspended_at !== null ? "error" : "success"
                          }
                        />
                      </td>

                      <td className="relative whitespace-nowrap py-5 pl-3 pr-2 text-center text-sm font-medium sm:pr-4">
                        <button
                          onClick={() => navigate(`/employee/${employee.id}`)}
                          className="cursor-pointer text-indigo-600 hover:text-indigo-900"
                        >
                          Details
                          <span className="sr-only">,{employee?.name}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan="7">
                      <EmptyState
                        text={"No Employees yet. Create new branch"}
                      />
                    </td>
                  </tr>
                </tbody>
              )}
            </table>

            <CreateEmployee
              active={openBranchModal}
              onClose={() => setOpenBranchModal(false)}
              onCreated={fetchLatestEmployees}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
