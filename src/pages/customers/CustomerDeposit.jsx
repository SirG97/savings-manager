import { useState, useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { TextInput } from "../../components/inputs/TextInput";
import { getCustomer, createTransaction } from "../../apis/Customers";
import { toast } from "sonner";
import Select from "../../components/inputs/Select";
import AppLayout from "../../components/layout/AppLayout";
import ButtonLoader from "../../components/loaders/ButtonLoader";
import numeral from "numeral";
import Button from "../../components/buttons/Button";

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

export default function CustomerDeposit() {
  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [customer, setCustomer] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      customer_id: id,
      transaction_type: "deposit",
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

  const handleCustomerDeposit = (data) => {
    data.customer_id = id;

    createTransaction(dispatch, data).then((resp) => {
      if (resp.data?.success) {
        reset({
          transaction_type: "deposit",
          amount: "",
          payment_method: "",
          description: "",
          date: "",
        });
        fetchCustomer(id);
        toast.success(resp?.data.message);
      } else {
        toast.error(resp.response.data.message);
      }
    });
  };

  return (
    <AppLayout>
      <div className="space-y-10 divide-y divide-gray-900/10">
        {/* <Toaster position="top-right" richColors /> */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base/7 font-semibold text-gray-900">Deposit</h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              Enter the amount you want to withdraw for customer. All fields
              marked asterisk(*) are required
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleCustomerDeposit)}
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
    </AppLayout>
  );
}
