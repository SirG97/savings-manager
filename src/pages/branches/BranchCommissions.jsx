import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { getCustomers, getTransactionByTypeAndBranchId } from "../../apis/Customers.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster, toast } from "sonner";
import numeral from "numeral";
import LoadingIcon from "../../components/loaders/LoadingIcon.jsx";
import EmptyState from "../../components/loaders/EmptyState.jsx";
import Pagination from "../../components/pagination/Pagination.jsx";
import StatusWithDot from "../../components/badges/StatusWithDot.jsx";
import { getPaymentMethod } from "../../utils/helper.js";

numeral.defaultFormat("$0,0.00");

export default function BranchCommissions({branchId}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deposits, setDeposits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState({
    links: [],
    meta: {
      current_page: 1,
      from: 1,
      last_page: 1,
      per_page: 10,
      to: 1,
      total: 0,
    },
  });

  // Fetch customers whenever currentPage or per_page changes
  useEffect(() => {
    fetchDeposits(currentPage, paginationData.meta.per_page);
  }, [currentPage, paginationData.meta.per_page]);

  const fetchDeposits = (page = 1, perPage = 10) => {
    setIsLoading(true);
    getTransactionByTypeAndBranchId(dispatch, branchId, "commission", { page, perPage })
      .then((resp) => {
        if (resp?.data?.success) {
          console.log(resp?.data?.data?.data);
          setDeposits(resp?.data?.data?.data);
          setPaginationData({
            links: resp.data?.data?.links,
            meta: {
              ...paginationData.meta,
              current_page: resp?.data?.data.current_page,
              from: resp?.data?.data.from,
              last_page: resp?.data?.data.last_page,
              per_page: resp?.data?.data.per_page,
              to: resp?.data?.data.to,
              total: resp?.data?.data.total,
            },
          });
          setIsLoading(false);
        } else {
          toast.error("An error occurred. Try again!");
        }
      })
      .catch(() => {
        setIsLoading(false);
        toast.error("An error occurred. Try again!");
      });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPaginationData((prev) => ({
      ...prev,
      meta: {
        ...prev.meta,
        per_page: newPageSize,
        current_page: 1, // Reset to the first page
      },
    }));
  };

  return (
    <div className="mt-4 rounded-xl bg-white shadow-sm">
      <Toaster position="top-right" richColors />
      <div className="flex justify-between px-4 py-2 sm:items-center sm:px-6 lg:px-4">
        <div className="sm:flex-auto">
          <h1 className="mt-4 text-base font-semibold text-gray-900">
            Commission History
          </h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:flex-none">
          {/* <button
            type="button"
            onClick={() => navigate("/customers/new")}
            className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon aria-hidden="true" className="-ml-0.5 size-5" />
            Add Customer
          </button> */}
        </div>
      </div>
      <div className="mt-6 flow-root">
        <div className="-my-2 mb-1 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="mr-3 bg-gray-100">
                <tr className="">
                  <th
                    scope="col"
                    className="py-3.5 pl-2 pr-1 text-left text-sm font-semibold text-gray-900 sm:pl-4"
                  >
                    Reference
                  </th>

                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Deposited for
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Deposited by
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Branch
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Payment method
                  </th>

                  {/* <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th> */}

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
              ) : deposits.length > 0 ? (
                <tbody className="divide-y divide-gray-200 bg-white pb-3">
                  {deposits.map((deposit) => (
                    <tr key={deposit.id}>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {deposit?.reference}
                      </td>

                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        ₦{numeral(deposit?.amount).format("0,0.00")}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {deposit?.customer?.surname}{" "}
                        {deposit?.customer?.first_name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {deposit?.user?.name ? deposit?.user?.name : "-"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {deposit?.branch?.name ? deposit?.branch?.name : "-"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <StatusWithDot
                          status={getPaymentMethod(deposit.payment_method)}
                          text={deposit.payment_method}
                        />
                      </td>

                      <td className="relative whitespace-nowrap py-5 pl-3 pr-2 text-center text-sm font-medium sm:pr-4">
                        <button
                          onClick={() => navigate(`/deposit/${deposit.id}`)}
                          className="cursor-pointer text-indigo-600 hover:text-indigo-900"
                        >
                          Details
                          <span className="sr-only">,{deposit?.reference}</span>
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
                        text={"No commission earned yet"}
                      />
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
        <Pagination
          paginationData={paginationData}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </div>
  );
}
