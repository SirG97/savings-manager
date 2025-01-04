import { useCallback } from "react";
import { Button, Modal } from "flowbite-react";
import {TextInput} from "../../../components/inputs/TextInput";
import SelectInput from "../../../components/inputs/SelectInput";
import TextInputDropdown from "../../../components/inputs/TextInputDropdown";
import updown from '../../../assets/icons/updown.svg'
export default function SendMoney({ active, onClose }) {

  function onCloseModal() {
    onClose();
  }
  const handleCurrencyChange = useCallback((selectedCurrency) => {}, []);

  return (
    <>
      <Modal show={active} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-3">
            <h3 className="text-xl font-medium text-center text-gray-900 dark:text-white">
              Send Money
            </h3>
            <div className="my-1">
              <SelectInput label="Recipient" />
            </div>
            <div className="">
              <TextInputDropdown
                label="Send"
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
            <div className="w-full flex justify-center">
              <div className=""><img src={updown} className="p-2 px-3 rounded-md bg-gray-200" alt="" /></div>
            </div>
            <div className="">
              <TextInputDropdown
                label="Recieve"
                customSelectProps={{
                  selectOptions: [
                    {
                      code: "USDT(TRC20)",
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
              <TextInput label="Payment Purpose" />
            </div>

            <div className="flex justify-center -mt text-xs font-normal text-gray-500 dark:text-gray-300">
              Quote update in 3s
            </div>
            <div className="w-full">
              <Button className="w-full bg-primary hover:bg-indigo-500">
                Continue
              </Button>
            </div>

          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
