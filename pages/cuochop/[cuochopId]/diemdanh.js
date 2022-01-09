import { useRouter } from "next/router";
import { PencilIcon } from "../../../components/icons";
import BaseLayout from "../../../components/layouts/BaseLayout";
import Link from "../../../components/common/Link";
import { Field, Form, Formik } from "formik";

export default function CuochopDetailpage() {
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
            <h1>Họp phòng chống ấu dâm</h1>
          </div>
          <div className="grid grid-cols-3 gap-10">
            <div className="space-y-3">
              <h1 className="text-gray-500">Thời gian</h1>
              <h1>13:10 12/12/1222</h1>
            </div>
            <div className="space-y-3 col-span-2">
              <h1 className="text-gray-500">Địa điểm</h1>
              <h1>123 đường A, phố B, huyện C, tỉnh D</h1>
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
            {personFakes.map((person) => (
              <Formik
                initialValues={{
                  attend: person.attend,
                  reason: person.reason,
                }}
                validate={(values) => {
                  const errors = {};
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(false);
                  router.push(`/cuochop/1`);
                }}
                key={person.id}
              >
                {() => (
                  <Form className="grid grid-cols-4 gap-5 hover:bg-gray-50 py-3 rounded duration-50">
                    <h1>{person.name}</h1>
                    <Field name="attend" type="checkbox" />

                    <Field
                      name="reason"
                      type="text"
                      className="col-span-2 focus:outline-none border-b bg-transparent"
                    />
                  </Form>
                )}
              </Formik>
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

CuochopDetailpage.auth = true;

const personFakes = [
  {
    id: 1,
    name: "Ha Thi tu",
    attend: true,
  },
  {
    id: 1,
    name: "Ha Thi tu",
    attend: true,
  },
  {
    id: 1,
    name: "Ha Thi tu",
    attend: false,
    reason: "Bị bắt vì ấu dâm",
  },
];
