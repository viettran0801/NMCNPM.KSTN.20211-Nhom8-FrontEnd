import React from "react";
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
import { Tab } from "@headlessui/react";
import BaseLayout from "../../../components/layouts/BaseLayout";
import Link from "../../../components/common/Link";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function ThongKePage() {
  return (
    <BaseLayout>
      <div className="m-10 rounded-2xl bg-white p-10 space-y-10">
        <div className="flex justify-between items-center pb-10 border-b">
          <h1 className="text-xl">Thống kê cuộc họp theo chủ hộ</h1>
          <Link
            href="/cuochop"
            className="px-3 py-1 border-green-500 text-green-500 border rounded-lg"
          >
            Thống kê cuộc họp
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-20 pb-10 border-b">
          <div className="space-y-3">
            <h1 className="text-gray-500">Họ và tên chủ hộ</h1>
            <h1>Hà Thị Tú</h1>
          </div>
          <div className="space-y-3">
            <h1 className="text-gray-500">Địa chỉ</h1>
            <h1>123 đường A, phố B, huyện C, tỉnh D</h1>
          </div>
        </div>
        <div className="flex items-center space-x-20">
          <div className="w-[800px]">
            <Bar data={data} />
          </div>
          <div className="w-[300px]">
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
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            {cuochopFakes.map((meetings) => (
              <Tab.Panel>
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
                    <h1>{item.creator}</h1>
                    <h1 className="col-span-2">{item.title}</h1>
                    <h1>{item.time}</h1>
                    <h1 className="col-span-2">{item.address}</h1>
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
