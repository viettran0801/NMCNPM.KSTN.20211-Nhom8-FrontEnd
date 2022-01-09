import BaseLayout from "../../components/layouts/BaseLayout";
import Link from "../../components/common/Link";
import { PlusIcon } from "../../components/icons";
import { getSession } from "next-auth/react";
import { fetchAPI, parseInstantToDate } from "../../utils";
export default function TamVangPage({ tamVangs }) {
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
          {tamVangs.map((item) => (
            <Link
              href={`/tamvang/${item.id}`}
              className="grid grid-cols-8 gap-5 hover:bg-gray-50 py-5 rounded duration-50"
              key={item.id}
            >
              <h1>{item.id}</h1>
              <h1>{item.hoVaTen}</h1>
              <h1>{item.cccd}</h1>
              <h1>{item.gioiTinh}</h1>
              <h1 className="col-span-2">{item.diaChi}</h1>
              <h1>{parseInstantToDate(item.tuNgay)}</h1>
              <h1>{parseInstantToDate(item.denNgay)}</h1>
            </Link>
          ))}
        </div>
      </div>
    </BaseLayout>
  );
}

TamVangPage.auth = true;
export async function getServerSideProps(context) {
  const getTamVangUrl = "/api/v1/tamvang";
  const session = await getSession(context);

  try {
    const res = await fetchAPI(getTamVangUrl, {
      method: "GET",
      body: {},
      token: session.token,
      params: {},
    });

    const tamVangs = res.result.content;

    return {
      props: { tamVangs },
    };
  } catch (err) {
    console.error(err);
    return {
      props: { tamVangs: [] },
    };
  }
}
