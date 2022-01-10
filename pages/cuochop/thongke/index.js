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
import { fetchAPI } from "../../../utils";
import { getSession } from "next-auth/react";
import Moment from "moment";
import { extendMoment } from "moment-range";
import { split } from "moment-range-split";
import { useRouter } from "next/router";

const moment = extendMoment(Moment);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const options = {
  scales: {
    y: {
      ticks: {
        beginAtZero: true,
        callback: function (value) {
          if (value % 1 === 0) {
            return value;
          }
        },
      },
      suggestedMax: 5,
    },
  },
};

export default function ThongKePage({ participants, thongke }) {
  const { year = 1 } = useRouter().query;

  const current = new Date();
  const before = new Date();
  before.setMonth(current.getMonth() - 12 * year);
  const range = moment.range(before, current);
  const ranges = split(range, "months");
  console.log(thongke);

  const dataMeeting = {
    labels: ranges.map((r) =>
      r.start.format("MM") == 12
        ? r.start.format("M-YYYY")
        : r.start.format("M")
    ),
    datasets: [
      {
        label: "Số cuộc họp",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        data: ranges.map((r) =>
          thongke.cuocHops.reduce(
            (pre, cuochop) =>
              pre + (moment(cuochop.thoiGian).within(r) ? 1 : 0),
            0
          )
        ),
      },
    ],
  };

  const dataMeetingCount = {
    labels: ["Tham gia", "Vắng không có lý do", "Vắng có lý do"],
    datasets: [
      {
        data: [thongke.thamGia, thongke.vangKhongLyDo, thongke.vangCoLyDo],
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

  return (
    <BaseLayout>
      <div className="m-10 rounded-2xl bg-white p-10 space-y-10">
        <div className="flex justify-between items-center pb-10 border-b">
          <div className="flex space-x-3 items-center">
            <h1 className="text-xl">Thống kê cuộc họp</h1>
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-3 px-3 py-2 border border-gray-300 rounded-lg hover:opacity-80 duration-100 focus:outline-none">
                <span>{`${year} năm gần nhất`}</span>
                <ChevronDownIcon className="w-5 h-5" />
              </Menu.Button>
              <Transition>
                <Menu.Items className="absolute right-0 w-56 mt-2 bg-white divide-y rounded-md shadow-lg focus:outline-none">
                  {staticFilters.map((staticFilter) => (
                    <Menu.Item key={staticFilter.name}>
                      {({ active }) => (
                        <Link
                          href={`/cuochop/thongke?year=${staticFilter.value}`}
                          className="text-left w-full block px-3 py-2 hover:bg-gray-100 duration-100"
                        >
                          {staticFilter.name}
                        </Link>
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
            <Bar data={dataMeeting} options={options} />
          </div>
          <div className="flex items-center">
            <Pie data={dataMeetingCount} />
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
          {participants.map((item) => (
            <Link
              href={`/cuochop/thongke/${item.id}`}
              className="grid grid-cols-8 gap-5 hover:bg-gray-50 py-5 rounded duration-50"
              key={item.id}
            >
              <h1>{item.id}</h1>
              <h1 className="col-span-2">{item.hoTenChuHo}</h1>
              <h1 className="col-span-2">{item.diaChi}</h1>
              <h1>{item.thamGia}</h1>
              <h1>{item.vangCoLyDo}</h1>
              <h1>{item.vangKhongLyDo}</h1>
            </Link>
          ))}
        </div>
      </div>
    </BaseLayout>
  );
}

ThongKePage.auth = true;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { year = 1 } = context.query;
  try {
    const { result: participants } = await fetchAPI(
      `/api/v1/cuochop/thongkenguoithamgia`,
      {
        token: session.token,
        params: {
          years: year,
        },
      }
    );
    const { result: thongke } = await fetchAPI(
      `/api/v1/cuochop/thongkecuochop`,
      {
        token: session.token,
        params: {
          years: year,
        },
      }
    );

    return {
      props: { participants, thongke },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {},
    };
  }
}

const staticFilters = [
  { name: "1 năm gần nhất", value: 1 },
  { name: "2 năm gần nhất", value: 2 },
  { name: "3 năm gần nhất", value: 3 },
  { name: "5 năm gần nhất", value: 5 },
];
