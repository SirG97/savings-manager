import WalletTransactionPagination from "./WalletTransactionPagination";
const people = [
  {
    name: "Lindsay Walton",
    date: "2024-09-05",
    time: "2:27pm",
    type: "Transfer",
    sessionId: "9EA128C",
    amount: "241,984",
    status: "pending",
    debitWallet: "USDT",
    debitWalletAddress: "iUS87SWQASAAjdsh",
    creditWallet: "USDC",
    creditWalletAddress: "asdJhSWiYi2Asas",
    title: "Front-end Developer",
    department: "Optimization",
    email: "lisay.wton@example.com",
    role: "Member",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Lindsay Walton",
    date: "2024-09-05",
    time: "2:27pm",
    type: "Deposit",
    sessionId: "1BC34E",
    amount: "239,586",
    status: "success",
    debitWallet: "USDT",
    debitWalletAddress: "iUS87SWQASAAjdsh",
    creditWallet: "USDC",
    creditWalletAddress: "asdJhSWiYi2Asas",
    title: "Front-end Developer",
    department: "Optimization",
    email: "lindsay.watn@example.com",
    role: "Member",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Lindsay Walton",
    date: "2024-09-05",
    time: "2:27pm",
    type: "Transfer",
    sessionId: "9EA128C",
    amount: "241,984",
    status: "pending",
    debitWallet: "USDT",
    debitWalletAddress: "iUS87SWQASAAjdsh",
    creditWallet: "USDC",
    creditWalletAddress: "asdJhSWiYi2Asas",
    title: "Front-end Developer",
    department: "Optimization",
    email: "lay.wton@example.com",
    role: "Member",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Lindsay Walton",
    date: "2024-09-05",
    time: "2:27pm",
    type: "Deposit",
    sessionId: "1BC34E",
    amount: "239,586",
    status: "success",
    debitWallet: "USDT",
    debitWalletAddress: "iUS87SWQASAAjdsh",
    creditWallet: "USDC",
    creditWalletAddress: "asdJhSWiYi2Asas",
    title: "Front-end Developer",
    department: "Optimization",
    email: "dsay.n@example.com",
    role: "Member",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Lindsay Walton",
    date: "2024-09-05",
    time: "2:27pm",
    type: "Transfer",
    sessionId: "9EA128C",
    amount: "241,984",
    status: "pending",
    debitWallet: "USDT",
    debitWalletAddress: "iUS87SWQASAAjdsh",
    creditWallet: "USDC",
    creditWalletAddress: "asdJhSWiYi2Asas",
    title: "Front-end Developer",
    department: "Optimization",
    email: "lday.wn@example.com",
    role: "Member",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Lindsay Walton",
    date: "2024-09-05",
    time: "2:27pm",
    type: "Deposit",
    sessionId: "1BC34E",
    amount: "239,586",
    status: "success",
    debitWallet: "USDT",
    debitWalletAddress: "iUS87SWQASAAjdsh",
    creditWallet: "USDC",
    creditWalletAddress: "asdJhSWiYi2Asas",
    title: "Front-end Developer",
    department: "Optimization",
    email: "lssy.wtn@example.com",
    role: "Member",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },

  // More people...
];

export default function WalletTransactions() {
  return (
    <div className="mt-4 rounded-xl bg-white shadow-sm">
      <div className="flex justify-between px-4 py-2 sm:items-center sm:px-6 lg:px-4">
        <div className="sm:flex-auto">
          <h1 className="mt-1 text-base font-semibold text-gray-900">
            Recent transactions
          </h1>
        </div>
        <div className="sm:ml-16 sm:mt-4 sm:flex-none">
          <button
            type="button"
            className="block rounded-md border px-3 py-2 text-center text-sm font-normal text-gray-500 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            See all
          </button>
        </div>
      </div>
      <div className="mt-6 flow-root">
        <div className="-my-2 mb-3 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="mr-3 bg-gray-100">
                <tr className="">
                  <th
                    scope="col"
                    className="py-3.5 pl-2 pr-1 text-left text-sm font-semibold text-gray-900 sm:pl-4"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Debited Wallet
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Credited Wallet
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Transaction type
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Session ID
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
                    Status
                  </th>
                  {/* <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Role
                  </th> */}
                  <th
                    scope="col"
                    className="relative py-3.5 pl-3 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white pb-3">
                {people.map((person) => (
                  <tr key={person.email}>
                    <td className="whitespace-nowrap py-5 pl-2 pr-1 text-sm sm:pl-4">
                      <div className="flex items-center">
                        <div className="">
                          <div className="font-medium text-gray-900">
                            {person.date}
                          </div>
                          <div className="mt-1 text-gray-500">
                            {person.time}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <div className="text-gray-900">{person.debitWallet}</div>
                      <div className="mt-1 text-gray-500">
                        {person.debitWalletAddress}
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-5 pl-2 pr-1 text-sm sm:pl-4">
                      <div className="flex items-center">
                        <div className="">
                          <div className="font-medium text-gray-900">
                            {person.creditWallet}
                          </div>
                          <div className="mt-1 text-gray-500">
                            {person.creditWalletAddress}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {person.type}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {person.sessionId}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {person.amount}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <span className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Active
                      </span>
                    </td>

                    <td className="relative whitespace-nowrap py-5 pl-3 pr-2 text-right text-sm font-medium sm:pr-4">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        Edit<span className="sr-only">, {person.name}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <WalletTransactionPagination />
          </div>
        </div>
      </div>
    </div>
  );
}
