import BaseLayout from "../../components/layouts/BaseLayout";
import Link from "../../components/common/Link";
import { PlusIcon } from "../../components/icons";
import { getSession } from "next-auth/react";
import { fetchAPI } from "../../utils";
import moment from "moment";

import Paginate from "../../components/common/Paginate";
export default function TamVangPage({ tamVangs, totalPages }) {
  return (
    <BaseLayout>
      <div className="m-5 rounded-2xl bg-white p-5 space-y-10">
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
          <div className="grid grid-cols-7 gap-5 text-gray-500">
            <h1>ID</h1>
            <h1>Họ tên</h1>
            <h1>Mã CMND/CCCD</h1>
            <h1 className="col-span-2">Địa chỉ</h1>
            <h1>Từ ngày</h1>
            <h1>Đến ngày</h1>
          </div>
          {tamVangs.map((item) => (
            <Link
              href={`/tamvang/${item.id}`}
              className="grid grid-cols-7 gap-5 hover:bg-gray-50 py-5 rounded duration-50"
              key={item.id}
            >
              <h1>{item.id}</h1>
              <h1>{item.hoVaTen}</h1>
              <h1>{item.cccd}</h1>
              <h1 className="col-span-2">{item.diaChi}</h1>
              <h1>{moment(item.tuNgay).format("DD-MM-YYYY")}</h1>
              <h1>{moment(item.denNgay).format("DD-MM-YYYY")}</h1>
            </Link>
          ))}
        </div>
        <div className="flex justify-end">
          <Paginate pageCount={totalPages} />
        </div>
      </div>
    </BaseLayout>
  );
}

TamVangPage.auth = true;
export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { page = 1 } = context.query;
  try {
    const {
      result: { content: tamVangs },
      result: { totalPages },
    } = await fetchAPI("/api/v1/tamvang", {
      token: session.token,
      params: { page: page - 1, size: 5, sort: "id,asc" },
    });
    return {
      props: { tamVangs, totalPages },
    };
  } catch (err) {
    console.error(err);
    return {
      props: { tamVangs: [] },
    };
  }
}
