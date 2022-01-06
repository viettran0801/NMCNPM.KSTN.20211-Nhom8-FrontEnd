import BaseLayout from "../../components/layouts/BaseLayout";
import Link from "../../components/common/Link";
import { PlusIcon } from "../../components/icons";

export default function HoKhauPage() {
  return (
    <BaseLayout>
      <div className="m-10 rounded-2xl bg-white p-10 space-y-10">
        <div className="flex justify-between items-center pb-10 border-b">
          <h1 className="text-xl">Danh sách hộ khẩu</h1>
          <Link
            href="/hokhau/add"
            className="flex items-center space-x-1 px-3 py-2 bg-blue-700 text-white rounded-lg hover:scale-105 duration-300"
          >
            <PlusIcon />
            <span>Thêm hộ khẩu mới</span>
          </Link>
        </div>
        <div className="">
          <div className="grid grid-cols-5 gap-5 text-gray-500">
            <h1>Mã hộ khẩu</h1>
            <h1>Chủ hộ</h1>
            <h1 className="col-span-3">Địa chỉ</h1>
          </div>
          {hokhauFakes.map((item) => (
            <Link
              href={`/hokhau/${item.id}`}
              className="grid grid-cols-5 gap-5 hover:bg-gray-50 py-5 rounded duration-50"
              key={item.id}
            >
              <h1>{item.id}</h1>
              <h1>{item.owner}</h1>
              <h1 className="col-span-3">{item.addres}</h1>
            </Link>
          ))}
        </div>
      </div>
    </BaseLayout>
  );
}

const hokhauFakes = [
  {
    id: "0001",
    owner: "Hà Thị Tuấn",
    addres: "123 đường A, phố B, huyện C, tỉnh D",
  },
  {
    id: "0001",
    owner: "Hà Thị Tuấn",
    addres: "123 đường A, phố B, huyện C, tỉnh D",
  },
  {
    id: "0001",
    owner: "Hà Thị Tuấn",
    addres: "123 đường A, phố B, huyện C, tỉnh D",
  },
  {
    id: "0001",
    owner: "Hà Thị Tuấn",
    addres: "123 đường A, phố B, huyện C, tỉnh D",
  },
  {
    id: "0001",
    owner: "Hà Thị Tuấn",
    addres: "123 đường A, phố B, huyện C, tỉnh D",
  },
  {
    id: "0001",
    owner: "Hà Thị Tuấn",
    addres: "123 đường A, phố B, huyện C, tỉnh D",
  },
];
