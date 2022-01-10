import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import BaseLayout from "../../components/layouts/BaseLayout";
import Link from "../../components/common/Link";
import Input from "../../components/common/Input";
import { getSession, useSession } from "next-auth/react";
import moment from "moment";
import { fetchAPI } from "../../utils";
import { useState } from "react";

export default function AddCuochopPage({ inviters }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [mois, setMois] = useState([]);

  var chuHoFakes = inviters;

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
          <h1 className="text-xl">Tạo cuộc họp mới</h1>
          <Link
            href="/cuochop"
            className="px-3 py-1 border-red-500 text-red-500 border rounded-lg"
          >
            Hủy
          </Link>
        </div>
        <Formik
          initialValues={{
            diaDiem: "",
            tieuDe: "",
            thoiGian: "",
            noiDung: "",
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
              const { result } = await fetchAPI("/api/v1/cuochop", {
                method: "POST",
                body: {
                  ...values,
                  thoiGian: moment(values.thoiGian + "Z").toISOString(),
                  nguoiTao: session.user.name,
                  hoKhaus: chuHoDaMoi,
                },
                token: session.token,
              });
              setSubmitting(false);
              router.push(`/cuochop/${result.id}`);
            } catch (err) {
              setErrorMessage(err.message);
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
                      key={person.id}
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

AddCuochopPage.auth = true;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  try {
    const { result: inviters } = await fetchAPI(`/api/v1/cuochop/danhsachmoi`, {
      token: session.token,
    });

    return {
      props: { inviters },
    };
  } catch (err) {
    console.error(err);
    return {
      props: { intviters: {} },
    };
  }
}
