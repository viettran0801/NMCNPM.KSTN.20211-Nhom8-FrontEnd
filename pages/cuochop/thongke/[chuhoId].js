import React, { Fragment } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { Tab, Menu } from "@headlessui/react";
import BaseLayout from "../../../components/layouts/BaseLayout";
import Link from "../../../components/common/Link";
import { ChevronDownIcon } from "../../../components/icons";
import Transition from "../../../components/common/Transition";
import moment from "moment";
import { fetchAPI } from "../../../utils";
import { getSession } from "next-auth/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function ThongKePage({ participantDetail, listMeetings }) {
  return (
    <BaseLayout>
      <div className="m-10 rounded-2xl bg-white p-10 space-y-10">
        <div className="flex justify-between items-center pb-10 border-b">
          <div className="flex space-x-3 items-center">
            <h1 className="text-xl">Thống kê cuộc họp theo chủ hộ</h1>
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-3 px-3 py-2 border border-gray-300 rounded-lg hover:opacity-80 duration-100 focus:outline-none">
                <span>1 năm gần nhất</span>
                <ChevronDownIcon className="w-5 h-5" />
              </Menu.Button>
              <Transition>
                <Menu.Items className="absolute right-0 w-56 mt-2 bg-white divide-y rounded-md shadow-lg focus:outline-none">
                  {staticFilters.map((staticFilter) => (
                    <Menu.Item key={staticFilter.name}>
                      {({ active }) => (
                        <button className="text-left w-full block px-3 py-2 hover:bg-blue-300 hover:text-white duration-100">
                          {staticFilter.name}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <Link
            href="/cuochop/thongke"
            className="px-3 py-1 border-green-500 text-green-500 border rounded-lg"
          >
            Thống kê cuộc họp
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-20 pb-10 border-b">
          <div className="space-y-3">
            <h1 className="text-gray-500">Họ và tên chủ hộ</h1>
            <h1>{participantDetail.hoTenChuHo}</h1>
          </div>
          <div className="space-y-3">
            <h1 className="text-gray-500">Địa chỉ</h1>
            <h1>{participantDetail.diaChi}</h1>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-10">
          <div className="col-span-2 flex items-center">
            <Bar data={data} />
          </div>
          <div className="flex items-center">
            <Pie data={data2} />
          </div>
        </div>
      </div>
      <div className="m-10 rounded-2xl bg-white p-10 space-y-10">
        <Tab.Group>
          <Tab.List className="flex w-[800px] rounded-lg overflow-hidden divide-x-2">
            {tabs.map((tab) => (
              <Tab
                className={({ selected }) =>
                  `w-full py-3 text-gray-500 bg-gray-100 focus:outline-none duration-300 ${
                    selected
                      ? "text-blue-700 bg-blue-200 shadow"
                      : "hover:text-blue-500 hover:bg-blue-50"
                  }`
                }
                key={tab}
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            {listMeetings.map((meetings) => (
              <Tab.Panel key={meetings.length}>
                <div className="grid grid-cols-6 gap-5 text-gray-500">
                  <h1>Người tạo</h1>
                  <h1 className="col-span-2">Tiêu đề</h1>
                  <h1>Thời gian</h1>
                  <h1 className="col-span-2">Địa điểm</h1>
                </div>
                {meetings.map((item) => (
                  <Link
                    href={`/cuochop/${item.id}`}
                    className="grid grid-cols-6 gap-5 hover:bg-gray-50 py-5 rounded duration-50"
                    key={item.id}
                  >
                    <h1>{item.nguoiTao}</h1>
                    <h1 className="col-span-2">{item.tieuDe}</h1>
                    <h1>{moment(item.thoiGian).format("hh:mm DD-MM-YYYY")}</h1>
                    <h1 className="col-span-2">{item.diaDiem}</h1>
                  </Link>
                ))}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </BaseLayout>
  );
}

ThongKePage.auth = true;

export async function getServerSideProps(context) {
  const session = getSession(context);
  const { chuhoId } = context.query;

  try {
    const { result: participantDetail } = await fetchAPI(
      `/api/v1/cuochop/thongkenguoithamgia/${chuhoId}`,
      {
        token: session.token,
        params: {
          years: 1,
        },
      }
    );

    var listMeetings = [];
    listMeetings.push(participantDetail.cuocHopThamGia);
    listMeetings.push(participantDetail.cuocHopVangCoLyDo);
    listMeetings.push(participantDetail.cuocHopVangKhongLyDo);

    return {
      props: { participantDetail, listMeetings },
    };
  } catch (err) {
    console.error(err);
    return {
      props: { participantDetail: {}, listMeetings: [] },
    };
  }
}

const data = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ],
  datasets: [
    {
      label: "Số cuộc họp tham gia",
      data: [
        733, 255, 366, 556, 223, 140, 222, 733, 255, 366, 556, 223, 140, 222,
      ],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Số cuộc họp vắng có lý do",
      data: [
        140, 222, 733, 255, 366, 556, 223, 140, 222, 733, 255, 366, 556, 223,
      ],
      backgroundColor: "rgba(255, 206, 86, 0.2)",
    },
    {
      label: "Số cuộc họp vắng không có lý do",
      data: [
        366, 556, 223, 140, 222, 733, 255, 366, 556, 223, 140, 222, 733, 255,
      ],
      backgroundColor: "rgba(54, 162, 235, 0.2)",
    },
  ],
};

const data2 = {
  labels: ["Tham gia", "Vắng không có lý do", "Vắng có lý do"],
  datasets: [
    {
      data: [12, 19, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 159, 64, 1)",
      ],
    },
  ],
};

const tabs = ["Tham gia", "Vắng có lý do", "Vắng không có lý do"];

const staticFilters = [
  { name: "1 tháng gần nhất" },
  { name: "3 tháng gần nhất" },
  { name: "1 năm gần nhất" },
  { name: "3 năm gần nhất" },
];

const cuochopFakes = [
  [
    {
      id: 1,
      creator: "Hà Thị Tuấn",
      address: "123 đường A, phố B, huyện C, tỉnh D",
      title: "Họp thông đít",
      time: "13:00 13/3/1333",
    },
    {
      id: 1,
      creator: "Hà Thị Tuấn",
      address: "123 đường A, phố B, huyện C, tỉnh D",
      title: "Họp thông đít",
      time: "13:00 13/3/1333",
    },
    {
      id: 1,
      creator: "Hà Thị Tuấn",
      address: "123 đường A, phố B, huyện C, tỉnh D",
      title: "Họp thông đít",
      time: "13:00 13/3/1333",
    },
    {
      id: 1,
      creator: "Hà Thị Tuấn",
      address: "123 đường A, phố B, huyện C, tỉnh D",
      title: "Họp thông đít",
      time: "13:00 13/3/1333",
    },
    {
      id: 1,
      creator: "Hà Thị Tuấn",
      address: "123 đường A, phố B, huyện C, tỉnh D",
      title: "Họp thông đít",
      time: "13:00 13/3/1333",
    },
  ],
  [
    {
      id: 1,
      creator: "Hà Thị Trung",
      address: "123 đường A, phố B, huyện C, tỉnh D",
      title: "Họp thông đít",
      time: "13:00 13/3/1333",
    },
    {
      id: 1,
      creator: "Hà Thị Trung",
      address: "123 đường A, phố B, huyện C, tỉnh D",
      title: "Họp thông đít",
      time: "13:00 13/3/1333",
    },
    {
      id: 1,
      creator: "Hà Thị Trung",
      address: "123 đường A, phố B, huyện C, tỉnh D",
      title: "Họp thông đít",
      time: "13:00 13/3/1333",
    },
  ],
  [
    {
      id: 1,
      creator: "Hà Thị Gay",
      address: "123 đường A, phố B, huyện C, tỉnh D",
      title: "Họp thông đít",
      time: "13:00 13/3/1333",
    },
  ],
];
