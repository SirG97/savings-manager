import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  ArrowRightStartOnRectangleIcon,
  BanknotesIcon,
  UserGroupIcon,
  Square3Stack3DIcon,
  ScaleIcon,
  CreditCardIcon,
  TrophyIcon,
  TicketIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { Toaster } from "sonner";

import { logoutUser } from "../../redux-store/AuthSlice";

const userNavigation = [
  // { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AppLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const selector = JSON.parse(useSelector((state) => state.auth.userInfo))
  const [user, setUser] = useState([]);
  const [navigation, setNavigation] = useState([
    {
      name: "Dashboard",
      href: "/",
      icon: HomeIcon,
      current: true,
    },
    // {
    //   name: "Branches",
    //   href: "/branches",
    //   icon: Square3Stack3DIcon,
    //   current: false,
    // },
    {
      name: "Employees",
      href: "/employees",
      icon: UsersIcon,
      current: false,
    },
    {
      name: "Customers",
      href: "/customers",
      icon: UserGroupIcon,
      current: false,
    },
    {
      name: "Deposits",
      href: "/transactions",
      icon: BanknotesIcon,
      current: false,
    },
    {
      name: "Loan Applications",
      href: "#",
      icon: BanknotesIcon,
      current: false,
      children: [
        { name: "All", href: "/loan-applications" },
        { name: "Pending", href: "/loan-applications/pending" },
        { name: "Approved", href: "/loan-applications/approved" },
        { name: "Rejected", href: "/loan-applications/rejected" },
        { name: "Due", href: "/loan-applications/due" },
        { name: "Overdue", href: "/loan-applications/overdue" },
        { name: "Completed", href: "/loan-applications/completed" },
      ],
    },
    {
      name: "Withdrawals",
      href: "/withdrawals",
      icon: CreditCardIcon,
      current: false,
    },
    {
      name: "Transfers",
      href: "/transfers",
      icon: ScaleIcon,
      current: false,
    },
    {
      name: "Commissions",
      href: "/commissions",
      icon: TrophyIcon,
      current: false,
    },
    {
      name: "Expenses",
      href: "/expenses",
      icon: TicketIcon,
      current: false,
    },
  ]);

  useEffect(() => {
    const updateNavigation = () => {
      const newNavigation = navigation.map((item) => {
        if (item.children) {
          // Update children's current status
          const updatedChildren = item.children.map((child) => ({
            ...child,
            current: child.href === location.pathname,
          }));

          // Set parent's current status based on if any child is current
          const isAnyChildCurrent = updatedChildren.some(
            (child) => child.current,
          );

          return {
            ...item,
            children: updatedChildren,
            current: isAnyChildCurrent,
          };
        }

        // For items without children, update as before
        return {
          ...item,
          current: item.href === location.pathname,
        };
      });

      setNavigation(newNavigation);
    };

    updateNavigation();
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logoutUser());
    navigate("/auth/login");
  };

  if (!localStorage.getItem("loginState")) {
    navigate("/auth/login");
  }

  
console.log(selector)



  return (
    <>
      <Toaster richColors position="top-right" />
      <div>
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=white"
                    className="h-8 w-auto"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            {!item.children ? (
                              <Link
                                to={item.href}
                                className={classNames(
                                  item.current
                                    ? "bg-gray-50"
                                    : "hover:bg-gray-50",
                                  "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700",
                                )}
                              >
                                <item.icon
                                  aria-hidden="true"
                                  className="size-6 shrink-0 text-gray-400"
                                />
                                {item.name}
                              </Link>
                            ) : (
                              <Disclosure as="div">
                                <DisclosureButton
                                  className={classNames(
                                    item.current
                                      ? "bg-gray-50"
                                      : "hover:bg-gray-50",
                                    "group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm/6 font-semibold text-gray-700",
                                  )}
                                >
                                  <item.icon
                                    aria-hidden="true"
                                    className="size-6 shrink-0 text-gray-400"
                                  />
                                  {item.name}
                                  <ChevronRightIcon
                                    aria-hidden="true"
                                    className="ml-auto size-5 shrink-0 text-gray-400 group-data-[open]:rotate-90 group-data-[open]:text-gray-500"
                                  />
                                </DisclosureButton>
                                <DisclosurePanel as="ul" className="mt-1 px-2">
                                  {item.children.map((subItem) => (
                                    <li key={subItem.name}>
                                      {/* 44px */}
                                      <DisclosureButton
                                        as="a"
                                        href={subItem.href}
                                        className={classNames(
                                          subItem.current
                                            ? "bg-gray-50"
                                            : "hover:bg-gray-50",
                                          "block rounded-md py-2 pl-9 pr-2 text-sm/6 text-gray-700",
                                        )}
                                      >
                                        {subItem.name}
                                      </DisclosureButton>
                                    </li>
                                  ))}
                                </DisclosurePanel>
                              </Disclosure>
                            )}
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="-mx-6 mt-auto">
                      <a
                        href="#"
                        className="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        <img
                          alt=""
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          className="size-8 rounded-full bg-gray-50"
                        />
                        <span className="sr-only">Your profile</span>
                        <span aria-hidden="true">Tom Cook</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=white"
                className="h-8 w-auto"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        {!item.children ? (
                          <Link
                            to={item.href}
                            className={classNames(
                              item.current
                                ? "bg-indigo-700 text-white"
                                : "text-indigo-200 hover:bg-indigo-700 hover:text-white",
                              "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold",
                            )}
                          >
                            <item.icon
                              aria-hidden="true"
                              className="size-6 shrink-0 text-gray-400"
                            />
                            {item.name}
                          </Link>
                        ) : (
                          <Disclosure as="div">
                            <DisclosureButton
                              className={classNames(
                                item.current
                                  ? "bg-indigo-700 text-white"
                                  : "text-indigo-200 hover:bg-indigo-700 hover:text-white",
                                "group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm/6 font-semibold text-gray-700",
                              )}
                            >
                              <item.icon
                                aria-hidden="true"
                                className="size-6 shrink-0 text-gray-400"
                              />
                              {item.name}
                              <ChevronRightIcon
                                aria-hidden="true"
                                className="ml-auto size-5 shrink-0 text-gray-400 group-data-[open]:rotate-90 group-data-[open]:text-gray-500"
                              />
                            </DisclosureButton>
                            <DisclosurePanel as="ul" className="mt-1 px-2">
                              {item.children.map((subItem) => (
                                <li key={subItem.name}>
                                  {/* 44px */}
                                  <Link
                                    
                                    to={subItem.href}
                                    className={classNames(
                                      subItem.current
                                        ? "text-indigo-700"
                                        : "text-indigo-200 hover:text-indigo-700",
                                      "block rounded-md py-2 pl-9 pr-2 text-sm/6 text-gray-700",
                                    )}
                                  >
                                    {subItem.name}
                                  </Link>
                                </li>
                              ))}
                            </DisclosurePanel>
                          </Disclosure>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto">
                  <button
                    onClick={handleLogout}
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-indigo-200 hover:text-indigo-700"
                  >
                    <Cog6ToothIcon
                      aria-hidden="true"
                      className="size-6 shrink-0 text-indigo-200 group-hover:text-white"
                    />
                    Sign out
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>

            {/* Separator */}
            <div
              aria-hidden="true"
              className="h-6 w-px bg-gray-900/10 lg:hidden"
            />

            <div className="flex flex-1 justify-end gap-x-4 self-stretch lg:gap-x-6">
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="size-6" />
                </button>

                {/* Separator */}
                <div
                  aria-hidden="true"
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <MenuButton className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="size-8 rounded-full bg-gray-50"
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        aria-hidden="true"
                        className="ml-4 text-sm/6 font-semibold text-gray-900"
                      >
                       {selector?.name}
                      </span>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="ml-2 size-5 text-gray-400"
                      />
                    </span>
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        <a
                          href={item.href}
                          className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                        >
                          {item.name}
                        </a>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>

          <main className="bg-gray-100 py-10">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
