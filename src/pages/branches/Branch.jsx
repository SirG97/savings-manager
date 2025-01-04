import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster, toast } from "sonner";
import AppLayout from "../../components/layout/AppLayout";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { getCustomer } from "../../apis/Customers";
import { getBranch } from "../../apis/Branches";
import BranchOverview from "./BranchOverview";
import BranchCustomers from "./BranchCustomers";
import BranchDeposits from "./BranchDeposits";
import BranchWithdrawals from "./BranchWithdrawals";
import BranchCommissions from "./BranchCommissions";
import BranchExpenses from "./BranchExpenses";
import BranchTransfers from "./BranchTransfers";

const tabs = [
  { name: "Overview", href: "#overview", current: true },
  { name: "Customers", href: "#customers", current: false },
  { name: "Deposits", href: "#deposits", current: false },
  { name: "Withdrawals", href: "#withdrawals", current: false },
  { name: "Commissions", href: "#commissions", current: false },
  { name: "Expenses", href: "#expenses", current: false },
  { name: "Transfers", href: "#transfers", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Branch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState();
  const [branch, setBranch] = useState();

  useEffect(() => {
    fetchBranch();
  }, []);

  const fetchBranch = () => {
    const url = window.location.href;
    const id = url.split("/").pop();
    setIsLoading(true);
    getBranch(dispatch, id)
      .then((resp) => {
        if (resp?.data?.success) {
          console.log(resp?.data);
          setId(id);
          setBranch(resp?.data?.data);
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

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    // Update the tabs array to reflect the change
    tabs.forEach((t) => (t.current = t.name === tab.name));
  };

  const renderContent = () => {
    switch (currentTab.name.toLowerCase()) {
      case "overview":
        return <BranchOverview branchId={id} />;
      case "customers":
        return <BranchCustomers branchId={id} />;
      case "deposits":
        return <BranchDeposits branchId={id} />;
      case "withdrawals":
        return <BranchWithdrawals branchId={id} />;
      case "commissions":
        return <BranchCommissions branchId={id} />;
      case "expenses":
        return <BranchExpenses branchId={id} />;
      case "transfers":
        return <BranchTransfers branchId={id} />;
      default:
        return <BranchOverview branchId={id} />;
    }
  };

  return (
    <AppLayout>
      <main className="">
        <div className="mb-4">
          <h1 className="pb-1 text-2xl font-semibold">{branch?.name} branch</h1>
          <h1 className="text-md pb-4">{branch?.address}</h1>
          <div className="overflow-x-auto">
            <nav aria-label="Tabs" className="flex space-x-4">
              {tabs.map((tab) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTabChange(tab);
                  }}
                  aria-current={tab.current ? "page" : undefined}
                  className={classNames(
                    tab.current
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-500 hover:text-gray-700",
                    "rounded-md px-3 py-2 text-sm font-medium",
                  )}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
        {renderContent()}
      </main>
    </AppLayout>
  );
}
