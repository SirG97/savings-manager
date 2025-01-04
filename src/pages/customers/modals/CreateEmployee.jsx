import { Modal } from "flowbite-react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useDispatch, } from "react-redux";
import { TextInput } from "../../../components/inputs/TextInput";
import { useForm } from "react-hook-form";
import { createEmployee } from "../../../apis/Employees";
import { getBranches } from "../../../apis/Branches";
import { Toaster, toast } from "sonner";
import Select from "../../../components/inputs/Select";
const schema = yup
  .object({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("First name is required"),
    email: yup.string().email().required(),
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(/^\d+$/, "Phone number must only contain digits")
      .length(11, "Phone number must be exactly 11 digits"),
    model: yup
      .string()
      // .matches(/(admin|marketer)/,"")
      .required("user type is required"),
      branch_id: yup
      .string()
      .required("Branch is required"),
  })
  .required();

export default function CreateEmployee({ active, onClose, onCreated }) {
  const dispatch = useDispatch();
  const [branches, setBranches] = useState([]);
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onCloseModal() {
    onClose();
  }
  useEffect(() => {
    fetchBranches();
  }, []);
  const handleCreateEmployee = (data) => {
    createEmployee(dispatch, data).then((resp) => {
      if (resp.data?.success) {
        console.log(data);
        reset({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          model: "",
        });
        onClose(); // Close the modal
        onCreated();
        toast.success(resp?.data.message);
      } else {
        toast.error(resp.response.data.message);
      }
    });
  };
  const fetchBranches = () => {
    getBranches(dispatch)
      .then((resp) => {
        if (resp?.data?.success) {
          setBranches(resp?.data?.data);
          console.log(resp?.data?.data);
        } else {
          toast.error("An error occurred. Could not get branches. Try again!");
        }
      })
      .catch((error) => {
        toast.error("An error occurred. Try again!");
        console.error("Error fetching branches:", error);
      });
  };

  return (
    <>
      <Toaster />
      <Modal show={active} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-3">
            <form onSubmit={handleSubmit(handleCreateEmployee)}>
              <div className="">
                <h3 className="mb-3 pb-4 text-center text-xl font-medium text-gray-900 dark:text-white">
                  Create new employee
                </h3>
                <div className="">
                  <Select
                    options={branches}
                    valueProp="id"
                    nameProp={(data) => data.name}
                    register={register}
                    errors={errors.branch_id}
                    name="branch_id"
                    label="Branch"
                  />
                </div>
                <div className="">
                  <TextInput
                    label="First Name"
                    name="first_name"
                    errors={errors.first_name}
                    register={register}
                    required
                  />
                </div>
                <div className="">
                  <TextInput
                    label="Last Name"
                    name="last_name"
                    errors={errors.last_name}
                    register={register}
                    required
                  />
                </div>
                <div className="">
                  <TextInput
                    label="Email"
                    name="email"
                    register={register}
                    errors={errors.email}
                    required
                  />
                </div>
                <div className="">
                  <TextInput
                    label="Phone"
                    name="phone"
                    errors={errors.phone}
                    register={register}
                    required
                  />
                </div>
                <div className="">
                  <Select
                    options={[
                      { value: "admin", label: "Admin" },
                      { value: "marketer", label: "Marketer" },
                      { value: "auditor", label: "Auditor" },
                    ]}
                    valueProp="value"
                    nameProp={(data) => data.label}
                    register={register}
                    errors={errors.model}
                    name="model"
                    label="User type"
                  />
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
