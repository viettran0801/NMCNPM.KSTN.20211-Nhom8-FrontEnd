import { ErrorMessage, Field, Form, Formik } from "formik";
import BaseLayout from "../../components/layouts/BaseLayout";
import { signIn, useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  console.log(session, status);

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
          onSubmit={async (values, { setSubmitting }) => {
            const res = await signIn("credentials", {
              username: values.username,
              password: values.password,
              redirect: false,
            });
            // console.log(res);

            setSubmitting(false);
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
                <ErrorMessage name="password" component="div" />
              </div>
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
