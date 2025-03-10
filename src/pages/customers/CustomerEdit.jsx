import { useState, useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch} from "react-redux";
import { TextInput } from "../../components/inputs/TextInput";
import {
  getCustomer,
  updateCustomer,
} from "../../apis/Customers";
import { getEmployees } from "../../apis/Employees";
import { getBranches } from "../../apis/Branches";
import { Toaster, toast } from "sonner";
import Select from "../../components/inputs/Select";
import AppLayout from "../../components/layout/AppLayout";
import ButtonLoader from "../../components/loaders/ButtonLoader";

const schema = yup
  .object({
    // branch_id: yup.string().required("Branch is required"),
    first_name: yup.string().required("First name is required"),
    surname: yup.string().required("Surname/Last name is required"),
    middle_name: yup.string(),
    email: yup.string().email(),
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(/^\d+$/, "Phone number must only contain digits")
      .length(11, "Phone number must be exactly 11 digits"),
    dob: yup.string(),
    resident_address: yup.string(),
    resident_state: yup.string(),
    resident_lga: yup.string(),
    occupation: yup.string(),
  })
  .required();

export default function CustomerEdit() {
  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const [branches, setBranches] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id: id,
      // branch_id: "",
      first_name: "",
      surname: "",
      middle_name: "",
      email: "",
      phone: "",
      dob: "",
      resident_address: "",
      resident_state: "",
      resident_lga: "",
      occupation: "",
      sex: "",
    },
  });

  useEffect(() => {
    const path = window.location.pathname;
    const segments = path.split("/");
    const id = segments[2];

    fetchBranches();
    fetchLatestEmployees();
    fetchCustomer(id);
  }, []);

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

  const fetchLatestEmployees = () => {
    setIsLoading(true);
    getEmployees(dispatch)
      .then((resp) => {
        if (resp?.data?.success) {
          setEmployees(resp?.data?.data);
          setIsLoading(false);
        } else {
          toast.error("An error occurred. Try again!");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("An error occurred. Try again!");
        console.error("Error fetching Employees:", error);
      });
  };

  const fetchCustomer = (id) => {
    setIsLoading(true);
    getCustomer(dispatch, id)
      .then((resp) => {
        if (resp?.data?.success) {
          setId(id);
          console.log(id);
          const customerData = resp?.data?.data;
          // Prepopulate form fields
          reset({
            // branch_id: customerData.branch_id || "",
            user_id: customerData.user_id || "",
            first_name: customerData.first_name || "",
            surname: customerData.surname || "",
            middle_name: customerData.middle_name || "",
            email: customerData.email || "",
            phone: customerData.phone || "",
            dob: customerData.dob || "",
            resident_address: customerData.resident_address || "",
            resident_state: customerData.resident_state || "",
            resident_lga: customerData.resident_lga || "",
            occupation: customerData.occupation || "",
            sex: customerData.sex || "",
          });
          setIsLoading(false);
        } else {
          toast.error("An error occurred. Try again!");
        }
      })
      .catch(() => {
        setIsLoading(false);
        toast.error("An error occurred. Try again!");
      });
  };

  const handleUpdateCustomer = (data) => {
    data.id = id;
    console.log(" id", data);
    updateCustomer(dispatch, data).then((resp) => {
      if (resp.data?.success) {
        getCustomer(dispatch, id)
          .then((resp) => {
            if (resp?.data?.success) {
              const customerData = resp?.data?.data;
              // Prepopulate form fields
              console.log(customerData);
              reset({
                // branch_id: customerData.branch_id || "",
                user_id: customerData.user_id || "",
                first_name: customerData.first_name || "",
                surname: customerData.surname || "",
                middle_name: customerData.middle_name || "",
                email: customerData.email || "",
                phone: customerData.phone || "",
                dob: customerData.dob || "",
                resident_address: customerData.resident_address || "",
                resident_state: customerData.resident_state || "",
                resident_lga: customerData.resident_lga || "",
                occupation: customerData.occupation || "",
                sex: customerData.sex || "",
              });
              setIsLoading(false);
            } else {
              toast.error(
                "An error occurred and the update failed. Try again!",
              );
            }
          })
          .catch(() => {
            setIsLoading(false);
            toast.error("An error occurred. Try again!");
          });

        toast.success(resp?.data.message);
      } else {
        toast.error(resp.response.data.message);
      }
    });
  };

  return (
    <AppLayout>
      <div className="space-y-10 divide-y divide-gray-900/10">
        <Toaster position="top-right" richColors />
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base/7 font-semibold text-gray-900">
              Edit Customer Information
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              Fill in customer details. All fields marked asterisk(*) are
              required
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleUpdateCustomer)}
            className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
          >
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-6">
                {/* <div className="sm:col-span-3">
                  <Select
                    options={branches}
                    required={true}
                    valueProp="id"
                    nameProp={(data) => data.name}
                    register={register}
                    errors={errors.branch_id}
                    name="branch_id"
                    label="Branch"
                  />
                </div> */}
                <div className="sm:col-span-6">
                  <Select
                    options={employees}
                    required={true}
                    valueProp="id"
                    nameProp={(data) => {
                      return `${data.name} - ${data.branch ? data.branch?.name : "N/A"}`;
                    }}
                    register={register}
                    errors={errors.branch_id}
                    name="user_id"
                    label="Assigned Staff"
                  />
                </div>
                <div className="sm:col-span-2">
                  <TextInput
                    label="First Name"
                    name="first_name"
                    errors={errors.first_name}
                    register={register}
                    required={true}
                  />
                </div>

                <div className="sm:col-span-2">
                  <TextInput
                    label="Surname"
                    name="surname"
                    errors={errors.surname}
                    register={register}
                    required={true}
                  />
                </div>
                <div className="sm:col-span-2">
                  <TextInput
                    label="Middle name"
                    name="middle_name"
                    errors={errors.middle_name}
                    register={register}
                  />
                </div>
                <div className="sm:col-span-4">
                  <TextInput
                    label="Occupation"
                    name="occupation"
                    errors={errors.occupation}
                    register={register}
                  />
                </div>

                <div className="sm:col-span-2">
                  <TextInput
                    label="Phone"
                    name="phone"
                    errors={errors.phone}
                    register={register}
                    required={true}
                  />
                </div>
                <div className="sm:col-span-3">
                  <Select
                    options={[
                      { code: "male", name: "male" },
                      { code: "female", name: "female" },
                    ]}
                    required={true}
                    valueProp="code"
                    nameProp={(data) => data.name}
                    register={register}
                    errors={errors.sex}
                    name="sex"
                    label="Sex"
                  />
                </div>
                <div className="sm:col-span-3">
                  <TextInput
                    label="Date of birth"
                    name="dob"
                    type="date"
                    errors={errors.dob}
                    register={register}
                  />
                </div>

                <div className="col-span-full">
                  <TextInput
                    label="Resident address"
                    name="resident_address"
                    errors={errors.resident_address}
                    register={register}
                  />
                </div>

                <div className="sm:col-span-3 sm:col-start-1">
                  <TextInput
                    label="Resident state"
                    name="resident_state"
                    errors={errors.resident_state}
                    register={register}
                  />
                </div>

                <div className="sm:col-span-3">
                  <TextInput
                    label="Resident LGA"
                    name="resident_lga"
                    errors={errors.resident_lga}
                    register={register}
                  />
                </div>

              
              </div>
            </div>
            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
              <button
                type="submit"
                className="flex rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="-pt-1">Save</span>
                {isLoading && (
                  <div>
                    <ButtonLoader className="pt-10" size={12} />
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
