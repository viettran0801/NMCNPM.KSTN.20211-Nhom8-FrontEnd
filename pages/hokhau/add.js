import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import Link from "../../components/common/Link";
import Input from "../../components/common/Input";
import { TrashIcon } from "../../components/icons";
import BaseLayout from "../../components/layouts/BaseLayout";
import AddNhanKhauModel from "../../components/nhankhau/AddNhanKhauModel";
import { useState } from "react";
import moment from "moment";
import { fetchAPI } from "../../utils";
import { useSession } from "next-auth/react";
export default function AddHoKhauPage() {
  const router = useRouter();
  const [nhanKhaus, setNhanKhaus] = useState([]);
  const { data: session } = useSession();
  const [errorMessage, setErrorMessage] = useState("");
  const addNhanKhau = (nhanKhau) => {
    setNhanKhaus([...nhanKhaus, nhanKhau]);
  };

  const removeNhanKhau = (nhanKhauId) => {
    setNhanKhaus(nhanKhaus.filter((nhanKhau) => nhanKhau.id != nhanKhauId));
  };
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
        <Formik
          initialValues={{
            diaChi: "",
            hoTenChuHo: "",
            cccdChuHo: "",
          }}
          validate={(values) => {
            const errors = {};
            return errors;
          }}
          onSubmit={async (values) => {
            try {
              const { result } = await fetchAPI("/api/v1/hokhau", {
                method: "POST",
                body: {
                  ...values,
                  nhanKhaus: nhanKhaus.map((nhanKhau) => nhanKhau.id),
                },
                token: session.token,
              });
              router.push(`/hokhau/${result.id}`);
            } catch (err) {
              setErrorMessage(err.message);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="grid grid-cols-2 gap-x-20 gap-y-10">
              <Input label="Họ và tên chủ hộ" name="hoTenChuHo" />
              <Input label="Số CMND/CCCD của chủ hộ" name="cccdChuHo" />
              <div className=" col-span-2">
                <Input label="Địa chỉ" name="diaChi" />
              </div>
              <div className="space-y-10 col-span-2">
                <div className="flex items-center space-x-10 pb-10 border-b">
                  <h1 className="text-xl">Danh sách thành viên</h1>
                  <AddNhanKhauModel addNhanKhau={addNhanKhau} />
                </div>
                <div className="w-[800px]">
                  <div className="grid grid-cols-4 gap-10 text-gray-500">
                    <h1>Họ và tên</h1>
                    <h1>Ngày sinh</h1>
                    <h1>Quan hệ với chủ hộ</h1>
                    <h1>Xóa</h1>
                  </div>
                  {nhanKhaus.map((nhanKhau) => (
                    <div
                      className="grid grid-cols-4 gap-10 py-3 hover:bg-gray-50 duration-100"
                      key={nhanKhau.id}
                    >
                      <h1>{nhanKhau.hoVaTen}</h1>
                      <h1>{moment(nhanKhau.ngaySinh).format("DD-MM-YYYY")}</h1>
                      <h1>{nhanKhau.quanHeVoiChuHo}</h1>
                      <button
                        className="text-red-500"
                        onClick={() => removeNhanKhau(nhanKhau.id)}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  ))}
                </div>
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

AddHoKhauPage.auth = true;
