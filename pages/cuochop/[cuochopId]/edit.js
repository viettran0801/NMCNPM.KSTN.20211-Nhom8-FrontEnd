import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import moment from "moment";
import { useState } from "react";
import BaseLayout from "../../../components/layouts/BaseLayout";
import Link from "../../../components/common/Link";
import Input from "../../../components/common/Input";
import { getSession, useSession } from "next-auth/react";
import { fetchAPI } from "../../../utils";

export default function EditCuochopPage({ meeting, inviters }) {
  const router = useRouter();
  const { cuochopId } = router.query;
  const chuHoFakes = inviters;
  const { data: session } = useSession();
  const [mois, setMois] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const inviteAll = () => {
    setMois([]);

    const values = chuHoFakes.map((chuho) => chuho.id);
    setMois(values);

    for (let index in chuHoFakes) {
      chuHoFakes[index].invited = true;
    }
  };

  const discardAllInvites = () => {
    setMois([]);
    for (let index in chuHoFakes) {
      chuHoFakes[index].invited = false;
    }
  };

  const onChangeInvite = (chuHoId) => {
    var chuHoIndex = chuHoFakes.findIndex((chuHo) => chuHo.id == chuHoId);
    if (chuHoFakes[chuHoIndex].invited == true) {
      setMois(mois.filter((id) => id != chuHoId));
      chuHoFakes[chuHoIndex].invited = false;
    } else {
      setMois(mois.filter((id) => id != chuHoId));
      setMois([...mois, chuHoId]);
      chuHoFakes[chuHoIndex].invited = true;
    }
  };
  return (
    <BaseLayout>
      <div className="m-10 rounded-2xl bg-white p-10 space-y-10">
        <div className="flex justify-between items-center pb-10 border-b">
          <h1 className="text-xl">Chỉnh sửa cuộc họp</h1>
          <Link
            href={`/cuochop/${cuochopId}`}
            className="px-3 py-1 border-red-500 text-red-500 border rounded-lg"
          >
            Hủy
          </Link>
        </div>
        <Formik
          initialValues={{
            diaDiem: meeting.diaDiem,
            tieuDe: meeting.tieuDe,
            thoiGian: moment(meeting.thoiGian).format("YYYY-MM-DDThh:mm"),
            noiDung: meeting.noiDung,
          }}
          validate={(values) => {
            const errors = {};
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const chuHoDaMoi = chuHoFakes
              .filter((chuho) => chuho.invited == true)
              .map((chuho) => chuho.id);

            try {
              const { result } = await fetchAPI(
                `/api/v1/cuochop/${cuochopId}`,
                {
                  method: "PUT",
                  body: {
                    ...values,
                    thoiGian: moment(values.thoiGian).toISOString(),
                    nguoiTao: session.user.name,
                  },
                  token: session.token,
                }
              );

              await fetchAPI(`/api/v1/cuochop/danhsachthamgia/${cuochopId}`, {
                method: "POST",
                body: {
                  hoKhaus: chuHoDaMoi,
                },
                token: session.token,
              });
              setSubmitting(false);
              router.push(`/cuochop/${result.id}`);
            } catch (err) {
              setErrorMessage("Có lỗi xảy ra");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-10">
              <Input label="Tiêu đề" name="tieuDe" />
              <div className="grid grid-cols-3 gap-10">
                <Input
                  label="Thời gian"
                  name="thoiGian"
                  type="datetime-local"
                />
                <div className="col-span-2">
                  <Input label="Địa điểm" name="diaDiem" />
                </div>
              </div>
              <Input label="Nội dung" name="noiDung" type="textarea" />
              <div className="space-y-10">
                <div className="flex space-x-3 items-center pb-10 border-b">
                  <h1 className="text-lg">Danh sách tham gia</h1>
                  <button
                    type="button"
                    className="text-green-700 font-medium bg-green-300 rounded-lg px-3 py-2 hover:opacity-80 duration-100"
                    onClick={inviteAll}
                  >
                    Chọn tất cả
                  </button>
                  <button
                    type="button"
                    className="text-red-700 font-medium bg-red-300 rounded-lg px-3 py-2 hover:opacity-80 duration-100"
                    onClick={discardAllInvites}
                  >
                    Bỏ chọn tất cả
                  </button>
                </div>
                <div className="w-[600px] accent-blue-700">
                  <div className="grid grid-cols-2 gap-10 text-gray-500">
                    <h1>Họ và tên</h1>
                    <h1>Mời</h1>
                  </div>
                  {chuHoFakes.map((person) => (
                    <div
                      className="grid grid-cols-2 gap-10 py-3 hover:bg-gray-50 duration-100"
                      key={person.hoKhau}
                    >
                      <h1>{person.hoTenChuHo}</h1>
                      <input
                        type="checkbox"
                        className="ml-2"
                        checked={person.invited}
                        onChange={(e) => onChangeInvite(person.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-red-700">{errorMessage}</p>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-3 py-2 bg-blue-700 text-white rounded-lg hover:scale-105 duration-300"
                >
                  Xác nhận
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </BaseLayout>
  );
}

EditCuochopPage.auth = true;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { cuochopId } = context.query;
  try {
    const { result: meeting } = await fetchAPI(`/api/v1/cuochop/${cuochopId}`, {
      token: session.token,
    });

    const { result: inviters } = await fetchAPI(
      `/api/v1/cuochop/danhsachthamgia/${cuochopId}`,
      {
        token: session.token,
      }
    );

    return {
      props: { meeting, inviters },
    };
  } catch (err) {
    return {
      props: {},
    };
  }
}
