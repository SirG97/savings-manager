import { useState, useCallback } from "react";
import { Button, Modal } from "flowbite-react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import {TextInput} from "../../../components/inputs/TextInput";
// import SelectInput from "../../../components/inputs/SelectInput";
import TextInputDropdown from "../../../components/inputs/TextInputDropdown";

export default function FundWallet({ active, onClose }) {
  const [firstStep, setFirstStep] = useState(true);
  function onCloseModal() {
    setFirstStep(true);
    onClose();
  }
  const handleCurrencyChange = useCallback((selectedCurrency) => {}, []);

  return (
    <>
      <Modal show={active} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-3">
            {firstStep === true && (
              <div>
                <h3 className="text-xl font-medium text-center text-gray-900 dark:text-white">
                  Comfirm Wallet Funding
                </h3>
                <div className="">
                  <TextInputDropdown
                    label="Amount"
                    customSelectProps={{
                      selectOptions: [
                        {
                          code: "USD",
                          name: "UAE Dirham",
                          symbol: "",
                        },
                        {
                          code: "AFN",
                          name: "Afghani",
                          symbol: "؋",
                        },
                        {
                          code: "ALL",
                          name: "Lek Lek",
                          symbol: "Lek",
                        },
                        {
                          code: "AMD",
                          name: "Armenian Dram",
                          symbol: "",
                        },
                        {
                          code: "ANG",
                          name: "Netherlands Antillian Guilder",
                          symbol: "ƒ",
                        },
                      ],
                      selectValue: "",
                      nameProp: (data) => `${data.code}`,
                      valueProp: `code`,
                      onChange: handleCurrencyChange,
                    }}
                  />
                </div>

                <div>
                  <TextInput label="Payment Reference" />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm/6 font-medium text-gray-500">
                    Upload POP
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <PhotoIcon
                        aria-hidden="true"
                        className="mx-auto size-12 text-gray-300"
                      />
                      <div className="mt-4 flex text-sm/6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs/5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full my-3">
                  <Button
                    onClick={() => {
                      setFirstStep(false);
                    }}
                    className="w-full bg-primary hover:bg-indigo-500">
                    Fund Wallet
                  </Button>
                </div>
                <div className="flex justify-center -mt text-xs font-normal text-gray-500 dark:text-gray-300">
                  <span>No reference number? </span>{" "}
                  <button className="text-indigo-500">
                    {" "}
                    Inititate deposit
                  </button>
                </div>
              </div>
            )}
            {!firstStep && (
              <div>
                <h3 className="text-xl font-medium text-center text-gray-900 dark:text-white">
                  Comfirm Wallet Funding
                </h3>
                <div className="flex flex-col w-full ">
                  <dl className="space-y-2 mb-5 divide-gray-100">
                    <div className="px-4 py-3 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                      <dt className="text-sm/6  sm:col-span-2  text-gray-900">
                        Amount
                      </dt>
                      <dd className="mt-1 text-sm/6 font-medium text-gray-700 sm:col-span-2 sm:mt-0">
                        $120,000
                      </dd>
                    </div>
                    <div className="px-4 py-3 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                      <dt className="text-sm/6  sm:col-span-2 text-gray-900">
                        Transaction Type
                      </dt>
                      <dd className="mt-1 text-sm/6 font-medium text-gray-700 sm:col-span-2 sm:mt-0">
                        Fund Wallet
                      </dd>
                    </div>
                    <div className="px-4 py-3 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                      <dt className="text-sm/6 sm:col-span-2 text-gray-900">
                        Recipient
                      </dt>
                      <dd className="mt-1 text-sm/6 font-medium text-gray-700 sm:col-span-2 sm:mt-0">
                        J. Mark / UBA
                      </dd>
                    </div>
                    <div className="px-4 py-3 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                      <dt className="text-sm/6 sm:col-span-2 text-gray-900">
                        Transaction ID
                      </dt>
                      <dd className="mt-1 text-sm/6 font-medium text-gray-700 sm:col-span-2 sm:mt-0">
                        JD9U23NK421HS
                      </dd>
                    </div>
                  </dl>
                  <div className="flex flex-row space-x-3 border-t mt-3 pt-3">
                    <Button
                      onClick={() => {
                        setFirstStep(true);
                      }}
                      className="w-full bg-gray-200 text-gray-900 hover:bg-gray-400">
                      Go back
                    </Button>
                    <Button
                      onClick={() => {
                        setFirstStep(true);
                      }}
                      className="w-full bg-primary hover:bg-indigo-500">
                      Confirm
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
