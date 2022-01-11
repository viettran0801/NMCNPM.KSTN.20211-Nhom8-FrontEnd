import { getSession } from "next-auth/react";
import moment from "moment";
import BaseLayout from "../../components/layouts/BaseLayout";
import Link from "../../components/common/Link";
import { PlusIcon } from "../../components/icons";
import Paginate from "../../components/common/Paginate";
import { fetchAPI } from "../../utils";
import Search from "../../components/common/Search";

export default function CuochopPage({ dataMeetings, totalPages }) {
  return (
    <BaseLayout>
      <div className="m-5 rounded-2xl bg-white p-5 space-y-10">
        <div className="flex justify-between items-center pb-5 border-b">
          <h1 className="text-xl">Danh sách cuộc họp</h1>
          <div className="flex space-x-3">
            <Search />
            <Link
              href="/cuochop/add"
              className="flex items-center space-x-1 px-3 py-2 bg-blue-700 text-white rounded-lg hover:opacity-80 duration-300"
            >
              <PlusIcon />
              <span>Tạo cuộc họp mới</span>
            </Link>
            <Link
              href="/cuochop/thongke"
              className="flex items-center space-x-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:opacity-80 duration-300"
            >
              <span>Thống kê</span>
            </Link>
          </div>
        </div>
        <div className="">
          <div className="grid grid-cols-9 gap-5 text-gray-500">
            <h1>Trạng thái</h1>
            <h1>Người tạo</h1>

            <h1 className="col-span-2">Tiêu đề</h1>
            <h1>Thời gian</h1>
            <h1 className="col-span-2">Địa điểm</h1>
            <h1>Tham gia</h1>
            <h1>Vắng mặt</h1>
          </div>
          {dataMeetings.map((item) => (
            <Link
              href={`/cuochop/${item.id}`}
              className="grid grid-cols-9 gap-5 hover:bg-gray-50 py-5 rounded duration-50"
              key={item.id}
            >
              <h1>
                {new Date(item.thoiGian) < Date.now()
                  ? "Đã diễn ra"
                  : "Chưa diễn ra"}
              </h1>
              <h1>{item.nguoiTao}</h1>
              <h1 className="col-span-2">{item.tieuDe}</h1>
              <h1>{moment(item.thoiGian).format("hh:mm  DD-MM-YYYY")}</h1>
              <h1 className="col-span-2">{item.diaDiem}</h1>
              <h1>{item.thamGia}</h1>
              <h1>{item.vangMat}</h1>
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
CuochopPage.auth = true;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { page = 1, search = "" } = context.query;
  try {
    const {
      result: { content: dataMeetings },
      result: { totalPages },
    } = await fetchAPI("/api/v1/cuochop", {
      token: session.token,
      params: {
        page: page - 1,
        size: 5,
        sort: "id,DESC",
        keyword: search,
      },
    });

    return {
      props: { dataMeetings, totalPages }, // will be passed to the page component as props
    };
  } catch (err) {
    return {
      props: {},
    };
  }
}
