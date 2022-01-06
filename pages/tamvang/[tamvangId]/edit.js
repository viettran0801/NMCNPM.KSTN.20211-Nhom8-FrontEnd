import BaseLayout from "../../../components/layouts/BaseLayout";
import Link from "../../../components/common/Link";
import { Form, Formik } from "formik";
import Input from "../../../components/common/Input";
import { useRouter } from "next/router";
import { TrashIcon } from "../../../components/icons";

export default function EditTamvangPage() {
  const router = useRouter();
  const { tamvangId } = router.query;
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
            location: "123 đường A, phố B, huyện C, tỉnh D",
            name: "Hà Thị Tú",
            identityNumber: "123456789",
            fromDate: "10-10-1111",
            toDate: "10-10-1111",
            reason:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
          }}
          validate={(values) => {
            const errors = {};
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            router.push(`/tamvang/1`);
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
        <button className="px-3 py-2 bg-red-700 text-white rounded-lg hover:scale-105 duration-300 flex space-x-3">
          <TrashIcon />
          <span>Xóa tạm vắng</span>
        </button>
      </div>
    </BaseLayout>
  );
}
