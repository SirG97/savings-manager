import { Modal } from "flowbite-react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useDispatch } from "react-redux";
import { TextInput } from "../../../components/inputs/TextInput";
import { useForm } from "react-hook-form";
import { createBranch } from "../../../apis/Branches";
import { Toaster, toast } from "sonner";


const schema = yup
  .object({
    name: yup.string().required(),
    address: yup.string().required(),
  })
  .required();

export default function CreateBranch({ active, onClose, onBranchCreated }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(schema);

  function onCloseModal() {
    onClose();
  }

  const handleCreateBranch = (data) => {
    createBranch(dispatch, data).then((resp) => {
      if (resp.data?.success) {
        console.log(data);
        reset({
          name: '',
          address: ''
        })
        onClose(); // Close the modal
        onBranchCreated();
        toast.success(resp?.data.message);
      } else {
        // toast.error(resp.response.data.message);
      }
    });
  };

  return (
    <>
      <Toaster />
      <Modal show={active} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-3">
            <form onSubmit={handleSubmit(handleCreateBranch)}>
              <div className="">
                <h3 className="mb-3 pb-4 text-center text-xl font-medium text-gray-900 dark:text-white">
                  Create new branch
                </h3>
                <div className="">
                  <TextInput
                    label="Name"
                    name="name"
                    errors={errors.name}
                    rules={{ required: "Name is required" }}
                    register={register}
                    required
                  />
                  {/* {errors.name && (
                    <p role="alert" className="text-red-500">
                      {errors.name.message}
                    </p>
                  )} */}
                </div>
                <div className="pb-1">
                  <TextInput
                    label="Address"
                    name="address"
                    rules={{ required: "Address is required" }}
                    register={register}
                    errors={errors.address}
                    required
                  />
                  {/* {errors.name && (
                    <p role="alert" className="text-red-500">
                      {errors.name.message}
                    </p>
                  )} */}
                </div>

                <div className="w-full">
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-primary px-4 py-2.5 text-white hover:bg-indigo-500"
                  >
                    Create
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
