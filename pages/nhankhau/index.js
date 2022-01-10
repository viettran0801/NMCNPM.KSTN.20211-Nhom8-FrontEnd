import BaseLayout from "../../components/layouts/BaseLayout";
import Link from "../../components/common/Link";
import { fetchAPI } from "../../utils";
import { getSession } from "next-auth/react";
import Paginate from "../../components/common/Paginate";
export default function NhankhauPage({ nhanKhaus, totalPages }) {
  return (
    <BaseLayout>
      <div className="m-5 rounded-2xl bg-white py-10 px-5 space-y-10">
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
          {nhanKhaus.map((item) => (
            <Link
              href={`/nhankhau/${item.id}`}
              className="grid grid-cols-7 gap-5 hover:bg-gray-50 py-5 rounded duration-50"
              key={item.id}
            >
              <h1>{item.id}</h1>
              <h1>{item.hoVaTen}</h1>
              <h1>{item.cccd}</h1>
              <h1>{item.gioiTinh}</h1>
              <h1 className="col-span-3">{item.noiThuongTru}</h1>
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
NhankhauPage.auth = true;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { page = 1 } = context.query;
  try {
    const {
      result: { content: nhanKhaus },
      result: { totalPages },
    } = await fetchAPI("/api/v1/nhankhau", {
      token: session.token,
      params: { page: page - 1, size: 5, sort: "id,asc" },
    });

    return {
      props: { nhanKhaus, totalPages },
    };
  } catch (err) {
    console.error(err);
    return {
      props: { nhanKhaus: [] },
    };
  }
}
