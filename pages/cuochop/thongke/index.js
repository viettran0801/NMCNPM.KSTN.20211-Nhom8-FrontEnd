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
import BaseLayout from "../../../components/layouts/BaseLayout";
import Link from "../../../components/common/Link";
import { Menu } from "@headlessui/react";
import Transition from "../../../components/common/Transition";

import { ChevronDownIcon } from "../../../components/icons";

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
          <div className="flex space-x-3 items-center">
            <h1 className="text-xl">Thống kê cuộc họp</h1>
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
            href="/cuochop"
            className="px-3 py-1 border-green-500 text-green-500 border rounded-lg"
          >
            Danh sách cuộc họp
          </Link>
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
        <div className="flex justify-between items-center pb-10 border-b">
          <h1 className="text-xl">Danh sách chủ hộ</h1>
        </div>
        <div>
          <div className="grid grid-cols-8 gap-5 text-gray-500">
            <h1>Mã hộ khẩu</h1>
            <h1 className="col-span-2">Họ và tên chủ hộ</h1>
            <h1 className="col-span-2">Địa chỉ</h1>
            <h1>Tham gia</h1>
            <h1>Vắng có lý do</h1>
            <h1>Vắng không có lý do</h1>
          </div>
          {familyFakes.map((item) => (
            <Link
              href={`/cuochop/thongke/${item.id}`}
              className="grid grid-cols-8 gap-5 hover:bg-gray-50 py-5 rounded duration-50"
              key={item.id}
            >
              <h1>{item.id}</h1>
              <h1 className="col-span-2">{item.name}</h1>
              <h1 className="col-span-2">{item.address}</h1>
              <h1>{item.attend}</h1>
              <h1>{item.absentWithReason}</h1>
              <h1>{item.asbentWithoutReason}</h1>
            </Link>
          ))}
        </div>
      </div>
    </BaseLayout>
  );
}

ThongKePage.auth = true;

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
      label: "Số cuộc họp",
      data: [
        733, 255, 366, 556, 223, 140, 222, 733, 255, 366, 556, 223, 140, 222,
      ],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
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

const familyFakes = [
  {
    id: 1,
    name: "Ha Thi Tuan",
    attend: 7,
    asbentWithoutReason: 5,
    absentWithReason: 3,
    address: "123 đường A, phố B, tỉnh C",
  },
  {
    id: 1,
    name: "Ha Thi Tuan",
    attend: 7,
    asbentWithoutReason: 5,
    absentWithReason: 3,

    address: "123 đường A, phố B, tỉnh C",
  },
  {
    id: 1,
    name: "Ha Thi Tuan",
    attend: 7,
    asbentWithoutReason: 5,
    absentWithReason: 3,

    address: "123 đường A, phố B, tỉnh C",
  },
  {
    id: 1,
    name: "Ha Thi Tuan",
    attend: 7,
    asbentWithoutReason: 5,
    absentWithReason: 3,
    address: "123 đường A, phố B, tỉnh C",
  },
  {
    id: 1,
    name: "Ha Thi Tuan",
    attend: 7,
    asbentWithoutReason: 5,
    absentWithReason: 3,
    address: "123 đường A, phố B, tỉnh C",
  },
];
const staticFilters = [
  { name: "1 tháng gần nhất" },
  { name: "3 tháng gần nhất" },
  { name: "1 năm gần nhất" },
  { name: "3 năm gần nhất" },
];
