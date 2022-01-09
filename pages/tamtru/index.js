import BaseLayout from "../../components/layouts/BaseLayout";
import Link from "../../components/common/Link";
import { PlusIcon } from "../../components/icons";
import { fetchAPI } from "../../utils";
import { getSession } from "next-auth/react";

export default function TamtruPage({ tamtrus }) {
  return (
    <BaseLayout>
      <div className="m-10 rounded-2xl bg-white p-10 space-y-10">
        <div className="flex justify-between items-center pb-10 border-b">
          <h1 className="text-xl">Danh sách tạm trú</h1>
          <Link
            href="/tamtru/add"
            className="flex items-center space-x-1 px-3 py-2 bg-blue-700 text-white rounded-lg hover:scale-105 duration-300"
          >
            <PlusIcon />
            <span>Thêm nhân khẩu tạm trú</span>
          </Link>
        </div>
        <div className="">
          <div className="grid grid-cols-7 gap-5 text-gray-500">
            <h1>ID</h1>
            <h1>Họ tên</h1>
            <h1>Mã CMND/CCCD</h1>
            <h1 className="col-span-2">Địa chỉ</h1>
            <h1>Từ ngày</h1>
            <h1>Đến ngày</h1>
          </div>
          {tamtrus.map((tamtru) => (
            <Link
              href={`/tamtru/${tamtru.id}`}
              className="grid grid-cols-7 gap-5 hover:bg-gray-50 py-5 rounded duration-50"
              key={tamtru.id}
            >
              <h1>{tamtru.id}</h1>
              <h1>{tamtru.hoVaTen}</h1>
              <h1>{tamtru.cccd}</h1>
              <h1 className="col-span-2">{tamtru.diaChi}</h1>
              <h1>{tamtru.tuNgay}</h1>
              <h1>{tamtru.denNgay}</h1>
            </Link>
          ))}
        </div>
      </div>
    </BaseLayout>
  );
}
TamtruPage.auth = true;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  try {
    const {
      result: { content: tamtrus },
    } = await fetchAPI("/api/v1/tamtru", {
      params: {
        page: 0,
        size: 10,
      },
      token: session.token,
    });
    return {
      props: {
        tamtrus,
      },
    };
  } catch (err) {
    console.log(err.message);
    return {
      props: {},
    };
  }
}
