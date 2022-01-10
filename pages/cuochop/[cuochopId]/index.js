import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import moment from "moment";
import { PencilIcon } from "../../../components/icons";
import BaseLayout from "../../../components/layouts/BaseLayout";
import Link from "../../../components/common/Link";
import { fetchAPI } from "../../../utils";
export default function CuochopDetailpage({ meetingDetail, diemDanh }) {
  const { cuochopId } = useRouter().query;
  return (
    <BaseLayout>
      <div className="m-10 rounded-2xl bg-white p-10 space-y-10">
        <div className="flex justify-between items-center pb-10 border-b">
          <div className="flex items-center space-x-5">
            <h1 className="text-xl">Chi tiết cuộc họp</h1>
            <Link
              href={`/cuochop/${cuochopId}/edit`}
              className="flex items-center space-x-3 px-3 py-2 bg-blue-700 text-white rounded-lg hover:opacity-80 duration-100"
            >
              <PencilIcon />
              <span>Chỉnh sửa</span>
            </Link>
            <Link
              href={`/cuochop/${cuochopId}/diemdanh`}
              className="flex items-center space-x-3 px-3 py-2 bg-green-700 text-white rounded-lg hover:opacity-80 duration-100"
            >
              <span>Điểm danh</span>
            </Link>
          </div>

          <Link
            href="/cuochop"
            className="flex items-center  px-3 py-1 border-green-500 text-green-500 border rounded-lg hover:opacity-80 duration-100"
          >
            Danh sách cuộc họp
          </Link>
        </div>
        <div className="space-y-10 pb-10 border-b">
          <div className="space-y-3">
            <h1 className="text-gray-500">Tiêu đề</h1>
            <h1>{meetingDetail.tieuDe}</h1>
          </div>
          <div className="grid grid-cols-3 gap-10">
            <div className="space-y-3">
              <h1 className="text-gray-500">Thời gian</h1>
              <h1>
                {moment(meetingDetail.thoiGian).format("hh:mm DD-MM-YYYY")}
              </h1>
            </div>
            <div className="space-y-3 col-span-2">
              <h1 className="text-gray-500">Địa điểm</h1>
              <h1>{meetingDetail.diaDiem}</h1>
            </div>
          </div>
          <div className="space-y-3">
            <h1 className="text-gray-500">Nội dung cuộc họp</h1>
            <h1>{meetingDetail.noiDung}</h1>
          </div>
          <div className="space-y-3">
            <h1 className="text-gray-500">Bản báo cáo cuộc họp</h1>
            <h1>{meetingDetail.banBaoCao}</h1>
          </div>
        </div>
        <div className="space-y-3">
          <h1>Danh sách tham gia</h1>
          <div>
            <div className="grid grid-cols-4 gap-5 text-gray-500 py-3">
              <h1>Tên</h1>
              <h1>Tham gia</h1>
              <h1 className="col-span-2">Lý do</h1>
            </div>
            {diemDanh.map((person) => (
              <Link
                href={`/cuochop/thongke/${person.hoKhau}`}
                className="grid grid-cols-4 gap-5 hover:bg-gray-50 py-3 rounded duration-50"
                key={person.hoKhau}
              >
                <h1>{person.hoTenChuHo}</h1>
                <input type="checkbox" checked={person.diemDanh} readOnly />
                <h1 className="col-span-2">{person.lyDo}</h1>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export async function getServerSideProps(context) {
  const { cuochopId } = context.query;
  const session = await getSession(context);

  try {
    const { result: meetingDetail } = await fetchAPI(
      `/api/v1/cuochop/${cuochopId}`,
      {
        token: session.token,
      }
    );
    const { result: diemDanh } = await fetchAPI(
      `/api/v1/cuochop/${cuochopId}/diemdanh`,
      {
        token: session.token,
      }
    );

    return {
      props: { meetingDetail, diemDanh },
    };
  } catch (err) {
    return {
      props: {},
    };
  }
}

CuochopDetailpage.auth = true;
