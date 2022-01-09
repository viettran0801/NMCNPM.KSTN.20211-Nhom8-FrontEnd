import BaseLayout from "../../components/layouts/BaseLayout";
import Link from "../../components/common/Link";
import { fetchAPI, parseInstantToDateTime } from "../../utils";
import { getSession } from "next-auth/react";
export default function NhankhauPage({ nhanKhaus }) {
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
      </div>
    </BaseLayout>
  );
}
NhankhauPage.auth = true;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  try {
    const {
      result: { content: nhanKhaus },
    } = await fetchAPI("/api/v1/nhankhau", {
      method: "GET",
      body: {},
      token: session.token,
      params: {},
    });

    return {
      props: { nhanKhaus },
    };
  } catch (err) {
    console.error(err);
    return {
      props: { nhanKhaus: [] },
    };
  }
}
