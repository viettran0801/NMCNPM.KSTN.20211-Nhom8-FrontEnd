import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import moment from "moment";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { fetchAPI } from "../../utils";
import BaseLayout from "../../components/layouts/BaseLayout";
import Link from "../../components/common/Link";
import Input from "../../components/common/Input";
export default function AddTamvangPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <BaseLayout>
      <div className="m-10 rounded-2xl bg-white p-10 space-y-10">
        <div className="flex justify-between items-center pb-10 border-b">
          <h1 className="text-xl">Thêm nhân khẩu tạm vắng mới</h1>
          <Link
            href="/tamvang"
            className="px-3 py-1 border-red-500 text-red-500 border rounded-lg"
          >
            Hủy
          </Link>
        </div>
        <Formik
          initialValues={{
            diaChi: "",
            hoVaTen: "",
            cccd: "",
            tuNgay: "",
            denNgay: "",
            lyDo: "",
          }}
          validate={(values) => {
            const errors = {};
            return errors;
          }}
          onSubmit={async (values) => {
            try {
              const { result } = await fetchAPI(`/api/v1/tamvang`, {
                method: "POST",
                body: {
                  ...values,
                  tuNgay: moment(values.tuNgay + "Z").toISOString(),
                  denNgay: moment(values.denNgay + "Z").toISOString(),
                },
                token: session.token,
              });
              router.push(`/tamvang/${result.id}`);
            } catch (err) {
              setErrorMessage(err.message);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="grid grid-cols-2 gap-x-20 gap-y-10">
              <Input label="Họ và tên" name="hoVaTen" />
              <Input label="Số CMND/CCCD" name="cccd" />
              <div className=" col-span-2">
                <Input label="Địa chỉ" name="diaChi" />
              </div>
              <Input label="Từ ngày" name="tuNgay" type="date" />
              <Input label="Đến ngày" name="denNgay" type="date" />
              <div className="col-span-2">
                <Input label="Lý do" name="lyDo" type="textarea" />
              </div>
              <p className="text-red-700 col-span-2">{errorMessage}</p>

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

AddTamvangPage.auth = true;
