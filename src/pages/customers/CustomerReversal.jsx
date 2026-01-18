import { useState, useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { TextInput } from "../../components/inputs/TextInput";
import { getCustomer, createTransaction } from "../../apis/Customers";
import { toast } from "sonner";
import Select from "../../components/inputs/Select";
import AppLayout from "../../components/layout/AppLayout";
import ButtonLoader from "../../components/loaders/ButtonLoader";
import numeral from "numeral";
import Button from "../../components/buttons/Button";
import { Modal } from "flowbite-react";

const schema = yup
  .object({
    transaction_type: yup.string().required("Transaction type is required"),
    amount: yup
      .number("Amount must be numeric")
      .min(100, "Amount can't be less than 100")
      .required("Amount name is required"),
    payment_method: yup.string().required("Payment method is required"),
    description: yup.string("Description is required"),
  })
  .required();

export default function CustomerReversal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [customer, setCustomer] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formDataToConfirm, setFormDataToConfirm] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      customer_id: id,
      transaction_type: "reversal",
      amount: "",
      payment_method: "",
      description: "",
    },
  });

  useEffect(() => {
    const path = window.location.pathname;
    const segments = path.split("/");
    const id = segments[2];
    fetchCustomer(id);
  }, []);

  const fetchCustomer = (id) => {
    setIsLoading(true);
    getCustomer(dispatch, id)
      .then((resp) => {
        if (resp?.data?.success) {
          setId(id);
          console.log(id);
          const customerData = resp?.data?.data;
          console.log(customerData);
          setCustomer(customerData);
          // Prepopulate form fields

          setIsLoading(false);
        } else {
          toast.error("An error occurred. Try again!");
        }
      })
      .catch(() => {
        setIsLoading(false);
        toast.error("An error occurred. Try again!");
      });
    setIsLoading(false);
  };

  const handleCustomerReversal = (data) => {
    // Store form data and show confirmation modal
    setFormDataToConfirm(data);
    setShowConfirmModal(true);
  };

  const confirmAndSubmit = () => {
    if (!formDataToConfirm) return;

    setIsLoading(true);
    const data = { ...formDataToConfirm };
    data.customer_id = id;

    createTransaction(dispatch, data)
      .then((resp) => {
        if (resp.data?.success) {
          reset({
            transaction_type: "reversal",
            amount: "",
            payment_method: "",
            description: "",
            date: "",
          });
          fetchCustomer(id);
          toast.success(resp?.data.message);
          setShowConfirmModal(false);
          setFormDataToConfirm(null);
        } else {
          toast.error(resp.response.data.message);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <AppLayout>
      <div className="space-y-10 divide-gray-900/10">
        {/* <Toaster position="top-right" richColors /> */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <ArrowLeftIcon
            aria-hidden="true"
            className="-ml-0.5 mr-1.5 size-5 text-gray-400"
          />
          Back
        </button>
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-0 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base/7 font-semibold text-gray-900">
                  Reversal
                </h2>
                <p className="mt-1 text-sm/6 text-gray-600">
                  Enter the reversal amount and details. All fields marked
                  asterisk(*) are required
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(handleCustomerReversal)}
            className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
          >
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <p className="text-md">
                    Customer: {customer?.surname} {customer?.first_name}
                  </p>
                  <p className="text-md">
                    Staff Assigned: {customer?.user?.name}
                  </p>
                  <p className="text-md">
                    Balance: ₦
                    {numeral(customer?.customer_wallet?.balance).format(
                      "0,0.00",
                    )}
                  </p>
                </div>
                <div className="sm:col-span-6">
                  <TextInput
                    label="Amount"
                    name="amount"
                    errors={errors.amount}
                    register={register}
                    required={true}
                  />
                </div>

                <div className="sm:col-span-6">
                  <TextInput
                    label="Description"
                    name="description"
                    errors={errors.description}
                    register={register}
                    required={true}
                  />
                </div>

                <div className="sm:col-span-3">
                  <Select
                    options={[
                      { code: "cash", name: "cash" },
                      { code: "bank", name: "bank" },
                    ]}
                    required={true}
                    valueProp="code"
                    nameProp={(data) => data.name}
                    register={register}
                    errors={errors.payment_method}
                    name="payment_method"
                    label="Payment method"
                  />
                </div>
                <div className="sm:col-span-3">
                  <TextInput
                    label="Date"
                    name="date"
                    type="date"
                    errors={errors.date}
                    register={register}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
              <Button
                type="submit"
                loading={isLoading}
                className="flex rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="-pt-1">Save</span>
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        show={showConfirmModal}
        size="md"
        popup
        onClose={() => {
          setShowConfirmModal(false);
          setFormDataToConfirm(null);
        }}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Confirm Reversal
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                Please review the details below before confirming this reversal.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <dl className="divide-y divide-gray-200">
                <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-900">
                    Customer
                  </dt>
                  <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                    {customer?.surname} {customer?.first_name}
                  </dd>
                </div>

                <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-900">Amount</dt>
                  <dd className="mt-1 text-sm font-semibold text-gray-900 sm:col-span-2 sm:mt-0">
                    ₦
                    {formDataToConfirm?.amount
                      ? numeral(formDataToConfirm.amount).format("0,0.00")
                      : "0.00"}
                  </dd>
                </div>

                <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-900">
                    Payment Method
                  </dt>
                  <dd className="mt-1 text-sm capitalize text-gray-700 sm:col-span-2 sm:mt-0">
                    {formDataToConfirm?.payment_method || "-"}
                  </dd>
                </div>

                <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-900">
                    Description
                  </dt>
                  <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                    {formDataToConfirm?.description || "-"}
                  </dd>
                </div>

                {formDataToConfirm?.date && (
                  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-900">Date</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                      {formDataToConfirm.date}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="flex gap-3 space-x-2 pt-4">
              <Button
                onClick={() => {
                  setShowConfirmModal(false);
                  setFormDataToConfirm(null);
                }}
                className="flex-1 rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmAndSubmit}
                loading={isLoading}
                className="flex-1 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                Confirm & Submit
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </AppLayout>
  );
}
