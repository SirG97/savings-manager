import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { getCustomers, searchCustomers } from "../../apis/Customers.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { debounce } from "lodash";
import numeral from "numeral";
import LoadingIcon from "../../components/loaders/LoadingIcon";
import EmptyState from "../../components/loaders/EmptyState";
import Pagination from "../../components/pagination/Pagination.jsx";

numeral.defaultFormat("$0,0.00");

export default function CustomersList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selector = JSON.parse(useSelector((state) => state.auth.userInfo))
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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
    
    fetchCustomers(currentPage, paginationData.meta.per_page);
  }, [currentPage, paginationData.meta.per_page]);

  const debouncedSearch = debounce((query) => {
    if (query) {
      setIsLoading(true);
      searchCustomers(dispatch, query)
        .then((resp) => {
          if (resp?.data?.success) {
            console.log(resp?.data.data)
            setCustomers(resp?.data?.data);
         
            setIsLoading(false);
          } else {
            setIsLoading(false);
            toast.error("An error occurred. Try again!");
          }
        })
        .catch(() => {
          setIsLoading(false);
          toast.error("An error occurred. Try again!");
        });
    } else {
      fetchCustomers(1, paginationData.meta.per_page);
    }
  }, 500);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, []);

  const fetchCustomers = (page = 1, perPage = 10) => {
    setIsLoading(true);
    getCustomers(dispatch, selector.branch_id, { page, perPage })
      .then((resp) => {
        if (resp?.data?.success) {
          setCustomers(resp?.data?.data?.data);
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
      <div className="flex">
          <div className="sm:flex">
            <h1 className="mr-2 mt-5 text-base font-semibold text-gray-900">
              Customers
            </h1>
          </div>
          <div className="mt-4">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  aria-hidden="true"
                  className="size-5 text-gray-400"
                />
              </div>
              <input
                id="search"
                name="search"
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  debouncedSearch(e.target.value);
                }}
                className="block w-full rounded-lg border-0 bg-white py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
        </div>
        <div className="sm:ml-16 mt-4 sm:flex-none">
          <button
            type="button"
            onClick={() => navigate("/customers/new")}
            className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon aria-hidden="true" className="-ml-0.5 size-5" />
            Add Customer
          </button>
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
                    Name
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
                    Owner
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Account ID
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
                    Balance
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
              ) : customers.length > 0 ? (
                <tbody className="divide-y divide-gray-200 bg-white pb-3">
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {customer?.surname} {customer?.first_name}
                      </td>

                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {customer?.branch?.name ? customer?.branch?.name : "-"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {customer?.user?.name ? customer?.user?.name : "-"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {customer?.account_id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {customer?.phone}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        ₦
                        {numeral(customer?.customer_wallet?.balance).format(
                          "0,0.00",
                        )}
                      </td>

                      <td className="relative whitespace-nowrap py-5 pl-3 pr-2 text-center text-sm font-medium sm:pr-4">
                        <button
                          onClick={() => navigate(`/customer/${customer.id}`)}
                          className="cursor-pointer text-indigo-600 hover:text-indigo-900"
                        >
                          Details
                          <span className="sr-only">
                            ,{customer?.surname} {customer?.first_name}
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
                        text={"No customers yet. Create new customer"}
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
