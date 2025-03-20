import { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Modal } from "flowbite-react";
import { getCustomers, getTransactionByType, getCustomerTransactionByTypeAndBranchId } from "../../apis/Customers.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import numeral from "numeral";
import LoadingIcon from "../../components/loaders/LoadingIcon.jsx";
import EmptyState from "../../components/loaders/EmptyState.jsx";
import Pagination from "../../components/pagination/Pagination.jsx";
import StatusWithDot from "../../components/badges/StatusWithDot.jsx";
import { getPaymentMethod } from "../../utils/helper.js";
import { format, startOfYear, endOfYear } from "date-fns";

numeral.defaultFormat("$0,0.00");

export default function CommissionList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selector = JSON.parse(useSelector((state) => state.auth.userInfo))
  const [deposits, setDeposits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const currentDate = new Date();
  const startOfYearDate = format(
    startOfYear(currentDate),
    "yyyy-MM-dd 00:00:00",
  );
  const endOfYearDate = format(endOfYear(currentDate), "yyyy-MM-dd 23:59:59");
  const [value, setValue] = useState({
    startDate: null ?? startOfYearDate,
    endDate: null ?? endOfYearDate,
  });
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
  }, [value,currentPage, paginationData.meta.per_page]);

  const fetchDeposits = (page = 1, perPage = 10) => {
    setIsLoading(true);
    getCustomerTransactionByTypeAndBranchId(dispatch, selector.branch_id, "commission", { page, perPage, value })
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
        <div className=" sm:ml-16 sm:flex-none">
            <div className="z-10 mx-1 flex  filter">
              <div className="mt-3 w-64">
               
                <Datepicker
                  showShortcuts={true}
                  value={value}
                  onChange={(newValue) => {
                    const currentDate = new Date();
                    // Get the start of the year with time set to 00:00:00
                    const startOfYearDate = format(
                      startOfYear(currentDate),
                      "yyyy-MM-dd 00:00:00",
                    );
                    // Get the end of the year with time set to 23:59:59
                    const todaysDate = format(
                      currentDate,
                      "yyyy-MM-dd 23:59:59",
                    );

                    if (newValue?.startDate !== null) {
                      newValue.startDate = format(
                        new Date(newValue.startDate),
                        "yyyy-MM-dd 00:00:00",
                      );
                      newValue.endDate = format(
                        new Date(newValue.endDate),
                        "yyyy-MM-dd 23:59:59",
                      );
                    } else {
                      newValue.startDate = startOfYearDate;
                      newValue.endDate = todaysDate;
                    }

                    setValue(newValue);
                  }}
                />
              </div>
            </div>
          </div>
        {/*<div className="mt-4 sm:ml-16 sm:flex-none">
           <button
            type="button"
            onClick={() => navigate("/customers/new")}
            className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon aria-hidden="true" className="-ml-0.5 size-5" />
            Add Customer
          </button> 
        </div>*/}
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
                    Deducted from
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Deducted by
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
                           onClick={() => {
                            setDetails(deposit);
                            setOpenModal(true);
                          }}
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
                    Withdrawal Details
                  </h3>
                </div>
                <div className="mt-6 border-t border-gray-100">
                  <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm/6 font-medium text-gray-900">
                        Customer name
                      </dt>
                      <dd className="mt-1 text-right text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {details?.customer?.surname}{" "}
                        {details?.customer?.first_name}
                      </dd>
                    </div>
                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm/6 font-medium text-gray-900">
                        Reference
                      </dt>
                      <dd className="mt-1 text-right text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {details?.reference}
                      </dd>
                    </div>
                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm/6 font-medium text-gray-900">
                        Amount
                      </dt>
                      <dd className="mt-1 text-right text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        ₦{numeral(details?.amount).format("0,0.00")}
                      </dd>
                    </div>


                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm/6 font-medium text-gray-900">
                        Payment method
                      </dt>
                      <dd className="mt-1 text-right text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <StatusWithDot
                          status={getPaymentMethod(details?.payment_method)}
                          text={details?.payment_method}
                        />
                      </dd>
                    </div>
                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm/6 font-medium text-gray-900">
                        Processed by
                      </dt>
                      <dd className="mt-1 text-right text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {details?.user?.name}
                      </dd>
                    </div>

                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm/6 font-medium text-gray-900">
                        Description
                      </dt>
                      <dd className="mt-1 text-right text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {details?.description}
                      </dd>
                    </div>


                    {details?.created_at && (
                      <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">
                          Date 
                        </dt>
                        <dd className="mt-1 text-right text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {format(details?.created_at, "yyyy-MM-dd hh:mm a")}
                        </dd>
                      </div>
                    )}
                    {details?.rejected_at && (
                      <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">
                          Date rejected
                        </dt>
                        <dd className="mt-1 text-right text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {format(details?.approved_at, "yyyy-MM-dd hh:mm a")}
                        </dd>
                      </div>
                    )}
                    {details?.rejection_reason && (
                      <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">
                          Rejection reason
                        </dt>
                        <dd className="mt-1 text-right text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {details?.rejection_reason}
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
