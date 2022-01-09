import { useRouter } from "next/router";
import { PencilIcon } from "../../../components/icons";
import BaseLayout from "../../../components/layouts/BaseLayout";
import Link from "../../../components/common/Link";
import { getSession } from "next-auth/react";
import { fetchAPI, parseInstantToDate } from "../../../utils";

export default function NhankhauDetailpage({ nhanKhau }) {
  const { nhankhauId } = useRouter().query;
  return (
    <BaseLayout>
      <div className="m-10 rounded-2xl bg-white p-10 space-y-10">
        <div className="flex justify-between items-center pb-10 border-b">
          <div className="flex items-center space-x-5">
            <h1 className="text-xl">Chi tiết nhân khẩu </h1>
            <Link
              href={`/nhankhau/${nhankhauId}/edit`}
              className="flex items-center space-x-3 px-3 py-2 bg-blue-700 text-white rounded-lg hover:opacity-80 duration-100"
            >
              <PencilIcon />
              <span>Chỉnh sửa</span>
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <Link
              href="/hokhau/1"
              className="flex items-center  px-3 py-1 border-orange-500 text-orange-500 border rounded-lg hover:opacity-80 duration-100"
            >
              Hộ khẩu
            </Link>
            <Link
              href="/nhankhau"
              className="flex items-center  px-3 py-1 border-green-500 text-green-500 border rounded-lg hover:opacity-80 duration-100"
            >
              Danh sách nhân khẩu
            </Link>
          </div>
        </div>
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-10">
            <div className="space-y-3">
              <h1 className="text-gray-500">Họ và tên</h1>
              <h1>{nhanKhau.hoVaTen}</h1>
            </div>
            <div className="space-y-3">
              <h1 className="text-gray-500">Tên gọi khác (nếu có)</h1>
              <h1>{nhanKhau.hoVaTenKhac}</h1>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10">
            <div className="space-y-3">
              <h1 className="text-gray-500">Ngày sinh</h1>
              <h1>{parseInstantToDate(nhanKhau.ngaySinh)}</h1>
            </div>
            <div className="space-y-3">
              <h1 className="text-gray-500">Giới tính</h1>
              <h1>{nhanKhau.gioiTinh}</h1>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10">
            <div className="space-y-3">
              <h1 className="text-gray-500">Số CMND/CCCD</h1>
              <h1>{nhanKhau.cccd}</h1>
            </div>
            <div className="space-y-3">
              <h1 className="text-gray-500">Số hộ chiếu</h1>
              <h1>{nhanKhau.soHoChieu}</h1>
            </div>
          </div>
          <div className="space-y-3">
            <h1 className="text-gray-500">Quan hệ với chủ hộ</h1>
            <h1>{nhanKhau.quanHeVoiChuHo}</h1>
          </div>
          <div className="grid grid-cols-9 gap-10">
            <div className="col-span-3 space-y-3">
              <h1 className="text-gray-500">Nguyên quán</h1>
              <h1>{nhanKhau.nguyenQuan}</h1>
            </div>
            <div className="col-span-2 space-y-3">
              <h1 className="text-gray-500">Dân tộc</h1>
              <h1>{nhanKhau.danToc}</h1>
            </div>
            <div className="col-span-2 space-y-3">
              <h1 className="text-gray-500">Tôn giáo</h1>
              <h1>{nhanKhau.tonGiao}</h1>
            </div>
            <div className="col-span-2 space-y-3">
              <h1 className="text-gray-500">Quốc tịch</h1>
              <h1>{nhanKhau.quocTich}</h1>
            </div>
          </div>
          <div className="space-y-3">
            <h1 className="text-gray-500">Địa chỉ thường trú</h1>
            <h1>{nhanKhau.noiThuongTru}</h1>
          </div>
          <div className="space-y-3">
            <h1 className="text-gray-500">Địa chỉ hiện tại</h1>
            <h1>{nhanKhau.diaChiHienTai}</h1>
          </div>
          <div className="grid grid-cols-9 gap-10">
            <div className="col-span-2 space-y-3">
              <h1 className="text-gray-500">Trình độ học vấn</h1>
              <h1>{nhanKhau.trinhDoHocVan}</h1>
            </div>

            <div className="col-span-3 space-y-3">
              <h1 className="text-gray-500">Nghề nghiệp</h1>
              <h1>{nhanKhau.ngheNghiep}</h1>
            </div>

            <div className="col-span-4 space-y-3">
              <h1 className="text-gray-500">Nơi làm việc</h1>
              <h1>{nhanKhau.noiLamViec}</h1>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

NhankhauDetailpage.auth = true;

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
