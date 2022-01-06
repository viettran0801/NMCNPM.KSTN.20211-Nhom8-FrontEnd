import { useRouter } from "next/router";
import { PencilIcon } from "../../../components/icons";
import BaseLayout from "../../../components/layouts/BaseLayout";
import Link from "../../../components/common/Link";

export default function HoKhauDetailpage() {
  const { hokhauId } = useRouter().query;
  return (
    <BaseLayout>
      <div className="m-10 rounded-2xl bg-white p-10 space-y-10">
        <div className="flex justify-between items-center pb-10 border-b">
          <h1 className="text-xl">{`Chi tiết hộ khẩu mã ${hokhauId}`} </h1>
          <Link
            href={`/hokhau/${hokhauId}/edit`}
            className="flex items-center space-x-3 px-3 py-2 bg-blue-700 text-white rounded-lg hover:scale-105 duration-300"
          >
            <PencilIcon />
            <span>Chỉnh sửa</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-20 gap-y-10">
          <div className="space-y-3">
            <h1 className="text-gray-500">Họ và tên chủ hộ</h1>
            <h1>Hà Thị Tú</h1>
          </div>
          <div className="space-y-3">
            <h1 className="text-gray-500">Số CMND/CCCD của chủ hộ</h1>
            <h1>123456789</h1>
          </div>
          <div className=" col-span-2 space-y-3">
            <h1 className="text-gray-500">Địa chỉ</h1>
            <h1>123 đường A, phố B, huyện C, tỉnh D</h1>
          </div>
        </div>
        <div className="space-y-5">
          <div className="flex items-center space-x-20 pb-5 border-b">
            <h1 className="text-xl">Danh sách thành viên</h1>
          </div>
          <div className="w-[600px]">
            <div className="grid grid-cols-3 gap-10 text-gray-500">
              <h1>Họ và tên</h1>
              <h1>Ngày sinh</h1>
              <h1>Quan hệ với chủ hộ</h1>
            </div>
            {thanhvienFakes.map((person) => (
              <div className="grid grid-cols-3 gap-10 py-3 hover:bg-gray-50 duration-100">
                <Link
                  href={`/nhankhau/${person.id}`}
                  className="hover:underline decoration-blue-700"
                >
                  {person.name}
                </Link>
                <h1>{person.bod}</h1>
                <h1>{person.relation}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

const thanhvienFakes = [
  {
    id: 1,
    name: "Ha thi Tu",
    bod: "2020/1/1",
    relation: "Con",
  },
  { id: 1, name: "Ha thi Tu", bod: "2020/1/1", relation: "Con" },
  { id: 1, name: "Ha thi Tu", bod: "2020/1/1", relation: "Con" },
  { id: 1, name: "Ha thi Tu", bod: "2020/1/1", relation: "Con" },
];
