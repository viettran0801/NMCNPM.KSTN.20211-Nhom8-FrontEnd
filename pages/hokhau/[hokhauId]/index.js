import { useRouter } from "next/router";
import { PencilIcon } from "../../../components/icons";
import BaseLayout from "../../../components/layouts/BaseLayout";
import Link from "../../../components/common/Link";
import { getSession } from "next-auth/react";
import { fetchAPI, parseInstantToDate } from "../../../utils";
export default function HoKhauDetailpage({ hoKhau }) {
  const { hokhauId } = useRouter().query;

  return (
    <BaseLayout>
      <div className="m-10 rounded-2xl bg-white p-10 space-y-10">
        <div className="flex justify-between items-center pb-10 border-b">
          <div className="flex items-center space-x-5">
            <h1 className="text-xl">{`Chi tiết hộ khẩu mã ${hokhauId}`} </h1>
            <Link
              href={`/hokhau/${hokhauId}/edit`}
              className="flex items-center space-x-3 px-3 py-2 bg-blue-700 text-white rounded-lg hover:opacity-80 duration-100"
            >
              <PencilIcon />
              <span>Chỉnh sửa</span>
            </Link>
          </div>

          <Link
            href="/hokhau"
            className="flex items-center  px-3 py-1 border-green-500 text-green-500 border rounded-lg hover:opacity-80 duration-100"
          >
            Quay lại danh sách hộ khẩu
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-20 gap-y-10">
          <div className="space-y-3">
            <h1 className="text-gray-500">Họ và tên chủ hộ</h1>
            <h1>{hoKhau.hoTenChuHo}</h1>
          </div>
          <div className="space-y-3">
            <h1 className="text-gray-500">Số CMND/CCCD của chủ hộ</h1>
            <h1>{hoKhau.cccdChuHo}</h1>
          </div>
          <div className=" col-span-2 space-y-3">
            <h1 className="text-gray-500">Địa chỉ</h1>
            <h1>{hoKhau.diaChi}</h1>
          </div>
        </div>
        <div className="space-y-5">
          <div className="flex items-center space-x-20 pb-5 border-b">
            <h1 className="text-xl">Danh sách thành viên</h1>
          </div>
          <div className="w-[600px]">
            <div className="grid grid-cols-3 gap-10 text-gray-500">
              <h1>Họ và tên</h1>
              <h1>Ngày sinh</h1>
              <h1>Quan hệ với chủ hộ</h1>
            </div>
            {hoKhau.nhanKhaus.map((person) => (
              <div
                className="grid grid-cols-3 gap-10 py-3 hover:bg-gray-50 duration-100"
                key={person.id}
              >
                <Link
                  href={`/nhankhau/${person.id}`}
                  className="hover:underline decoration-blue-700"
                >
                  {person.hoVaTen}
                </Link>
                <h1>{parseInstantToDate(person.ngaySinh)}</h1>
                <h1>{person.quanHeVoiChuHo}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
HoKhauDetailpage.auth = true;

export async function getServerSideProps(context) {
  const { hokhauId } = context.query;
  const getHoKhauDetailUrl = "/api/v1/hokhau/" + hokhauId;
  const session = await getSession(context);

  try {
    const res = await fetchAPI(getHoKhauDetailUrl, {
      method: "GET",
      body: {},
      token: session.token,
      params: {},
    });

    const hoKhau = res.result;

    return {
      props: { hoKhau },
    };
  } catch (err) {
    console.error(err);
    return {
      props: { hoKhau: {} },
    };
  }
}
