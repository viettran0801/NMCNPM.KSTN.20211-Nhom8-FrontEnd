import { getSession } from "next-auth/react";
import BaseLayout from "../components/layouts/BaseLayout";
import { fetchAPI } from "../utils";

export default function Home({ metadata }) {
  return (
    <BaseLayout>
      <div className="p-10 space-y-40">
        <div className="grid grid-cols-4 gap-5">
          <div className="bg-white rounded-xl p-5 space-y-5">
            <h1>Số lượng hộ khẩu</h1>
            <h1 className="font-medium text-2xl">{metadata.soHoKhau}</h1>
            <div className="h-1 bg-blue-700 w-full"></div>
          </div>
          <div className="bg-white rounded-xl p-5 space-y-5">
            <h1>Số lượng nhân khẩu</h1>
            <h1 className="font-medium text-2xl">{metadata.soNhanKhau}</h1>
            <div className="h-1 bg-yellow-500 w-full"></div>
          </div>
          <div className="bg-white rounded-xl p-5 space-y-5">
            <h1>Số lượng nhân khẩu tạm vắng</h1>
            <h1 className="font-medium text-2xl">{metadata.soTamVang}</h1>
            <div className="h-1 bg-green-500 w-full"></div>
          </div>
          <div className="bg-white rounded-xl p-5 space-y-5">
            <h1>Số lượng nhân khẩu tạm trú</h1>
            <h1 className="font-medium text-2xl">{metadata.soTamTru}</h1>
            <div className="h-1 bg-purple-500 w-full"></div>
          </div>
        </div>
        <div className="grid grid-cols-10 gap-5">
          <div className="col-span-7 bg-white rounded-xl p-5 space-y-10">
            <div className="border-b pb-5">
              <h1 className="text-xl">Danh sách cuộc họp</h1>
            </div>
            <div className="space-y-5">
              <div className="grid grid-cols-8 gap-5 text-gray-500">
                <h1>Trạng thái</h1>
                <h1>Người tạo</h1>
                <h1 className="col-span-2">Tiêu đề</h1>
                <h1 className="col-span-2">Thời gian</h1>
                <h1 className="col-span-2">Địa điểm</h1>
              </div>
              {meetingFakes.map((meeting) => (
                <div className="grid grid-cols-8 gap-5" key={meeting.creator}>
                  <h1>{meeting.status}</h1>
                  <h1>{meeting.creator}</h1>
                  <h1 className="col-span-2">{meeting.title}</h1>
                  <h1 className="col-span-2">{meeting.time}</h1>
                  <h1 className="col-span-2">{meeting.location}</h1>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-3 bg-white rounded-xl p-5 space-y-10">
            <div className="border-b pb-5">
              <h1 className="text-xl">Hoạt động gần đây</h1>
            </div>
            <div className="space-y-5">
              {recentActivityFakes.map((act) => (
                <div className="flex space-x-3" key={act.id}>
                  <div className="flex space-x-3 items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <h1 className="min-w-[100px] text-gray-700 italic">
                      {act.time}
                    </h1>
                  </div>
                  <h1>{act.desciption}</h1>
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
    const { result: metadata } = await fetchAPI("/api/v1/thongso", {
      token: session.token,
    });
    return {
      props: { metadata },
    };
  } catch (err) {
    return {
      props: {},
    };
  }
}

const recentActivityFakes = [
  {
    id: 1,
    time: "5 phút trước",
    desciption: "Thêm hộ khẩu mớ",
  },
  {
    id: 2,
    time: "5 phút trước",
    desciption: "Thêm hộ khẩu mớ asdasdasdasd dsd sd sd s",
  },
  {
    id: 3,
    time: "5 phút trước",
    desciption: "Thêm hộ khẩu mớ",
  },
  {
    id: 4,
    time: "5 phút trước",
    desciption: "Thêm hộ khẩu mớ",
  },
  {
    id: 5,
    time: "5 phút trước",
    desciption: "Thêm hộ khẩu mớ",
  },
  {
    id: 6,
    time: "5 phút trước",
    desciption: "Thêm hộ khẩu mớ",
  },
];

const meetingFakes = [
  {
    status: "Đang họp",
    creator: "Minh thu",
    title: "Họp tổng kết tháng 11",
    time: "13:00 31/11/2021",
    location: "Nhà văn hóa thông thôn, đường A",
  },
  {
    status: "Đang họp",
    creator: "Minh thu",
    title: "Họp tổng kết tháng 11",
    time: "13:00 31/11/2021",
    location: "Nhà văn hóa thông thôn, đường A",
  },
  {
    status: "Đang họp",
    creator: "Minh thu",
    title: "Họp tổng kết tháng 11",
    time: "13:00 31/11/2021",
    location: "Nhà văn hóa thông thôn, đường A",
  },
  {
    status: "Đang họp",
    creator: "Minh thu",
    title: "Họp tổng kết tháng 11",
    time: "13:00 31/11/2021",
    location: "Nhà văn hóa thông thôn, đường A",
  },
  {
    status: "Đang họp",
    creator: "Minh thu",
    title: "Họp tổng kết tháng 11",
    time: "13:00 31/11/2021",
    location: "Nhà văn hóa thông thôn, đường A",
  },
];
