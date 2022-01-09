import { useRouter } from "next/router";
import { PencilIcon } from "../../../components/icons";
import BaseLayout from "../../../components/layouts/BaseLayout";
import Link from "../../../components/common/Link";

export default function TamtruDetailpage() {
  const { tamtruId } = useRouter().query;
  return (
    <BaseLayout>
      <div className="m-10 rounded-2xl bg-white p-10 space-y-10">
        <div className="flex justify-between items-center pb-10 border-b">
          <div className="flex items-center space-x-5">
            <h1 className="text-xl">Chi tiết tạm trú</h1>
            <Link
              href={`/tamtru/${tamtruId}/edit`}
              className="flex items-center space-x-3 px-3 py-2 bg-blue-700 text-white rounded-lg hover:opacity-80 duration-100"
            >
              <PencilIcon />
              <span>Chỉnh sửa</span>
            </Link>
          </div>

          <Link
            href="/tamtru"
            className="flex items-center  px-3 py-1 border-green-500 text-green-500 border rounded-lg hover:opacity-80 duration-100"
          >
            Quay lại danh sách tạm trú
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-20 gap-y-10">
          <div className="space-y-3">
            <h1 className="text-gray-500">Họ và tên</h1>
            <h1>Hà Thị Tú</h1>
          </div>
          <div className="space-y-3">
            <h1 className="text-gray-500">Số CMND/CCCD</h1>
            <h1>123456789</h1>
          </div>

          <div className="col-span-2 space-y-3">
            <h1 className="text-gray-500">Địa chỉ</h1>
            <h1>123 đường A, phố B, huyện C, tỉnh D</h1>
          </div>
          <div className="space-y-3">
            <h1 className="text-gray-500">Từ ngày</h1>
            <h1>10-10-1111</h1>
          </div>
          <div className="space-y-3">
            <h1 className="text-gray-500">Đến ngày</h1>
            <h1>10-10-1111</h1>
          </div>
          <div className="col-span-2 space-y-3">
            <h1 className="text-gray-500">Lý do</h1>
            <h1>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s,
            </h1>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

TamtruDetailpage.auth = true;
