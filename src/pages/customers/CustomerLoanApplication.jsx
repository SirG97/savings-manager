import { useState, useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { TextInput } from "../../components/inputs/TextInput";
import { getCustomer } from "../../apis/Customers";
import { getAvailableLoan, applyForLoan } from "../../apis/Loan";
import { toast } from "sonner";
import Select from "../../components/inputs/Select";
import AppLayout from "../../components/layout/AppLayout";
import Button from "../../components/buttons/Button";
import numeral from "numeral";

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
  const [id, setId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [customer, setCustomer] = useState([]);
  const [loan, setLoan] = useState({});
  const [calculatedAmount, setCalculatedAmount] = useState(0);
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
    setIsLoading(true);
    const payload = {
      customer_id: id,
      amount: Number(data.amount),
      duration: Number(data.duration),
    };

    applyForLoan(dispatch, payload).then((resp) => {
      if (resp.data?.success) {
        reset({
          amount: "",
          duration: "",
        });
        fetchCustomer(id);

        toast.success("Loan application successful");
      } else {
        toast.error(resp.response.data.message);
      }
      setIsLoading(false);
    });
  };

  return (
    <AppLayout>
      <div className="space-y-10 divide-y divide-gray-900/10">
        {/* <Toaster position="top-right" richColors /> */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
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
    </AppLayout>
  );
}
