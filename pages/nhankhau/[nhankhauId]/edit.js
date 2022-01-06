import BaseLayout from "../../../components/layouts/BaseLayout";
import Link from "../../../components/common/Link";
import { Form, Formik } from "formik";
import Input from "../../../components/common/Input";
import AddNhanKhauModel from "../../../components/nhankhau/AddNhanKhauModel";
import { useRouter } from "next/router";
import { TrashIcon } from "../../../components/icons";

export default function AddHoKhauPage() {
  const router = useRouter();
  const { nhankhauId } = router.query;
  return (
    <BaseLayout>
      <div className="m-10 rounded-2xl bg-white p-10 space-y-10">
        <div className="flex justify-between items-center pb-10 border-b">
          <h1 className="text-xl">Chỉnh sửa nhân khẩu</h1>
          <Link
            href={`/nhankhau/${nhankhauId}`}
            className="px-3 py-1 border-red-500 text-red-500 border rounded-lg"
          >
            Hủy
          </Link>
        </div>
        <Formik
          initialValues={{
            name: "Hà Đức Tuấn",
            otherName: "",
            bod: "20/2/2001",
            gender: "Nam",
            identityNumber: "123456789",
            passportNumber: "123456789",
            homeTown: "Hà Nam",
            nationality: "Việt Nam",
            religion: "Không",
            ethnic: "Kinh",
            permanentAddress: "123 đường A, phố B, huyện C, tỉnh D",
            address: "123 đường A, phố B, huyện C, tỉnh D",
            relation: "Con",
            job: "Công nhân",
            academicLevel: "12/12",
            workplace: "Công ty abc",
          }}
          validate={(values) => {
            const errors = {};
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            closeModal();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <div className="grid grid-cols-2 gap-10">
                <Input label="Họ và tên" name="name" />
                <Input label="Tên gọi khác (nếu có)" name="otherName" />
              </div>
              <div className="flex items-center">
                <Input label="Ngày sinh" name="bod" />
              </div>
              <div className="grid grid-cols-2 gap-10">
                <Input label="Số CMND/CCCD" name="identityNumber" />
                <Input label="Số hộ chiếu" name="passportNumber" />
              </div>
              <div className="flex items-center">
                <Input label="Quan hệ với chủ hộ" name="relation" />
              </div>
              <div className="grid grid-cols-9 gap-10">
                <div className="col-span-3">
                  <Input label="Nguyên quán" name="homeTown" />
                </div>
                <div className="col-span-2">
                  <Input label="Dân tộc" name="ethnic" />
                </div>
                <div className="col-span-2">
                  <Input label="Tôn giáo" name="religion" />
                </div>
                <div className="col-span-2">
                  <Input label="Quốc tịch" name="nationality" />
                </div>
              </div>
              <Input label="Địa chỉ thường trú" name="permanentAddress" />
              <Input label="Địa chỉ hiện tại" name="address" />
              <div className="grid grid-cols-9 gap-10">
                <div className="col-span-2">
                  <Input label="Trình độ học vấn" name="academicLevel" />
                </div>

                <div className="col-span-3">
                  <Input label="Nghề nghiệp" name="job" />
                </div>

                <div className="col-span-4">
                  <Input label="Nơi làm việc" name="workplace" />
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
          <span>Xóa nhân khẩu</span>
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
