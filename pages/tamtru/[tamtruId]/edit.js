import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import moment from "moment";
import BaseLayout from "../../../components/layouts/BaseLayout";
import Link from "../../../components/common/Link";
import Input from "../../../components/common/Input";
import { TrashIcon } from "../../../components/icons";
import { fetchAPI } from "../../../utils";
export default function EditTamtruPage({ tamtru }) {
  const router = useRouter();
  const { tamtruId } = router.query;
  const { data: session } = useSession();
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <BaseLayout>
      <div className="m-10 rounded-2xl bg-white p-10 space-y-10">
        <div className="flex justify-between items-center pb-10 border-b">
          <h1 className="text-xl">Chỉnh sửa tạm trú</h1>
          <Link
            href={`/tamtru/${tamtruId}`}
            className="px-3 py-1 border-red-500 text-red-500 border rounded-lg"
          >
            Hủy
          </Link>
        </div>
        <Formik
          initialValues={{
            diaChi: tamtru.diaChi,
            hoVaTen: tamtru.hoVaTen,
            cccd: tamtru.cccd,
            tuNgay: moment(tamtru.tuNgay).format("YYYY-MM-DD"),
            denNgay: moment(tamtru.denNgay).format("YYYY-MM-DD"),
            lyDo: tamtru.lyDo,
          }}
          validate={(values) => {
            const errors = {};
            return errors;
          }}
          onSubmit={async (values) => {
            try {
              await fetchAPI(`/api/v1/tamtru/${tamtruId}`, {
                method: "PUT",
                body: {
                  ...values,
                  tuNgay: moment(values.tuNgay + "Z").toISOString(),
                  denNgay: moment(values.denNgay + "Z").toISOString(),
                },
                token: session.token,
              });
              router.push(`/tamtru/${tamtruId}`);
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
          <span>Xóa tạm trú</span>
        </button>
      </div>
    </BaseLayout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { tamtruId } = await context.query;
  try {
    const { result: tamtru } = await fetchAPI(`/api/v1/tamtru/${tamtruId}`, {
      token: session.token,
    });
    return {
      props: {
        tamtru,
      },
    };
  } catch (err) {
    return {
      props: {},
    };
  }
}

EditTamtruPage.auth = true;
