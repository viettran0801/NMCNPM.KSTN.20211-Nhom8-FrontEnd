import { useRouter } from "next/router";
import { PencilIcon } from "../../../components/icons";
import BaseLayout from "../../../components/layouts/BaseLayout";
import Link from "../../../components/common/Link";
import { getSession } from "next-auth/react";
import { fetchAPI, parseInstantToDate } from "../../../utils";

export default function TamvangDetailpage({ tamvang }) {
  const { tamvangId } = useRouter().query;
  return (
    <BaseLayout>
      <div className="m-10 rounded-2xl bg-white p-10 space-y-10">
        <div className="flex justify-between items-center pb-10 border-b">
          <div className="flex items-center space-x-5">
            <h1 className="text-xl">Chi tiết tạm vắng</h1>
            <Link
              href={`/tamvang/${tamvangId}/edit`}
              className="flex items-center space-x-3 px-3 py-2 bg-blue-700 text-white rounded-lg hover:opacity-80 duration-100"
            >
              <PencilIcon />
              <span>Chỉnh sửa</span>
            </Link>
          </div>

          <Link
            href="/tamvang"
            className="flex items-center  px-3 py-1 border-green-500 text-green-500 border rounded-lg hover:opacity-80 duration-100"
          >
            Quay lại danh sách tạm vắng
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-20 gap-y-10">
          <div className="space-y-3">
            <h1 className="text-gray-500">Họ và tên</h1>
            <h1>{tamvang.hoVaTen}</h1>
          </div>
          <div className="space-y-3">
            <h1 className="text-gray-500">Số CMND/CCCD</h1>
            <h1>{tamvang.cccd}</h1>
          </div>

          <div className="col-span-2 space-y-3">
            <h1 className="text-gray-500">Địa chỉ</h1>
            <h1>{tamvang.diaChi}</h1>
          </div>
          <div className="space-y-3">
            <h1 className="text-gray-500">Từ ngày</h1>
            <h1>{parseInstantToDate(tamvang.tuNgay)}</h1>
          </div>
          <div className="space-y-3">
            <h1 className="text-gray-500">Đến ngày</h1>
            <h1>{parseInstantToDate(tamvang.denNgay)}</h1>
          </div>
          <div className="col-span-2 space-y-3">
            <h1 className="text-gray-500">Lý do</h1>
            <h1>{tamvang.lyDo}</h1>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

TamvangDetailpage.auth = true;
export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { tamvangId } = await context.query;
  try {
    const { result: tamvang } = await fetchAPI(`/api/v1/tamtru/${tamvangId}`, {
      token: session.token,
    });
    return {
      props: {
        tamvang,
      },
    };
  } catch (err) {
    return {
      props: {},
    };
  }
}
