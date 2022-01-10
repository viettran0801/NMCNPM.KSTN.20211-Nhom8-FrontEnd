import { getSession } from "next-auth/react";
import moment from "moment";
import BaseLayout from "../components/layouts/BaseLayout";
import { convertTimeAgo, fetchAPI } from "../utils";
export default function Home({ metadata, recentActivities, meetings }) {
  return (
    <BaseLayout>
      <div className="px-5 py-10 space-y-20">
        <div className="grid grid-cols-4 gap-5">
          <div className="bg-white rounded-xl p-5 h-[150px] flex flex-col justify-between">
            <h1>Số lượng hộ khẩu</h1>
            <div className="space-y-5">
              <h1 className="font-medium text-2xl">{metadata.soHoKhau}</h1>
              <div className="h-1 bg-blue-700 w-full"></div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5  h-[150px] flex flex-col justify-between">
            <h1>Số lượng nhân khẩu</h1>
            <div className="space-y-5">
              <h1 className="font-medium text-2xl">{metadata.soNhanKhau}</h1>
              <div className="h-1 bg-yellow-500 w-full"></div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 h-[150px] flex flex-col justify-between">
            <h1>Số lượng nhân khẩu tạm vắng</h1>
            <div className="space-y-5">
              <h1 className="font-medium text-2xl">{metadata.soTamVang}</h1>
              <div className="h-1 bg-green-500 w-full"></div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5  h-[150px] flex flex-col justify-between">
            <h1>Số lượng nhân khẩu tạm trú</h1>
            <div className="space-y-5">
              <h1 className="font-medium text-2xl">{metadata.soTamTru}</h1>
              <div className="h-1 bg-purple-500 w-full"></div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-10 gap-5">
          <div className="col-span-7 bg-white rounded-xl p-5 space-y-10">
            <div className="border-b pb-5">
              <h1 className="text-lg">Danh sách cuộc họp gần đây</h1>
            </div>
            <div className="space-y-5">
              <div className="grid grid-cols-8 gap-1 text-gray-500">
                <h1>Trạng thái</h1>
                <h1>Người tạo</h1>
                <h1 className="col-span-2">Tiêu đề</h1>
                <h1 className="col-span-2">Thời gian</h1>
                <h1 className="col-span-2">Địa điểm</h1>
              </div>
              {meetings.map((meeting) => (
                <div className="grid grid-cols-8 gap-1" key={meeting.id}>
                  <h1>
                    {new Date(meeting.thoiGian) < Date.now()
                      ? "Đã diễn ra"
                      : "Chưa diễn ra"}
                  </h1>
                  <h1>{meeting.nguoiTao}</h1>
                  <h1 className="col-span-2">{meeting.tieuDe}</h1>
                  <h1 className="col-span-2">
                    {moment(meeting.thoiGian).format("hh:mm DD-MM-YYYY")}
                  </h1>
                  <h1 className="col-span-2">{meeting.diaDiem}</h1>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-3 bg-white rounded-xl p-5 space-y-10">
            <div className="border-b pb-5">
              <h1 className="text-lg">Hoạt động gần đây</h1>
            </div>
            <div className="space-y-5">
              {recentActivities.map((act) => (
                <div className="flex space-x-3" key={act.id}>
                  <div className="flex space-x-1 items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <h1 className="min-w-[100px] text-gray-700 italic">
                      {convertTimeAgo(act.time)}
                    </h1>
                  </div>
                  <h1>{act.mess}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

Home.auth = true;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  try {
    const [
      { result: metadata },
      {
        result: { content: recentActivities },
      },
      {
        result: { content: meetings },
      },
    ] = await Promise.all([
      fetchAPI("/api/v1/thongso", {
        token: session.token,
      }),
      fetchAPI("/api/v1/hoatdong", {
        params: {
          page: 0,
          size: 5,
        },
        token: session.token,
      }),
      fetchAPI("/api/v1/cuochop", {
        params: {
          page: 0,
          size: 5,
          sort: "thoiGian,DESC",
        },
        token: session.token,
      }),
    ]);
    return {
      props: { metadata, recentActivities, meetings },
    };
  } catch (err) {
    return {
      props: {},
    };
  }
}
