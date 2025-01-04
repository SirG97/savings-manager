import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CheckIcon,
  LinkIcon,
  PencilIcon,
} from "@heroicons/react/20/solid";
import { getEmployee } from "../../apis/Employees";
import { toast } from "sonner";
import { getModelType, getModelColor } from "../../utils/helper";
import StatusWithDot from "../../components/badges/StatusWithDot";
import AppLayout from "../../components/layout/AppLayout";

const stats = [
  {
    name: "Balance",
    value: "₦0.00",
    change: "0",
    changeType: "positive",
  },
  {
    name: "Total Deposit",
    value: "₦0.00",
    change: "0",
    changeType: "negative",
  },
  {
    name: "Total Withdrawal",
    value: "₦0.00",
    change: "0",
    changeType: "positive",
  },
  {
    name: "Outstanding Loan",
    value: "₦0.00",
    change: "0",
    changeType: "negative",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Employee() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState([]);
  const [id, setId] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = () => {
    const url = window.location.href;
    const id = url.split("/").pop();
    setIsLoading(true);
    getEmployee(dispatch, id)
      .then((resp) => {
        if (resp?.data?.success) {
          console.log(resp?.data);
          setId(id);
          setCustomer(resp?.data?.data);
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

  return (
    <AppLayout>
      <div className="mb-3 lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-xl/7 font-semibold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {customer?.first_name} {customer?.last_name}
          </h2>
        </div>
        <div className="mt-5 flex lg:ml-4 lg:mt-0">
          <span className="ml-2">
            <button
              type="button"
              
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <CheckIcon aria-hidden="true" className="-ml-0.5 mr-1.5 size-5" />
              Suspend
            </button>
          </span>
        </div>
      </div>
      <dl className="mx-auto my-3 grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8"
          >
            <dt className="text-sm/6 font-medium text-gray-500">{stat.name}</dt>
            <dd
              className={classNames(
                stat.changeType === "negative"
                  ? "text-rose-600"
                  : "text-gray-700",
                "text-xs font-medium",
              )}
            >
              {stat.change}
            </dd>
            <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-6 sm:px-6">
          <h3 className="text-base/7 font-semibold text-gray-900">
            Employee Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
            Personal details.
          </p>
        </div>
        <div className="border-t border-gray-100">
          <dl className="grid grid-cols-1 px-4 sm:grid-cols-2">
            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Full name</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2">
                {customer?.first_name} {customer?.surname}
              </dd>
            </div>
            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">
                Role
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2">
              <StatusWithDot status={getModelColor(customer.model)} text={getModelType(customer.model)}/>
              </dd>
            </div>
            
            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">
                Customer phone
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2">
                {customer?.phone}
              </dd>
            </div>
            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Email</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2">
                {customer?.email ? customer?.email : "-"}
              </dd>
            </div>
            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">
                Branch
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2">
                {customer?.branch ? customer?.branch?.name : "-"}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      
    </AppLayout>
  );
}
