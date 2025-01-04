import { Button, Modal} from "flowbite-react";
import {TextInput} from "../../../components/inputs/TextInput";
import SelectInput from "../../../components/inputs/SelectInput";

export default function CreateWallet({ active, onClose }) {

  function onCloseModal() {
    onClose();
  }

  return (
    <>
      <Modal show={active} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-3">
            <h3 className="text-xl mb-3 pb-4 font-medium text-center text-gray-900 dark:text-white">
              Create Wallet
            </h3>
            <div className="pb-1 ">
              <SelectInput label="Wallet Type" />
            </div>
            <div className="pb-1">
              <SelectInput label="Currency" />
            </div>

            <div className="pb-1">
              <TextInput label="Set Password" />
            </div>

            <div className="w-full">
              <Button className="w-full bg-primary hover:bg-indigo-500">
                Create
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
