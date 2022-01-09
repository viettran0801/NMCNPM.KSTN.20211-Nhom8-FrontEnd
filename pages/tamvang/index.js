import BaseLayout from "../../components/layouts/BaseLayout";
import Link from "../../components/common/Link";
import { PlusIcon } from "../../components/icons";

export default function TamVangPage() {
  return (
    <BaseLayout>
      <div className="m-10 rounded-2xl bg-white p-10 space-y-10">
        <div className="flex justify-between items-center pb-10 border-b">
          <h1 className="text-xl">Danh sách tạm vắng</h1>
          <Link
            href="/tamvang/add"
            className="flex items-center space-x-1 px-3 py-2 bg-blue-700 text-white rounded-lg hover:scale-105 duration-300"
          >
            <PlusIcon />
            <span>Thêm nhân khẩu tạm vắng</span>
          </Link>
        </div>
        <div className="">
          <div className="grid grid-cols-8 gap-5 text-gray-500">
            <h1>ID</h1>
            <h1>Họ tên</h1>
            <h1>Mã CMND/CCCD</h1>
            <h1>Giới tính</h1>
            <h1 className="col-span-2">Địa chỉ</h1>
            <h1>Từ ngày</h1>
            <h1>Đến ngày</h1>
          </div>
          {tamvangFakes.map((item) => (
            <Link
              href={`/tamvang/${item.id}`}
              className="grid grid-cols-8 gap-5 hover:bg-gray-50 py-5 rounded duration-50"
              key={item.id}
            >
              <h1>{item.id}</h1>
              <h1>{item.name}</h1>
              <h1>{item.identityNumber}</h1>
              <h1>{item.gender}</h1>
              <h1 className="col-span-2">{item.address}</h1>
              <h1>{item.fromDate}</h1>
              <h1>{item.toDate}</h1>
            </Link>
          ))}
        </div>
      </div>
    </BaseLayout>
  );
}

TamVangPage.auth = true;

const tamvangFakes = [
  {
    id: "0001",
    name: "Hà Thị Tuấn",
    address: "123 đường A, phố B, huyện C, tỉnh D",
    gender: "Gay",
    identityNumber: 123456789,
    fromDate: "16-10-1999",
    toDate: "20-10-1999",
  },
  {
    id: "0001",
    name: "Hà Thị Tuấn",
    address: "123 đường A, phố B, huyện C, tỉnh D",
    gender: "Gay",
    identityNumber: 123456789,
    fromDate: "16-10-1999",
    toDate: "20-10-1999",
  },
  {
    id: "0001",
    name: "Hà Thị Tuấn",
    address: "123 đường A, phố B, huyện C, tỉnh D",
    gender: "Gay",
    identityNumber: 123456789,
    fromDate: "16-10-1999",
    toDate: "20-10-1999",
  },
  {
    id: "0001",
    name: "Hà Thị Tuấn",
    address: "123 đường A, phố B, huyện C, tỉnh D",
    gender: "Gay",
    identityNumber: 123456789,
    fromDate: "16-10-1999",
    toDate: "20-10-1999",
  },
  {
    id: "0001",
    name: "Hà Thị Tuấn",
    address: "123 đường A, phố B, huyện C, tỉnh D",
    gender: "Gay",
    identityNumber: 123456789,
    fromDate: "16-10-1999",
    toDate: "20-10-1999",
  },
];
