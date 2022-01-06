import BaseLayout from "../../components/layouts/BaseLayout";
import Link from "../../components/common/Link";
import { PencilIcon, PlusIcon, TrashIcon } from "../../components/icons";

export default function NhankhauPage() {
  return (
    <BaseLayout>
      <div className="m-10 rounded-2xl bg-white p-10 space-y-10">
        <div className="flex justify-between items-center pb-10 border-b">
          <h1 className="text-xl">Danh sách nhân khẩu</h1>
        </div>
        <div className="">
          <div className="grid grid-cols-7 gap-5 text-gray-500">
            <h1>ID</h1>
            <h1>Họ tên</h1>
            <h1>Mã CMND/CCCD</h1>
            <h1>Giới tính</h1>
            <h1 className="col-span-3">Địa chỉ</h1>
          </div>
          {nhankhauFakes.map((item) => (
            <Link
              href={`/nhankhau/${item.id}`}
              className="grid grid-cols-7 gap-5 hover:bg-gray-50 py-5 rounded duration-50"
              key={item.id}
            >
              <h1>{item.id}</h1>
              <h1>{item.name}</h1>
              <h1>{item.identityNumber}</h1>
              <h1>{item.gender}</h1>
              <h1 className="col-span-3">{item.address}</h1>
            </Link>
          ))}
        </div>
      </div>
    </BaseLayout>
  );
}

const nhankhauFakes = [
  {
    id: "0001",
    name: "Hà Thị Tuấn",
    address: "123 đường A, phố B, huyện C, tỉnh D",
    gender: "Gay",
    identityNumber: 123456789,
  },
  {
    id: "0001",
    name: "Hà Thị Tuấn",
    address: "123 đường A, phố B, huyện C, tỉnh D",
    gender: "Gay",
    identityNumber: 123456789,
  },
  {
    id: "0001",
    name: "Hà Thị Tuấn",
    address: "123 đường A, phố B, huyện C, tỉnh D",
    gender: "Gay",
    identityNumber: 123456789,
  },
  {
    id: "0001",
    name: "Hà Thị Tuấn",
    address: "123 đường A, phố B, huyện C, tỉnh D",
    gender: "Gay",
    identityNumber: 123456789,
  },
  {
    id: "0001",
    name: "Hà Thị Tuấn",
    address: "123 đường A, phố B, huyện C, tỉnh D",
    gender: "Gay",
    identityNumber: 123456789,
  },
];
