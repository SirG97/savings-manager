import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";

import CreateBranch from "./modals/CreateBranch";
import { getBranches } from "../../apis/Branches";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster, toast } from "sonner";
import numeral from "numeral";
import LoadingIcon from "../../components/loaders/LoadingIcon";
import EmptyState from "../../components/loaders/EmptyState";

numeral.defaultFormat("$0,0.00");

export default function BranchesList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openBranchModal, setOpenBranchModal] = useState(false);
  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchLatestBranches();
  }, []);

  const fetchLatestBranches = () => {
    setIsLoading(true);
    getBranches(dispatch)
      .then((resp) => {
        if (resp?.data?.success) {
          setBranches(resp?.data?.data);
          setIsLoading(false);
        } else {
          toast.error("An error occurred. Try again!");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("An error occurred. Try again!");
        console.error("Error fetching branches:", error);
      });
  };

  return (
    <div className="mt-4 rounded-xl bg-white shadow-sm">
      <Toaster position="top-right"  richColors/>
      <div className="flex justify-between px-4 py-2 sm:items-center sm:px-6 lg:px-4">
        <div className="sm:flex-auto">
          <h1 className="mt-1 text-base font-semibold text-gray-900">
            Branches
          </h1>
        </div>
        <div className="sm:ml-16 sm:mt-4 sm:flex-none">
          <button
            type="button"
            onClick={() => setOpenBranchModal(true)}
            className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon aria-hidden="true" className="-ml-0.5 size-5" />
            Add Branch
          </button>
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
                    Address
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Balance
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Cash
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Bank
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
              ) : branches.length > 0 ? (
                <tbody className="divide-y divide-gray-200 bg-white pb-3">
                  {branches.map((branch) => (
                    <tr key={branch.name}>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {branch.name}
                      </td>

                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {branch.address}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        ₦{numeral(branch.wallet.balance).format("0,0.00")}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        ₦{numeral(branch.wallet.cash).format("0,0.00")}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        ₦{numeral(branch.wallet.bank).format("0,0.00")}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <span className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          Active
                        </span>
                      </td>

                      <td className="relative whitespace-nowrap py-5 pl-3 pr-2 text-center text-sm font-medium sm:pr-4">
                        <button
                          onClick={() => navigate(`/branches/${branch.id}`)}
                          className="cursor-pointer text-indigo-600 hover:text-indigo-900"
                        >
                          Details<span className="sr-only">,{branch.name}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan="7">
                      <EmptyState text={"No branches yet. Create new branch"} />
                    </td>
                  </tr>
                </tbody>
              )}
            </table>

            <CreateBranch
              active={openBranchModal}
              onClose={() => setOpenBranchModal(false)}
              onBranchCreated={fetchLatestBranches}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
