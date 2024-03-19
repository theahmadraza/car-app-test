"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface FormValues {
  email: string;
  password: string;
}

const initialValues = {
  email: "",
  password: "",
};

const LoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be a valid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const router = useRouter();

  const onSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    const { email, password } = values;
    const url = `https://car-app-test-backend.vercel.app/auth/login`;
    try {
      const response = await axios.post(url, {
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify(response.data));
      toast.success("User Login Successfully!");
      router.push("/add-car");
    } catch (error: any) {
      if (error.response.status === 400) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Login Failed");
      }
    }
    resetForm();
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex h-screen flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to your Car app account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={initialValues}
            validationSchema={LoginValidationSchema}
            onSubmit={onSubmit}
          >
            <Form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-violet-500 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    className="text-xs text-red-600 mt-1"
                    name="email"
                    component="div"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-violet-500 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    className="text-xs text-red-600 mt-1"
                    name="password"
                    component="div"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-violet-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
                >
                  Sign in
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
