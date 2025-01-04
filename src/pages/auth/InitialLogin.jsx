import { EyeIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import sikaLogo from "../../assets/icons/Group.svg";
import {TextInput} from "../../components/inputs/TextInput";
import Authlayout from "../../components/layout/AuthLayout";


export default function InitialLogin() {
    const navigate = useNavigate();
  return (
    <>
          <Authlayout>
          <div className="rounded-xl bg-white px-6 py-12 shadow sm:rounded-xl sm:px-12">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <img
                alt="Your Company"
                src={sikaLogo}
                className="mx-auto h-10 w-auto"
              />
              <h2 className="mt-10 text-2xl/9 font-semibold tracking-tight text-gray-900">
                Welcome back
            </h2>
            <h2 className="text-sm mb-5 font-normal tracking-tight text-gray-700">
                Reset your password to continue
              </h2>
            </div>
            <form action="#" method="POST" className="space-y-6">
            <div className="">
              <TextInput label="Email" placeholder="johndoe10" type="email" />
            </div>

            <div>
              <TextInput
                label="Current Pasword"
                placeholder="******"
                type="password"
                rightIcon={<EyeIcon size="20" className="h-4" />}
              />
                      </div>
                      <div>
              <TextInput
                label="New Pasword"
                placeholder="******"
                type="password"
                rightIcon={<EyeIcon size="20" className="h-4" />}
              />
                      </div>
                      <div>
              <TextInput
                label="Confirm Pasword"
                placeholder="******"
                type="password"
                rightIcon={<EyeIcon size="20" className="h-4" />}
              />
            </div>

            <div>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="mb-5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-3 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Reset Password
              </button>
            </div>
          </form>
          </div>
     </Authlayout>
    </>
  );
}
