import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import {TextInput} from "../../../components/inputs/TextInput";
import SelectInput from "../../../components/inputs/SelectInput";

export default function Withdraw({ active, onClose }) {
  const [firstStep, setFirstStep] = useState(true);
  function onCloseModal() {
    setFirstStep(true);
    onClose();
  }

  return (
    <>
      <Modal show={active} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-3">
            {firstStep && (
              <div className="">
                <h3 className="text-xl mb-3 pb-4 font-medium text-center text-gray-900 dark:text-white">
                  Withdraw
                </h3>
                <div className="pb-1">
                  <TextInput label="Amount" />
                </div>
                <div className="pb-1">
                  <TextInput label="Account Number" />
                </div>
                <div className="pb-1">
                  <TextInput label="Account Name" />
                </div>
                <div className="pb-1 ">
                  <SelectInput label="Select bank" />
                </div>

                <div className="w-full">
                  <Button
                    onClick={() => {
                      setFirstStep(false);
                    }}
                    className="w-full bg-primary hover:bg-indigo-500">
                    Withdraw
                  </Button>
                </div>
              </div>
            )}
            {!firstStep && (
              <div>
                <h3 className="text-xl mb-3 pb-4 font-medium text-center text-gray-900 dark:text-white">
                  Confirm Withdrawal
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
