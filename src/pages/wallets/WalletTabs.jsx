import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import SendMoney from "./modals/SendMoney";
import { useState } from "react";
import CreateWallet from "./modals/CreateWallet";

const tabs = [
  { name: "Send Money", slug: "send_money", href: "#", current: false },
  { name: "Create Wallet", slug: "create_wallet", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function WalletTabs() {
  const [openSendMoneyModal, setOpenSendMoneyModal] = useState(false);
  const [openCreateWalletModal, setOpenCreateWalletModal] = useState(false);

  const handleTabClick = (slug) => {
    if (slug === "send_money") {
      setOpenSendMoneyModal(true);
    } else if (slug === "create_wallet") {
      setOpenCreateWalletModal(true);
    }
  };
  return (
    <>
      <div>
        <div className="flex justify-between bg-white mb-4 py-3 px-3 rounded-xl shadow-sm">
          <div className="w-full max-w-lg lg:max-w-xs">
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
                className="block w-full rounded-lg border-0 bg-white py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <nav aria-label="Tabs" className="flex space-x-4">
            {tabs.map((tab) => (
              <a
                key={tab.slug}
                onClick={() => handleTabClick(tab.slug)}
                href={tab.href}
                aria-current={tab.current ? "page" : undefined}
                className={classNames(
                  tab.current
                    ? "bg-primary text-white"
                    : "text-gray-500 hover:text-gray-700",
                  "rounded-full  px-4 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm ring-1 ring-inset ring-primary hover:text-white hover:bg-primary"
                )}>
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
        <SendMoney
          active={openSendMoneyModal}
          onClose={() => setOpenSendMoneyModal(false)}
        />
        <CreateWallet
          active={openCreateWalletModal}
          onClose={() => setOpenCreateWalletModal(false)}
        />
      </div>
    </>
  );
}
