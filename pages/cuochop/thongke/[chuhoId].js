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
import { getSession } from "next-auth/react";
import Moment from "moment";
import { extendMoment } from "moment-range";
import { split } from "moment-range-split";
import { useRouter } from "next/router";
import { fetchAPI } from "../../../utils";
import Link from "../../../components/common/Link";
import BaseLayout from "../../../components/layouts/BaseLayout";
import { ChevronDownIcon } from "../../../components/icons";
import Transition from "../../../components/common/Transition";
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
export default function ThongKePage({ participantDetail, listMeetings }) {
  const { year = 1, chuhoId } = useRouter().query;
  const current = new Date();
  const before = new Date();
  before.setMonth(current.getMonth() - 12 * year);
  const range = moment.range(before, current);
  const ranges = split(range, "months");
  const dataMeeting = {
    labels: ranges.map((r) =>
      r.start.format("MM") == 12
        ? r.start.format("M-YYYY")
        : r.start.format("M")
    ),
    datasets: [
      {
        label: "Số cuộc họp tham gia",
        data: ranges.map((r) =>
          participantDetail.cuocHopThamGia.reduce(
            (pre, cuochop) =>
              pre + (moment(cuochop.thoiGian).within(r) ? 1 : 0),
            0
          )
        ),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Số cuộc họp vắng có lý do",
        data: ranges.map((r) =>
          participantDetail.cuocHopVangCoLyDo.reduce(
            (pre, cuochop) =>
              pre + (moment(cuochop.thoiGian).within(r) ? 1 : 0),
            0
          )
        ),
        backgroundColor: "rgba(255, 206, 86, 0.2)",
      },
      {
        label: "Số cuộc họp vắng không có lý do",
        data: ranges.map((r) =>
          participantDetail.cuocHopVangKhongLyDo.reduce(
            (pre, cuochop) =>
              pre + (moment(cuochop.thoiGian).within(r) ? 1 : 0),
            0
          )
        ),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };

  const dataMeetingCount = {
    labels: ["Tham gia", "Vắng không có lý do", "Vắng có lý do"],
    datasets: [
      {
        data: [
          participantDetail.thamGia,
          participantDetail.vangKhongLyDo,
          participantDetail.vangCoLyDo,
        ],
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
            <h1 className="text-xl">Thống kê cuộc họp theo chủ hộ</h1>
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
                          href={`/cuochop/thongke/${chuhoId}?year=${staticFilter.value}`}
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
            <Bar data={dataMeeting} options={options} />
          </div>
          <div className="flex items-center">
            <Pie data={dataMeetingCount} />
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
            {listMeetings.map((meetings, idx) => (
              <Tab.Panel key={idx}>
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
  const { chuhoId, year = 1 } = context.query;

  try {
    const { result: participantDetail } = await fetchAPI(
      `/api/v1/cuochop/thongkenguoithamgia/${chuhoId}`,
      {
        token: session.token,
        params: {
          years: year,
        },
      }
    );

    const listMeetings = [
      participantDetail.cuocHopThamGia,
      participantDetail.cuocHopVangCoLyDo,
      participantDetail.cuocHopVangKhongLyDo,
    ];

    return {
      props: { participantDetail, listMeetings },
    };
  } catch (err) {
    return {
      props: {},
    };
  }
}

const tabs = ["Tham gia", "Vắng có lý do", "Vắng không có lý do"];

const staticFilters = [
  { name: "1 năm gần nhất", value: 1 },
  { name: "2 năm gần nhất", value: 2 },
  { name: "3 năm gần nhất", value: 3 },
  { name: "5 năm gần nhất", value: 5 },
];
