import BaseLayout from "../../components/layouts/BaseLayout";
import Link from "../../components/common/Link";
import { Form, Formik, Field, ErrorMessage } from "formik";

export default function AddHoKhauPage() {
  return (
    <BaseLayout>
      <div className="m-10 rounded-2xl bg-white p-10 space-y-10">
        <div className="flex justify-between items-center pb-10 border-b">
          <h1 className="text-xl">Thêm hộ khẩu mới</h1>
          <Link
            href="/hokhau"
            className="px-3 py-1 border-red-500 text-red-500 border rounded-lg"
          >
            Hủy
          </Link>
        </div>
        <div>
          <Formik
            initialValues={{
              location: "",
              name: "",
              identityNumber: "",
            }}
            validate={(values) => {
              const errors = {};
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="grid grid-cols-2 gap-x-20 gap-y-10">
                <div className="space-y-1">
                  <label className="text-gray-500 text">Họ và tên chủ hộ</label>
                  <Field
                    type="text"
                    name="name"
                    className="w-full p-3 focus:outline-none rounded-lg focus:shadow-sm border"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-gray-500 text">
                    Số CMND/CCCD của chủ hộ
                  </label>
                  <Field
                    type="text"
                    name="identityNumber"
                    className="w-full p-3 focus:outline-none rounded-lg focus:shadow-sm border"
                  />
                  <ErrorMessage
                    name="identityNumber"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="space-y-1 col-span-2">
                  <label className="text-gray-500 text">Địa chỉ</label>
                  <Field
                    type="text"
                    name="location"
                    className="w-full p-3 focus:outline-none rounded-lg focus:shadow-sm border"
                  />
                  <ErrorMessage
                    name="location"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-3 py-2 bg-blue-700 text-white rounded-lg hover:scale-105 duration-300"
                  >
                    Xác nhận
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </BaseLayout>
  );
}
