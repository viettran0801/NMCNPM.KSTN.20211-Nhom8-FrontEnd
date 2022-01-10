import { useRouter } from "next/router";
import moment from "moment";
import { getSession } from "next-auth/react";
import { fetchAPI } from "../../../utils";
import BaseLayout from "../../../components/layouts/BaseLayout";
import Link from "../../../components/common/Link";
import DiemDanh from "../../../components/diemdanh/DiemDanh";
export default function CuochopDetailpage({ meeting, persons }) {
  const { cuochopId } = useRouter().query;

  return (
    <BaseLayout>
      <div className="m-10 rounded-2xl bg-white p-10 space-y-10">
        <div className="flex justify-between items-center pb-10 border-b">
          <div className="flex items-center space-x-5">
            <h1 className="text-xl">Điểm danh cuộc họp</h1>
          </div>

          <Link
            href={`/cuochop/${cuochopId}`}
            className="flex items-center  px-3 py-1 border-green-500 text-green-500 border rounded-lg hover:opacity-80 duration-100"
          >
            Quay lại cuộc họp
          </Link>
        </div>
        <div className="space-y-10 pb-10 border-b">
          <div className="space-y-3">
            <h1 className="text-gray-500">Tiêu đề</h1>
            <h1>{meeting.tieuDe}</h1>
          </div>
          <div className="grid grid-cols-3 gap-10">
            <div className="space-y-3">
              <h1 className="text-gray-500">Thời gian</h1>
              <h1>{moment(meeting.thoiGian).format("hh:mm DD-MM-YYYY")}</h1>
            </div>
            <div className="space-y-3 col-span-2">
              <h1 className="text-gray-500">Địa điểm</h1>
              <h1>{meeting.diaDiem}</h1>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <h1>Danh sách tham gia</h1>
          <div>
            <div className="grid grid-cols-4 gap-5 text-gray-500 py-3">
              <h1>Tên</h1>
              <h1>Điểm danh</h1>
              <h1 className="col-span-2">Lý do</h1>
            </div>
            {persons.map((person) => (
              <DiemDanh person={person} key={person.hoKhau} />
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

CuochopDetailpage.auth = true;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { cuochopId } = context.query;

  try {
    const { result: meeting } = await fetchAPI(`/api/v1/cuochop/${cuochopId}`, {
      token: session.token,
    });
    const { result: persons } = await fetchAPI(
      `/api/v1/cuochop/${cuochopId}/diemdanh`,
      {
        token: session.token,
      }
    );

    return {
      props: { meeting, persons },
    };
  } catch (err) {
    return {
      props: {},
    };
  }
}
