import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import BaseLayout from "../../components/layouts/BaseLayout";
import Link from "../../components/common/Link";
import Input from "../../components/common/Input";

export default function AddTamtruPage() {
  const router = useRouter();
  return (
    <BaseLayout>
      <div className="m-10 rounded-2xl bg-white p-10 space-y-10">
        <div className="flex justify-between items-center pb-10 border-b">
          <h1 className="text-xl">Thêm nhân khẩu tạm trú mới</h1>
          <Link
            href="/tamtru"
            className="px-3 py-1 border-red-500 text-red-500 border rounded-lg"
          >
            Hủy
          </Link>
        </div>
        <Formik
          initialValues={{
            location: "",
            name: "",
            identityNumber: "",
            fromDate: "",
            toDate: "",
            reason: "",
          }}
          validate={(values) => {
            const errors = {};
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            router.push(`/tamtru/1`);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="grid grid-cols-2 gap-x-20 gap-y-10">
              <Input label="Họ và tên" name="name" />
              <Input label="Số CMND/CCCD" name="identityNumber" />
              <div className=" col-span-2">
                <Input label="Địa chỉ" name="location" />
              </div>
              <Input label="Từ ngày" name="fromDate" />
              <Input label="Đến ngày" name="toDate" />
              <div className="col-span-2">
                <Input label="Lý do" name="reason" type="textarea" />
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
    </BaseLayout>
  );
}
AddTamtruPage.auth = true;
