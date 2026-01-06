import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Authlayout from "../../components/layout/AuthLayout";
import { changePassword } from "../../apis/Authentication";
import Button from "../../components/buttons/Button";
import {
  setUserInfo,
  setUserToken,
  setLoginState,
} from "../../redux-store/AuthSlice";
import { Toaster,toast } from "sonner";

export default function ChangePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    setIsLoading(true);
    changePassword(dispatch, data).then((resp) => {
      if (resp?.data?.status === "success") {

        navigate("/");
      } else {
        setIsLoading(false);
        toast.error(resp?.response?.data.message);
      }
    });
  };

  return (
    <>
  
      <Authlayout header="Change password">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Current password
                </label>
                <div className="mt-1">
                  <input
                    {...register("current_password")}
                    type="password"
                    className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    {...register("password")}
                    type="password"
                    className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    {...register("password_confirmation")}
                    type="password"
                    className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
              <Button
                type="submit"
                loading={isLoading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="-pt-1">Proceed</span>
                
              </Button>
              </div>
            </form>
          </div>
        </div>
      </Authlayout>
    </>
  );
}
