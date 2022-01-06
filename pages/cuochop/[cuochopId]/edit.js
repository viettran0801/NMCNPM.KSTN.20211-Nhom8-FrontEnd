import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import BaseLayout from "../../../components/layouts/BaseLayout";
import Link from "../../../components/common/Link";
import Input from "../../../components/common/Input";
import { TrashIcon } from "../../../components/icons";

export default function EditCuochopPage() {
  const router = useRouter();
  const { cuochopId } = router.query;
  return (
    <BaseLayout>
      <div className="m-10 rounded-2xl bg-white p-10 space-y-10">
        <div className="flex justify-between items-center pb-10 border-b">
          <h1 className="text-xl">Chỉnh sửa cuộc họp</h1>
          <Link
            href={`/cuochop/${cuochopId}`}
            className="px-3 py-1 border-red-500 text-red-500 border rounded-lg"
          >
            Hủy
          </Link>
        </div>
        <Formik
          initialValues={{
            location: "",
            title: "",
            time: "",
            content: "",
          }}
          validate={(values) => {
            const errors = {};
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            router.push(`/cuochop/1`);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-10">
              <Input label="Tiêu đề" name="title" />
              <div className="grid grid-cols-3 gap-10">
                <Input label="Thời gian" name="time" />
                <div className="col-span-2">
                  <Input label="Địa điểm" name="location" />
                </div>
              </div>
              <Input label="Nội dung" name="content" type="textarea" />
              <div className="space-y-10">
                <div className="flex space-x-3 items-center pb-10 border-b">
                  <h1 className="text-lg">Danh sách tham gia</h1>
                  <button
                    type="button"
                    className="text-green-700 font-medium bg-green-300 rounded-lg px-3 py-2 hover:opacity-80 duration-100"
                  >
                    Chọn tất cả
                  </button>
                  <button
                    type="button"
                    className="text-red-700 font-medium bg-red-300 rounded-lg px-3 py-2 hover:opacity-80 duration-100"
                  >
                    Bỏ chọn tất cả
                  </button>
                </div>
                <div className="w-[600px] accent-blue-700">
                  <div className="grid grid-cols-2 gap-10 text-gray-500">
                    <h1>Họ và tên</h1>
                    <h1>Mời</h1>
                  </div>
                  {chuhoFakes.map((person) => (
                    <div
                      className="grid grid-cols-2 gap-10 py-3 hover:bg-gray-50 duration-100"
                      key={person.id}
                    >
                      <h1>{person.name}</h1>
                      <input type="checkbox" className="ml-2" />
                    </div>
                  ))}
                </div>
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

const chuhoFakes = [
  { id: 1, name: "Ha thi Tu" },
  { id: 1, name: "Ha thi Tu" },
  { id: 1, name: "Ha thi Tu" },
  { id: 1, name: "Ha thi Tu" },
];
