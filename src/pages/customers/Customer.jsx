import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CheckIcon, LinkIcon, PencilIcon } from "@heroicons/react/20/solid";
import { TrophyIcon } from "@heroicons/react/24/outline";
import { getCustomer } from "../../apis/Customers";
import { toast } from "sonner";
import numeral from "numeral";
import AppLayout from "../../components/layout/AppLayout";
import Button from "../../components/buttons/Button";
import CustomerOverview from "./CustomerOverview";
import CustomerDepositList from "./CustomerDepositList";
import CustomerWithdrawalList from "./CustomerWithdrawalList";
import CustomerCommissionList from "./CustomerCommissionList";
import CustomerLoanApplicationList from "./CustomerLoanApplicationList";
import CustomerLoanTransactionList from "./CustomerLoanTransactionList";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const tabs = [
  { name: "Overview", id: "overview", component: CustomerOverview },
  { name: "Deposits", id: "deposit", component: CustomerDepositList },
  { name: "Withdrawals", id: "withdrawal", component: CustomerWithdrawalList },
  { name: "Commissions", id: "commission", component: CustomerCommissionList },
  {
    name: "Loan Applications",
    id: "loan-applications",
    component: CustomerLoanApplicationList,
  },
  {
    name: "Loan Transactions",
    id: "loan",
    component: CustomerLoanTransactionList,
  },
];

export default function Customer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selector = JSON.parse(useSelector((state) => state.auth.userInfo));
  const [customer, setCustomer] = useState([]);
  const [id, setId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const isLoanManager =
    selector?.loan_manager === true ||
    selector?.loan_manager === "1" ||
    selector?.loan_manager === 1;

  useEffect(() => {
    fetchCustomer();
  }, []);

  const fetchCustomer = () => {
    const url = window.location.href;
    const id = url.split("/").pop();
    setIsLoading(true);
    getCustomer(dispatch, id)
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

  const renderTabContent = () => {
    const activeTabObj = tabs.find((tab) => tab.id === activeTab);
    if (activeTabObj && activeTabObj.component) {
      const Component = activeTabObj.component;
      return <Component customer={customer} type={activeTabObj.id} />;
    }
    return <CustomerOverview customer={customer} />;
  };

  return (
    <AppLayout>
      <div className="mb-3 lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-xl/7 font-semibold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {customer?.first_name} {customer?.surname}
          </h2>
        </div>
        <div className="mt-5 flex lg:ml-4 lg:mt-0">
          <span className="sm:block">
            <button
              type="button"
              onClick={() => navigate(`/customer/${id}/edit`)}
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <PencilIcon
                aria-hidden="true"
                className="-ml-0.5 mr-1.5 size-5 text-gray-400"
              />
              Edit Profile
            </button>
          </span>

          <span className="ml-2">
            <button
              type="button"
              onClick={() => navigate(`/customer/${id}/withdraw`)}
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <LinkIcon
                aria-hidden="true"
                className="-ml-0.5 mr-1.5 size-5 text-gray-400"
              />
              Withdraw
            </button>
          </span>
          {/* <span className="ml-3">
            <button
              type="button"
              onClick={() => navigate(`/customer/${id}/commission`)}
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <TrophyIcon
                aria-hidden="true"
                className="-ml-0.5 mr-1.5 size-5 text-gray-400"
              />
              Commission
            </button>
          </span> */}
          {isLoanManager && (
            <span className="ml-2 sm:block">
              <button
                type="button"
                onClick={() => navigate(`/customer/${id}/loan/apply`)}
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <PencilIcon
                  aria-hidden="true"
                  className="-ml-0.5 mr-1.5 size-5 text-gray-400"
                />
                Apply for loan
              </button>
            </span>
          )}
          <span className="ml-2">
            <button
              type="button"
              onClick={() => navigate(`/customer/${id}/deposit`)}
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <CheckIcon aria-hidden="true" className="-ml-0.5 mr-1.5 size-5" />
              Deposit
            </button>
          </span>
        </div>
      </div>
      <div className="inline-flex rounded-md bg-white px-1.5 py-1.5">
        <nav aria-label="Tabs" className="flex space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(tab.id);
              }}
              aria-current={activeTab === tab.id ? "page" : undefined}
              className={classNames(
                activeTab === tab.id
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-500 hover:bg-indigo-50 hover:text-indigo-700",
                "rounded-md px-3 py-2 text-sm font-medium",
              )}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
      {renderTabContent()}
    </AppLayout>
  );
}
