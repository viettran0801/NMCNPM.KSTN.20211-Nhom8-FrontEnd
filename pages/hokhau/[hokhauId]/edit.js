import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useState } from "react";
import BaseLayout from "../../../components/layouts/BaseLayout";
import Link from "../../../components/common/Link";
import Input from "../../../components/common/Input";
import AddNhanKhauModel from "../../../components/nhankhau/AddNhanKhauModel";
import { TrashIcon } from "../../../components/icons";
import { fetchAPI } from "../../../utils";

export default function AddHoKhauPage({ hoKhau }) {
  const router = useRouter();
  const { hokhauId } = router.query;
  const [nhanKhaus, setNhanKhaus] = useState(hoKhau.nhanKhaus);
  const { data: session } = useSession();
  const [errorMessage, setErrorMessage] = useState("");
  const addNhanKhau = (nhanKhau) => {
    setNhanKhaus([...nhanKhaus, nhanKhau]);
  };

  const removeNhanKhau = (nhanKhauId) => {
    setNhanKhaus(nhanKhaus.filter((nhanKhau) => nhanKhau.id != nhanKhauId));
  };

  const removeHoKhau = async () => {
    try {
      await fetchAPI(`/api/v1/hokhau/${hokhauId}`, {
        method: "DELETE",
        token: session.token,
      });
      router.push("/hokhau");
    } catch (err) {
      setErrorMessage("Có lỗi xảy ra");
    }
  };

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
            diaChi: hoKhau.diaChi,
            hoTenChuHo: hoKhau.hoTenChuHo,
            cccdChuHo: hoKhau.cccdChuHo,
          }}
          validate={(values) => {
            const errors = {};
            return errors;
          }}
          onSubmit={async (values) => {
            try {
              await fetchAPI(`/api/v1/hokhau/${hokhauId}`, {
                method: "PUT",
                body: {
                  ...values,
                  nhanKhaus: nhanKhaus.map((nhanKhau) => nhanKhau.id),
                },
                token: session.token,
              });
              router.push(`/hokhau/${hokhauId}`);
            } catch (err) {
              setErrorMessage("Có lỗi xảy ra");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="grid grid-cols-2 gap-x-20 gap-y-10">
              <Input
                label="Họ và tên chủ hộ"
                name="hoTenChuHo"
                required={true}
              />
              <Input
                label="Số CMND/CCCD của chủ hộ"
                name="cccdChuHo"
                required={true}
              />
              <div className=" col-span-2">
                <Input label="Địa chỉ" name="diaChi" required={true} />
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
                  Lưu thay đổi
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <button
          className="px-3 py-2 bg-red-700 text-white rounded-lg hover:scale-105 duration-300 flex space-x-3"
          onClick={removeHoKhau}
        >
          <TrashIcon />
          <span>Xóa hộ khẩu</span>
        </button>
      </div>
    </BaseLayout>
  );
}
AddHoKhauPage.auth = true;

export async function getServerSideProps(context) {
  const { hokhauId } = context.query;
  const session = await getSession(context);

  try {
    const { result: hoKhau } = await fetchAPI(`/api/v1/hokhau/${hokhauId}`, {
      token: session.token,
    });

    return {
      props: { hoKhau },
    };
  } catch (err) {
    return {
      props: {},
    };
  }
}
