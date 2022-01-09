import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import BaseLayout from "../../../components/layouts/BaseLayout";
import Link from "../../../components/common/Link";
import Input from "../../../components/common/Input";
import { getSession, useSession } from "next-auth/react";
import { fetchAPI } from "../../../utils";
import moment from "moment";
import { useState } from "react";
import { Field } from "formik";

export default function EditNhanKhauPage({ nhanKhau }) {
  const router = useRouter();
  const { nhankhauId } = router.query;
  const [errorMessage, setErrorMessage] = useState("");
  const { data: session } = useSession();
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
            hoVaTen: nhanKhau.hoVaTen,
            hoVaTenKhac: nhanKhau.hoVaTenKhac,
            ngaySinh: moment(nhanKhau.ngaySinh).format("YYYY-MM-DD"),
            gioiTinh: nhanKhau.gioiTinh,
            cccd: nhanKhau.cccd,
            soHoChieu: nhanKhau.soHoChieu,
            nguyenQuan: nhanKhau.nguyenQuan,
            quocTich: nhanKhau.quocTich,
            tonGiao: nhanKhau.tonGiao,
            danToc: nhanKhau.danToc,
            noiThuongTru: nhanKhau.noiThuongTru,
            diaChiHienTai: nhanKhau.diaChiHienTai,
            quanHeVoiChuHo: nhanKhau.quanHeVoiChuHo,
            ngheNghiep: nhanKhau.ngheNghiep,
            trinhDoHocVan: nhanKhau.trinhDoHocVan,
            noiLamViec: nhanKhau.noiLamViec,
          }}
          validate={(values) => {
            const errors = {};
            return errors;
          }}
          onSubmit={async (values) => {
            try {
              await fetchAPI(`/api/v1/nhankhau/${nhankhauId}`, {
                method: "PUT",
                token: session.token,
                body: {
                  ...values,
                  ngaySinh: moment(values.ngaySinh + "Z").toISOString(),
                },
              });
              router.push(`/nhankhau/${nhankhauId}`);
            } catch (err) {
              setErrorMessage(err.message);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <div className="grid grid-cols-2 gap-10">
                <Input label="Họ và tên" name="hoVaTen" />
                <Input label="Tên gọi khác (nếu có)" name="hoVaTenKhac" />
              </div>
              <div className="grid grid-cols-2 gap-10">
                <div className="w-fit">
                  <Input label="Ngày sinh" name="ngaySinh" type="date" />
                </div>
                <div className="space-y-3">
                  <h1 className="text-gray-500">Giới tinh</h1>
                  <div className="space-x-10">
                    <label className="space-x-3">
                      <Field type="radio" name="gioiTinh" value="Nam" />
                      <span>Nam</span>
                    </label>
                    <label className="space-x-3">
                      <Field type="radio" name="gioiTinh" value="Nữ" />
                      <span>Nữ</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-10">
                <Input label="Số CMND/CCCD" name="cccd" />
                <Input label="Số hộ chiếu" name="soHoChieu" />
              </div>
              <div className="flex items-center">
                <Input label="Quan hệ với chủ hộ" name="quanHeVoiChuHo" />
              </div>
              <div className="grid grid-cols-9 gap-10">
                <div className="col-span-3">
                  <Input label="Nguyên quán" name="nguyenQuan" />
                </div>
                <div className="col-span-2">
                  <Input label="Dân tộc" name="danToc" />
                </div>
                <div className="col-span-2">
                  <Input label="Tôn giáo" name="tonGiao" />
                </div>
                <div className="col-span-2">
                  <Input label="Quốc tịch" name="quocTich" />
                </div>
              </div>
              <Input label="Địa chỉ thường trú" name="noiThuongTru" />
              <Input label="Địa chỉ hiện tại" name="diaChiHienTai" />
              <div className="grid grid-cols-9 gap-10">
                <div className="col-span-2">
                  <Input label="Trình độ học vấn" name="trinhDoHocVan" />
                </div>

                <div className="col-span-3">
                  <Input label="Nghề nghiệp" name="ngheNghiep" />
                </div>

                <div className="col-span-4">
                  <Input label="Nơi làm việc" name="noiLamViec" />
                </div>
              </div>
              <p className="text-red-700">{errorMessage}</p>
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
      </div>
    </BaseLayout>
  );
}
EditNhanKhauPage.auth = true;

export async function getServerSideProps(context) {
  const { nhankhauId } = context.query;
  const session = await getSession(context);

  try {
    const { result: nhanKhau } = await fetchAPI(
      `/api/v1/nhankhau/${nhankhauId}`,
      {
        token: session.token,
      }
    );

    return {
      props: { nhanKhau },
    };
  } catch (err) {
    console.error(err);
    return {
      props: { nhanKhau: {} },
    };
  }
}
