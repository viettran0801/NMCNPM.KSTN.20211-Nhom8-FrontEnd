import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import moment from "moment";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import { fetchAPI } from "../../../utils";
import BaseLayout from "../../../components/layouts/BaseLayout";
import Link from "../../../components/common/Link";
import Input from "../../../components/common/Input";
import { TrashIcon } from "../../../components/icons";
export default function EditTamvangPage({ tamvang }) {
  const router = useRouter();
  const { tamvangId } = router.query;
  const { data: session } = useSession();
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <BaseLayout>
      <div className="m-10 rounded-2xl bg-white p-10 space-y-10">
        <div className="flex justify-between items-center pb-10 border-b">
          <h1 className="text-xl">Chỉnh sửa tạm vắng</h1>
          <Link
            href={`/tamvang/${tamvangId}`}
            className="px-3 py-1 border-red-500 text-red-500 border rounded-lg"
          >
            Hủy
          </Link>
        </div>
        <Formik
          initialValues={{
            diaChi: tamvang.diaChi,
            hoVaTen: tamvang.hoVaTen,
            cccd: tamvang.cccd,
            tuNgay: moment(tamvang.tuNgay).format("YYYY-MM-DD"),
            denNgay: moment(tamvang.denNgay).format("YYYY-MM-DD"),
            lyDo: tamvang.lyDo,
          }}
          validate={(values) => {
            const errors = {};
            return errors;
          }}
          onSubmit={async (values) => {
            try {
              await fetchAPI(`/api/v1/tamvang/${tamvangId}`, {
                method: "PUT",
                body: {
                  ...values,
                  tuNgay: moment(values.tuNgay + "Z").toISOString(),
                  denNgay: moment(values.denNgay + "Z").toISOString(),
                },
                token: session.token,
              });
              router.push(`/tamvang/${tamvangId}`);
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
        <button className="px-3 py-2 bg-red-700 text-white rounded-lg hover:scale-105 duration-300 flex space-x-3">
          <TrashIcon />
          <span>Xóa tạm vắng</span>
        </button>
      </div>
    </BaseLayout>
  );
}

EditTamvangPage.auth = true;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { tamvangId } = await context.query;
  try {
    const { result: tamvang } = await fetchAPI(`/api/v1/tamtru/${tamvangId}`, {
      token: session.token,
    });
    return {
      props: {
        tamvang,
      },
    };
  } catch (err) {
    return {
      props: {},
    };
  }
}
