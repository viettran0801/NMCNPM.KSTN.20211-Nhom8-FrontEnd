import { ErrorMessage, Field, Form, Formik } from "formik";
import BaseLayout from "../../components/layouts/BaseLayout";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
export default function LoginPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <BaseLayout isDashboard={false}>
      <div className="mt-[100px] w-[500px] mx-auto space-y-10">
        <h1 className="text-4xl">Đăng nhập</h1>
        <Formik
          initialValues={{ username: "", password: "" }}
          validate={(values) => {
            const errors = {};
            return errors;
          }}
          onSubmit={async (values, action) => {
            const res = await signIn("credentials", {
              username: values.username,
              password: values.password,
              redirect: false,
            });
            if (!res.error) {
              router.push("/");
            } else {
              setErrorMessage("Incorrect username and password");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-7">
              <div className="space-y-1">
                <label className="text-gray-500 text">Tên đăng nhập</label>
                <Field
                  type="text"
                  name="username"
                  className="w-full p-3 focus:outline-none rounded-lg focus:shadow-sm border"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-gray-500">Mật khẩu</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full p-3 focus:outline-none rounded-lg focus:shadow-sm border"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <p className="text-red-500">{errorMessage}</p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-3 py-2 bg-blue-700 text-white rounded-lg hover:scale-105 duration-300"
              >
                Đăng nhập
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </BaseLayout>
  );
}
