import { useRouter } from "next/router";
import { PencilIcon } from "../../../components/icons";
import BaseLayout from "../../../components/layouts/BaseLayout";
import Link from "../../../components/common/Link";

export default function HoKhauDetailpage() {
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
              <h1>Hà Thị Tú</h1>
            </div>
            <div className="space-y-3">
              <h1 className="text-gray-500">Tên gọi khác (nếu có)</h1>
              <h1>Hà Thị Nấu dấm</h1>
            </div>
          </div>
          <div className="flex items-center">
            <div className="space-y-3">
              <h1 className="text-gray-500">Ngày sinh</h1>
              <h1>20/10/2020</h1>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10">
            <div className="space-y-3">
              <h1 className="text-gray-500">Số CMND/CCCD</h1>
              <h1>123456789</h1>
            </div>
            <div className="space-y-3">
              <h1 className="text-gray-500">Số hộ chiếu</h1>
              <h1>123456789</h1>
            </div>
          </div>
          <div className="space-y-3">
            <h1 className="text-gray-500">Quan hệ với chủ hộ</h1>
            <h1>Con đĩ</h1>
          </div>
          <div className="grid grid-cols-9 gap-10">
            <div className="col-span-3 space-y-3">
              <h1 className="text-gray-500">Nguyên quán</h1>
              <h1>Hà Nam</h1>
            </div>
            <div className="col-span-2 space-y-3">
              <h1 className="text-gray-500">Dân tộc</h1>
              <h1>LGBT</h1>
            </div>
            <div className="col-span-2 space-y-3">
              <h1 className="text-gray-500">Tôn giáo</h1>
              <h1>Đạo 7 màu</h1>
            </div>
            <div className="col-span-2 space-y-3">
              <h1 className="text-gray-500">Quốc tịch</h1>
              <h1>Tiểu quốc Hà Nam</h1>
            </div>
          </div>
          <div className="space-y-3">
            <h1 className="text-gray-500">Địa chỉ thường trú</h1>
            <h1>123 đường A, phố B, huyện C, tỉnh D</h1>
          </div>
          <div className="space-y-3">
            <h1 className="text-gray-500">Địa chỉ hiện tại</h1>
            <h1>123 đường A, phố B, huyện C, tỉnh D</h1>
          </div>
          <div className="grid grid-cols-9 gap-10">
            <div className="col-span-2 space-y-3">
              <h1 className="text-gray-500">Trình độ học vấn</h1>
              <h1>100/12</h1>
            </div>

            <div className="col-span-3 space-y-3">
              <h1 className="text-gray-500">Nghề nghiệp</h1>
              <h1>Nấu dấm</h1>
            </div>

            <div className="col-span-4 space-y-3">
              <h1 className="text-gray-500">Nơi làm việc</h1>
              <h1>Trên giường</h1>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
