import { useEffect, useState } from "react";
import { Modal } from "flowbite-react";
import { useLocation, Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import {
  getCustomers,
  getTransactionByType,
  getTransactionByTypeAndBranchId,
} from "../../apis/Customers.js";

import { getLoanApplicationsByUserId, getLoanApplicationsByCustomerId } from "../../apis/Loan.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import numeral from "numeral";
import LoadingIcon from "../../components/loaders/LoadingIcon.jsx";
import EmptyState from "../../components/loaders/EmptyState.jsx";
import Pagination from "../../components/pagination/Pagination.jsx";
import StatusWithDot from "../../components/badges/StatusWithDot.jsx";
import { getModelColor, getPaymentMethod } from "../../utils/helper.js";

numeral.defaultFormat("$0,0.00");

export default function CustomerLoanApplicationList({customer}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);

  const selector = JSON.parse(useSelector((state) => state.auth.userInfo));
  const [loanApplications, setLoanApplications] = useState([]);
  const [loanApplication, setLoanApplication] = useState(null);
  const [deposits, setDeposits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [status, setStatus] = useState(null);
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
    const pathSegments = location.pathname.split("/");
    const loanStatus = pathSegments.pop() || pathSegments.pop();
    let status = null;
    if (
      loanStatus === "pending" ||
      loanStatus === "approved" ||
      loanStatus === "rejected" ||
      loanStatus === "due" ||
      loanStatus === "overdue" ||
      loanStatus === "paid" ||
      loanStatus === "completed"
    ) {
      status = loanStatus;
    } else {
      status = null;
    }
    fetchLoanApplications(status, currentPage, paginationData.meta.per_page);
  }, [currentPage, paginationData.meta.per_page, location]);

  const fetchLoanApplications = (status, page = 1, perPage = 10) => {
    setIsLoading(true);
    getLoanApplicationsByCustomerId(dispatch, customer.id, status,{
      page,
      perPage,
    })
      .then((resp) => {
        if (resp?.data?.success) {
          setLoanApplications(resp?.data?.data?.data);
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

  function onCloseModal() {
    setOpenModal(false);
    setLoanApplication(null);
  }

  return (
    <div className="mt-4 rounded-xl bg-white shadow-sm">
      <Toaster position="top-right" richColors />
      <div className="flex justify-between px-4 py-2 sm:items-center sm:px-6 lg:px-4">
        <div className="sm:flex-auto">
          <h1 className="mt-4 text-base font-semibold text-gray-900">
            Loan Applications
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
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Interest
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Duration
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Payback Amount
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Amount remaining
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>

                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Date
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
              ) : loanApplications.length > 0 ? (
                <tbody className="divide-y divide-gray-200 bg-white pb-3">
                  {loanApplications.map((loanApplication) => (
                    <tr key={loanApplication.id}>
                    
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        ₦{numeral(loanApplication?.amount).format("0,0.00")}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        ₦
                        {numeral(loanApplication?.interest_amount).format(
                          "0,0.00",
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {loanApplication?.duration}{" "}
                        {loanApplication?.duration == "1" ? "month" : "months"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        ₦
                        {numeral(loanApplication?.total_amount).format(
                          "0,0.00",
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        ₦
                        {numeral(loanApplication?.total_payable_amount).format(
                          "0,0.00",
                        )}
                      </td>

                      <td className="whitespace-nowrap px-3 py-5 text-center text-sm text-gray-500">
                        <StatusWithDot
                          status={getModelColor(loanApplication.status)}
                          text={loanApplication.status}
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {format(
                          loanApplication?.created_at,
                          "yyyy-MM-dd hh:mm a",
                        )}
                      </td>
                      <td className="relative whitespace-nowrap py-5 pl-3 pr-2 text-center text-sm font-medium sm:pr-4">
                        <button
                          onClick={() => {
                            setLoanApplication(loanApplication);
                            setOpenModal(true);
                          }}
                          className="cursor-pointer text-indigo-600 hover:text-indigo-900"
                        >
                          Details
                          <span className="sr-only">
                            ,{loanApplication?.id}
                          </span>
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
                        text={"No Loans applications yet"}
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
        <Modal
          show={openModal}
          size="lg"
          popup
          onClose={() => setOpenModal(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <div>
              <div className="px-4 sm:px-0">
                <h3 className="text-center text-base/7 font-semibold text-gray-900">
                  Loan Details
                </h3>
              </div>
              <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">
                      Customer name
                    </dt>
                    <dd className="mt-1 text-right text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {loanApplication?.customer?.surname}{" "}
                      {loanApplication?.customer?.first_name}
                    </dd>
                  </div>
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">
                      Amount
                    </dt>
                    <dd className="mt-1 text-right text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      ₦{numeral(loanApplication?.amount).format("0,0.00")}
                    </dd>
                  </div>

                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">
                      Interest Amount
                    </dt>
                    <dd className="mt-1 text-right text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      ₦
                      {numeral(loanApplication?.interest_amount).format(
                        "0,0.00",
                      )}
                    </dd>
                  </div>
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">
                      Amount to payback
                    </dt>
                    <dd className="mt-1 text-right text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      ₦{numeral(loanApplication?.total_amount).format("0,0.00")}
                    </dd>
                  </div>
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">
                      Duration
                    </dt>
                    <dd className="mt-1 text-right text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {loanApplication?.duration}
                      {loanApplication?.duration == "1" ? "month" : "months"}
                    </dd>
                  </div>
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">
                      Status
                    </dt>
                    <dd className="mt-1 text-right text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <StatusWithDot
                        status={getModelColor(loanApplication?.status)}
                        text={loanApplication?.status}
                      />
                    </dd>
                  </div>
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">
                      Applied by
                    </dt>
                    <dd className="mt-1 text-right text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {loanApplication?.user?.name}
                    </dd>
                  </div>
                  {loanApplication?.approved_at && (
                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm/6 font-medium text-gray-900">
                        Date applied
                      </dt>
                      <dd className="mt-1 text-right text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {format(
                          loanApplication?.created_at,
                          "yyyy-MM-dd hh:mm a",
                        )}
                      </dd>
                    </div>
                  )}
                  {loanApplication?.approved_at && (
                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm/6 font-medium text-gray-900">
                        Date approved
                      </dt>
                      <dd className="mt-1 text-right text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {format(
                          loanApplication?.approved_at,
                          "yyyy-MM-dd hh:mm a",
                        )}
                      </dd>
                    </div>
                  )}
                  {loanApplication?.rejected_at && (
                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm/6 font-medium text-gray-900">
                        Date rejected
                      </dt>
                      <dd className="mt-1 text-right text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {format(
                          loanApplication?.approved_at,
                          "yyyy-MM-dd hh:mm a",
                        )}
                      </dd>
                    </div>
                  )}
                  {loanApplication?.rejection_reason && (
                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm/6 font-medium text-gray-900">
                        Rejection reason
                      </dt>
                      <dd className="mt-1 text-right text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {loanApplication?.rejection_reason}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

