

import numeral from "numeral";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CustomerOverview({ customer }) {
  return (
    <>
      <div className="customer-overview">
        <dl className="mx-auto my-3 grid grid-cols-1 gap-px space-x-2 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 rounded-xl bg-white px-4 py-7 sm:px-6 xl:px-8">
            <dt className="text-sm/6 font-medium text-gray-500">Balance</dt>
            {/* <dd className="text-xs font-medium text-gray-700">0</dd> */}
            <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">
              ₦{numeral(customer?.customer_wallet?.balance).format("0,0.00")}
            </dd>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 rounded-xl bg-white px-4 py-7 sm:px-6 xl:px-8">
            <dt className="text-sm/6 font-medium text-gray-500">
              Total Deposit
            </dt>
            {/* <dd className="text-xs font-medium text-gray-700">0</dd> */}
            <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">
              ₦{numeral(customer?.total_deposit).format("0,0.00")}
            </dd>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 rounded-xl bg-white px-4 py-7 sm:px-6 xl:px-8">
            <dt className="text-sm/6 font-medium text-gray-500">
              Total Withdrawal
            </dt>
            {/* <dd className="text-xs font-medium text-gray-700">0</dd> */}
            <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">
              ₦{numeral(customer?.total_withdrawal).format("0,0.00")}
            </dd>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 rounded-xl bg-white px-4 py-7 sm:px-6 xl:px-8">
            <dt className="text-sm/6 font-medium text-gray-500">
              Outstanding loan
            </dt>
            {/* <dd className="text-xs font-medium text-gray-700">0</dd> */}
            <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">
              ₦{numeral(customer?.customer_wallet?.loan).format("0,0.00")}
            </dd>
          </div>
        </dl>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          {/* Left side - 8/12 on medium and larger screens */}
          <div className="rounded-lg bg-blue-500  text-white md:col-span-8">
            <div className="overflow-hidden h-full bg-white  sm:rounded-lg">
              <div className="px-4 py-5 sm:px-4">
                <h3 className="text-base/3 font-semibold text-gray-900">
                  Customer Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
                  Personal details and application.
                </p>
              </div>
              <div className="border-t border-gray-100">
                <dl className="grid grid-cols-1 px-4 sm:grid-cols-3">
                  <div className="border-t border-gray-100 px-4 py-2 sm:col-span-1 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">
                      Full name
                    </dt>
                    <dd className="text-sm/2 text-gray-700 sm:mt-2">
                      {customer?.first_name} {customer?.surname}
                    </dd>
                  </div>
                  <div className="border-t border-gray-100 px-4 py-2 sm:col-span-1 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">
                      Account ID
                    </dt>
                    <dd className="text-sm/2 mt-1 text-gray-700">
                      {customer?.account_id}
                    </dd>
                  </div>
                  <div className="border-t border-gray-100 px-4 py-2 sm:col-span-1 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">
                      Managed by
                    </dt>
                    <dd className="text-sm/2 mt-1 text-gray-700">
                      {customer?.user?.name}
                    </dd>
                  </div>
                  <div className="border-t border-gray-100 px-4 py-2 sm:col-span-1 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">
                      Customer phone
                    </dt>
                    <dd className="text-sm/2 mt-1 text-gray-700 sm:mt-2">
                      {customer?.phone}
                    </dd>
                  </div>
                  <div className="border-t border-gray-100 px-4 py-2 sm:col-span-1 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">
                      Email
                    </dt>
                    <dd className="text-sm/2 mt-1 text-gray-700 sm:mt-2">
                      {customer?.email ? customer?.email : "-"}
                    </dd>
                  </div>
                  <div className="border-t border-gray-100 px-4 py-2 sm:col-span-1 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">
                      Date of birth
                    </dt>
                    <dd className="text-sm/2 mt-1 text-gray-700">
                      {customer?.dob ? customer?.dob : "-"}
                    </dd>
                  </div>
                  <div className="border-t border-gray-100 px-4 py-2 sm:col-span-1 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">Sex</dt>
                    <dd className="text-sm/2 mt-1 text-gray-700">
                      {customer?.sex}
                    </dd>
                  </div>
                  <div className="border-t border-gray-100 px-4 py-2 sm:col-span-2 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">
                      Resident address
                    </dt>
                    <dd className="text-sm/2 mt-1 text-gray-700">
                      {customer?.resident_address}
                    </dd>
                  </div>
                  <div className="border-t border-gray-100 px-4 py-2 sm:col-span-1 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">
                      Resident LGA
                    </dt>
                    <dd className="text-sm/2 mt-1 text-gray-700">
                      {customer?.resident_lga}
                    </dd>
                  </div>
                  <div className="border-t border-gray-100 px-4 py-2 sm:col-span-1 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">
                      Resident State
                    </dt>
                    <dd className="text-sm/2 mt-1 text-gray-700">
                      {customer?.resident_state}
                    </dd>
                  </div>
                  <div className="border-t border-gray-100 px-4 py-2 sm:col-span-1 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">
                      Occupations
                    </dt>
                    <dd className="text-sm/2 mt-1 text-gray-700">
                      {customer?.occupation}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* Right side - 4/12 on medium and larger screens */}
          <div className="rounded-lg  text-white md:col-span-4">
            <div className=" overflow-hidden bg-white  sm:rounded-lg">
              <div className="px-4 py-6 sm:px-6">
                <h3 className="text-base/7 font-semibold text-gray-900">
                  Bank Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
                  Customer's bank Information
                </p>
              </div>
              <div className="border-t border-gray-100">
                <dl className="grid grid-cols-1 px-4 sm:grid-cols-1">
                  <div className="border-t border-gray-100 px-4 py-4 sm:col-span-1 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">
                      Bank name
                    </dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2">
                      {customer?.bank_name ? customer?.bank_name : "-"}
                    </dd>
                  </div>
                  <div className="border-t border-gray-100 px-4 py-4 sm:col-span-1 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">
                      Account number
                    </dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2">
                      {customer?.account_number
                        ? customer?.account_number
                        : "-"}
                    </dd>
                  </div>
                  <div className="border-t border-gray-100 px-4 py-4 sm:col-span-1 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">
                      Account name
                    </dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2">
                      {customer?.account_name ? customer?.account_name : "-"}
                    </dd>
                  </div>
                  <div className="border-t border-gray-100 px-4 py-4 sm:col-span-1 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">
                      Daily savings amount
                    </dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2">
                      {customer?.daily_amount ? customer?.daily_amount : "-"}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
