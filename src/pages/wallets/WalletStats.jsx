import { useState } from "react";
import { EyeIcon } from "@heroicons/react/24/outline";
// import { EyeSlashIcon } from "@heroicons/react/24/outline";
import FundWallet from "./modals/FundWallet";
import Withdraw from "./modals/Withdraw";
import tether from "../../assets/icons/tether.svg";
import tether2 from "../../assets/icons/tether.svg";
const stats = [
  {
    name: "Total assets",
    value: "$405,091.00",
    change: "+4.75%",
    changeType: "positive",
  },
  {
    name: "USD",
    flag: "https://sika-static-assests.s3.amazonaws.com/flags/US.png",
    value: "$12,787.00",
    change: "+54.02%",
    changeType: "negative",
  },
  {
    name: "USDT(ETH)",
    flag: tether,
    value: "$245,988.00",
    change: "-1.39%",
    changeType: "positive",
  },
  {
    name: "USDT(TRC)",
    flag: tether2,
    value: "$30,156.00",
    change: "+10.18%",
    changeType: "negative",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function WalletStats() {
  const [openFundModal, setOpenFundModal] = useState(false);
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);

  return (
    <dl className=" -mx-1 grid grid-cols-1 gap-px  sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 rounded-xl bg-white shadow-sm m-1 px-4 py-4 sm:px-2 xl:px-4">
          <dt className="flex text-sm/6 font-medium text-primary">
            {stat.name !== 'Total assets' && (<img src={stat.flag} className="size-4 m-1" alt="" />)}
            
            {stat.name}
          </dt>
          <dd className={classNames("text-gray-700", "text-xs font-medium")}>
            <EyeIcon className="size-4 cursor-pointer" />
          </dd>
          <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">
            {stat.value}
          </dd>
          {stat.name === "Total assets" && (
            <>
              <div className="text-sm">Balance</div>
            </>
          )}
          {stat.name !== "Total assets" && (
            <>
              <div className="mt-2 flex">
                <button
                  type="button"
                  onClick={() => setOpenFundModal(true)}
                  className=" inline-flex items-center rounded-md bg-primary px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                  Fund
                </button>
                <button
                  type="button"
                  onClick={() => setOpenWithdrawModal(true)}
                  className="ml-3 inline-flex items-center rounded-md bg-gray-200 px-3 py-1 text-sm font-semibold text-black/50 shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                  Withdraw
                </button>
              </div>
            </>
          )}
        </div>
      ))}
      <FundWallet
        active={openFundModal}
        onClose={() => setOpenFundModal(false)}
      />

      <Withdraw
        active={openWithdrawModal}
        onClose={() => setOpenWithdrawModal(false)}
      />
    </dl>
  );
}
