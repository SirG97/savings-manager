import { useEffect, useState } from "react";

import { getDashboardData } from "../../apis/Dashboard";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import numeral from "numeral";
import AppLayout from "../../components/layout/AppLayout";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState([]);

  const handleDashboardData = () => {
    getDashboardData(dispatch)
      .then((resp) => {
        if (resp?.data?.success) {
          setDashboardData(resp?.data?.data);
        } else {
          toast.error("An error occurred. Try again!");
        }
      })
      .catch((error) => {
        toast.error("An error occurred. Try again!");
      });
  };

  useEffect(() => {
    handleDashboardData();
  }, []);

  return (
    <AppLayout>
      <div>
        <h3 className="text-base font-semibold text-gray-900">All time</h3>
        <dl className="mx-auto grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
          <div className="m-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 rounded-lg bg-white px-4 py-7 shadow sm:px-4 xl:px-5">
            <dt className="text-sm/6 font-medium text-gray-500">Customers</dt>
            <dd className="text-xs font-medium text-gray-700"></dd>
            <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">
              {dashboardData?.total_users ?? 0}
            </dd>
          </div>
          <div className="m-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 rounded-lg bg-white px-4 py-7 shadow sm:px-4 xl:px-5">
            <dt className="text-sm/6 font-medium text-gray-500">Balance</dt>
            <dd className="text-xs font-medium text-gray-700"></dd>
            <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">
              ₦{numeral(dashboardData?.balance).format("0,0.00") ?? 0.0}
            </dd>
          </div>
          <div className="m-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 rounded-lg bg-white px-4 py-7 shadow sm:px-4 xl:px-5">
            <dt className="text-sm/6 font-medium text-gray-500">
              Total Deposit
            </dt>
            <dd className="text-xs font-medium text-gray-700">
              {dashboardData?.transaction_summary?.deposit?.count ?? 0}
            </dd>
            <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">
              ₦
              {numeral(
                dashboardData?.transaction_summary?.deposit?.total_amount,
              ).format("0,0.00") ?? 0.0}
            </dd>
          </div>
          <div className="m-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 rounded-lg bg-white px-4 py-7 shadow sm:px-4 xl:px-5">
            <dt className="text-sm/6 font-medium text-gray-500">Withdrawals</dt>
            <dd className="text-xs font-medium text-gray-700">
              {dashboardData?.transaction_summary?.withdrawals?.count}
            </dd>
            <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">
              ₦
              {numeral(
                dashboardData?.transaction_summary?.withdrawals?.total_amount,
              ).format("0,0.00") ?? 0.0}
            </dd>
          </div>
        </dl>
      </div>
      <div>
        <dl className="mt-5 grid grid-cols-1 gap-0 sm:grid-cols-3">
          <div className="mx-1 overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">
              Commissions
            </dt>
            <dd className="mt-1 text-3xl/10 font-medium tracking-tight text-gray-900">
              ₦
              {numeral(
                dashboardData?.transaction_summary?.commission?.total_amount,
              ).format("0,0.00") ?? 0.0}
            </dd>
          </div>
          <div className="mx-1 overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">
              Transfers
            </dt>
            <dd className="mt-1 text-3xl/10 font-medium tracking-tight text-gray-900">
              ₦
              {numeral(
                dashboardData?.transaction_summary?.transfer?.total_amount,
              ).format("0,0.00") ?? 0.0}
            </dd>
          </div>
          <div className="mx-1 overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">
              Expenses
            </dt>
            <dd className="mt-1 text-3xl/10 font-medium tracking-tight text-gray-900">
              ₦
              {numeral(
                dashboardData?.transaction_summary?.expenses?.total_amount,
              ).format("0,0.00") ?? 0.0}
            </dd>
          </div>
        </dl>
      </div>
    </AppLayout>
  );
}
