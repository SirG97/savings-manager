import { useState, useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { TextInput } from "../../components/inputs/TextInput";
import { getCustomer } from "../../apis/Customers";
import { getAvailableLoan, applyForLoan } from "../../apis/Loan";
import { toast } from "sonner";
import Select from "../../components/inputs/Select";
import AppLayout from "../../components/layout/AppLayout";
import Button from "../../components/buttons/Button";
import numeral from "numeral";
import { Modal } from "flowbite-react";

const schema = yup
  .object({
    amount: yup
      .number("Amount must be numeric")
      .min(100, "Amount can't be less than 50,000")
      .required("Amount is required"),
    duration: yup.string().required("Duration is required"),
  })
  .required();

export default function CustomerLoanApplication() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [customer, setCustomer] = useState([]);
  const [loan, setLoan] = useState({});
  const [calculatedAmount, setCalculatedAmount] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formDataToConfirm, setFormDataToConfirm] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      customer_id: id,
      amount: "",
      duration: "",
    },
  });

  const watchAmount = watch("amount");
  const watchDuration = watch("duration");

  useEffect(() => {
    const path = window.location.pathname;
    const segments = path.split("/");
    const id = segments[2];
    fetchCustomer(id);
    fetchAvailableLoan();
  }, []);

  useEffect(() => {
    if (watchAmount && watchDuration && loan?.interest_rate) {
      const principal = Number(watchAmount);
      const duration = Number(watchDuration);
      const interest = principal * (loan.interest_rate / 100) * duration;
      const totalRepayment = principal + interest;
      setCalculatedAmount(totalRepayment);
      // Debug logs
      console.log("Calculation triggered with:", {
        amount: watchAmount,
        duration: watchDuration,
        interestRate: loan?.interest_rate,
        totalRepayment,
      });
    }
  }, [watchAmount, watchDuration, loan]);

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
  };

  const fetchAvailableLoan = () => {
    getAvailableLoan(dispatch)
      .then((resp) => {
        if (resp?.data?.success) {
          console.log(resp?.data?.data);
          setLoan(resp?.data?.data);
        } else {
          toast.error("Failed to get available loan!");
        }
      })
      .catch(() => {
        setIsLoading(false);
        toast.error(
          "An error occurred and loan could not be retrieved. Try again!",
        );
      });
  };

  const handleLoanApplication = (data) => {
    // Store form data and show confirmation modal
    setFormDataToConfirm(data);
    setShowConfirmModal(true);
  };

  const confirmAndSubmit = () => {
    if (!formDataToConfirm) return;

    setIsLoading(true);
    const payload = {
      customer_id: id,
      amount: Number(formDataToConfirm.amount),
      duration: Number(formDataToConfirm.duration),
    };

    applyForLoan(dispatch, payload)
      .then((resp) => {
        if (resp.data?.success) {
          reset({
            amount: "",
            duration: "",
          });
          fetchCustomer(id);
          toast.success("Loan application successful");
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
            <h2 className="text-base/7 font-semibold text-gray-900">Loan</h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              Enter the loan amount and duration you want to apply for. All
              fields marked asterisk(*) are required
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleLoanApplication)}
            className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
          >
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <p className="text-md">
                    Customer:{" "}
                    <span className="font-semibold">
                      {customer?.surname} {customer?.first_name}
                    </span>
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
                    placeholder="₦50,000 - ₦1,000,000"
                  />
                </div>

                <div className="sm:col-span-6">
                  <Select
                    options={[
                      { code: "1", name: "1 month" },
                      { code: "2", name: "2 months" },
                      { code: "3", name: "3 months" },
                      { code: "4", name: "4 months" },
                      { code: "5", name: "5 months" },
                      { code: "6", name: "6 months" },
                    ]}
                    required={true}
                    valueProp="code"
                    nameProp={(data) => data.name}
                    register={register}
                    errors={errors.duration}
                    name="duration"
                    label="Duration"
                  />
                </div>

                {calculatedAmount > 0 && watchAmount && watchDuration && (
                  <div className="mt-4 rounded-lg bg-gray-50 p-4 sm:col-span-6">
                    <h3 className="mb-2 text-lg font-semibold">
                      Repayment Details
                    </h3>
                    <div className="space-y-2">
                      <p>
                        Principal Amount: ₦
                        {numeral(watchAmount).format("0,0.00")}
                      </p>
                      <p>Interest Rate: {loan?.interest_rate}% per month</p>
                      <p>
                        Duration: {watchDuration} month
                        {watchDuration > 1 ? "s" : ""}
                      </p>
                      <p className="font-semibold">
                        Total Repayment: ₦
                        {numeral(calculatedAmount).format("0,0.00")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
              <Button
                loading={isLoading}
                className="flex rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Apply
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
                Confirm Loan Application
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                Please review the details below before confirming this loan
                application.
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
                    Duration
                  </dt>
                  <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                    {formDataToConfirm?.duration
                      ? `${formDataToConfirm.duration} month${
                          formDataToConfirm.duration > 1 ? "s" : ""
                        }`
                      : "-"}
                  </dd>
                </div>

                {loan?.interest_rate && formDataToConfirm?.amount && (
                  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-900">
                      Interest Rate
                    </dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                      {loan.interest_rate}% per month
                    </dd>
                  </div>
                )}

                {formDataToConfirm?.amount &&
                  formDataToConfirm?.duration &&
                  loan?.interest_rate && (
                    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-900">
                        Total Repayment
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-gray-900 sm:col-span-2 sm:mt-0">
                        ₦
                        {(() => {
                          const principal = Number(formDataToConfirm.amount);
                          const duration = Number(formDataToConfirm.duration);
                          const interest =
                            principal * (loan.interest_rate / 100) * duration;
                          const totalRepayment = principal + interest;
                          return numeral(totalRepayment).format("0,0.00");
                        })()}
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
                Confirm & Apply
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </AppLayout>
  );
}
