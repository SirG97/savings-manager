import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Authlayout from "../../components/layout/AuthLayout";
import { loginUser } from "../../apis/Authentication";
import {
  setUserInfo,
  setUserToken,
  setLoginState,
} from "../../redux-store/AuthSlice";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.auth)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    loginUser(dispatch, data).then((resp) => {
      if (resp?.data?.status === "success") {
        let user = resp.data?.data.user;
        console.log(user)
        localStorage.setItem("token", resp.data.data.access_token);
        localStorage.setItem("userInfo", JSON.stringify(resp.data.data.user));
        localStorage.setItem("loginState", true);
        dispatch(setUserToken(localStorage.getItem("token")));
        dispatch(setUserInfo(localStorage.getItem("userInfo")));
        dispatch(setLoginState(localStorage.getItem("loginState")));

        if (user.default_password == "1") {
          navigate('/auth/change-password')
          return;
        }
        navigate("/");
      } else {
        toast.error(resp.response?.data?.data?.message);
      }
    });
  };

  return (
    <>
      
      <Authlayout header="Sign in to your account">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    {...register("email")}
                    type="email"
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

              <div className="flex items-center justify-end">
                <div className="text-sm/6">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </Authlayout>
    </>
  );
}
