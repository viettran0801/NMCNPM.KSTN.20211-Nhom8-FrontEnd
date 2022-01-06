import BaseLayout from "../../../components/layouts/BaseLayout";
import Link from "../../../components/common/Link";
import { Form, Formik } from "formik";
import Input from "../../../components/common/Input";
import AddNhanKhauModel from "../../../components/nhankhau/AddNhanKhauModel";
import { useRouter } from "next/router";
import { TrashIcon } from "../../../components/icons";

export default function AddHoKhauPage() {
  const router = useRouter();
  const { hokhauId } = router.query;
  return (
    <BaseLayout>
      <div className="m-10 rounded-2xl bg-white p-10 space-y-10">
        <div className="flex justify-between items-center pb-10 border-b">
          <h1 className="text-xl">{`Chỉnh sửa hộ khẩu mã ${hokhauId}`}</h1>
          <Link
            href={`/hokhau/${hokhauId}`}
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
          }}
          validate={(values) => {
            const errors = {};
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            router.push(`/hokhau/${hokhauId}`);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="grid grid-cols-2 gap-x-20 gap-y-10">
              <Input label="Họ và tên chủ hộ" name="name" />
              <Input label="Số CMND/CCCD của chủ hộ" name="identityNumber" />
              <div className=" col-span-2">
                <Input label="Địa chỉ" name="location" />
              </div>

              <div className="space-y-10 col-span-2">
                <div className="flex items-center space-x-10 pb-10 border-b">
                  <h1 className="text-xl">Danh sách thành viên</h1>
                  <AddNhanKhauModel />
                </div>
                <div className="w-[800px]">
                  <div className="grid grid-cols-4 gap-10 text-gray-500">
                    <h1>Họ và tên</h1>
                    <h1>Ngày sinh</h1>
                    <h1>Quan hệ với chủ hộ</h1>
                    <h1>Xóa</h1>
                  </div>
                  {thanhvienFakes.map((person) => (
                    <div className="grid grid-cols-4 gap-10 py-3 hover:bg-gray-50 duration-100">
                      <h1>{person.name}</h1>
                      <h1>{person.bod}</h1>
                      <h1>{person.relation}</h1>
                      <button className="text-red-500">
                        <TrashIcon />
                      </button>
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
                  Lưu thay đổi
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <button className="px-3 py-2 bg-red-700 text-white rounded-lg hover:scale-105 duration-300 flex space-x-3">
          <TrashIcon />
          <span>Xóa hộ khẩu</span>
        </button>
      </div>
    </BaseLayout>
  );
}

const thanhvienFakes = [
  {
    name: "Ha thi Tu",
    bod: "2020/1/1",
    relation: "Con",
  },
  {
    name: "Ha thi Tu",
    bod: "2020/1/1",
    relation: "Con",
  },
  {
    name: "Ha thi Tu",
    bod: "2020/1/1",
    relation: "Con",
  },
  {
    name: "Ha thi Tu",
    bod: "2020/1/1",
    relation: "Con",
  },
];
