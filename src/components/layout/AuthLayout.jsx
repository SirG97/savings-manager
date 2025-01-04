import { Toaster } from "sonner"
export default function AuthLayout({ children, header }) {
  return (
    <>
      <Toaster richColors position="top-right" />
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-screen bg-gray-100 flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-3 text-center text-2xl font-bold tracking-tight text-gray-900">
            Manager
          </h2>
          <h2 className="mt-2 text-center text-lg/9 font-bold tracking-tight text-gray-900">
            {header}
          </h2>
        </div>

       {children}
      </div>
    </>
  )
}

