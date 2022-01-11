import { Dialog, Transition } from "@headlessui/react";
import { Formik, Form } from "formik";
import { Fragment, useState } from "react";
import moment from "moment";
import { useSession } from "next-auth/react";
import { Field } from "formik";
import Input from "../common/Input";
import { PlusIcon } from "../icons";
import { fetchAPI } from "../../utils";

export default function AddNhanKhauModel({ addNhanKhau }) {
  let [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { data: session } = useSession();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="px-3 py-2 bg-green-300 text-green-700 font-medium rounded-lg hover:opacity-80 duration-100 flex items-center space-x-1"
      >
        <PlusIcon />
        <span>Thêm thành viên</span>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-70" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-screen-lg p-10 text-left align-middle transition-all transform bg-white rounded-2xl space-y-5">
                <div className="flex justify-between items-center pb-5 border-b">
                  <h1 className="text-xl">Thêm nhân khẩu mới</h1>
                  <button
                    onClick={closeModal}
                    className="px-3 py-1 border-red-500 text-red-500 border rounded-lg"
                  >
                    Hủy
                  </button>
                </div>
                <Formik
                  initialValues={{
                    hoVaTen: "",
                    hoVaTenKhac: "",
                    ngaySinh: "",
                    gioiTinh: "",
                    cccd: "",
                    soHoChieu: "",
                    nguyenQuan: "",
                    quocTich: "",
                    tonGiao: "",
                    danToc: "",
                    noiThuongTru: "",
                    diaChiHienTai: "",
                    quanHeVoiChuHo: "",
                    ngheNghiep: "",
                    trinhDoHocVan: "",
                    noiLamViec: "",
                  }}
                  validate={(values) => {
                    const errors = {};
                    return errors;
                  }}
                  onSubmit={async (values) => {
                    try {
                      const { result } = await fetchAPI(`/api/v1/nhankhau`, {
                        method: "POST",
                        token: session.token,
                        body: {
                          ...values,
                          ngaySinh: moment(values.ngaySinh + "Z").toISOString(),
                        },
                      });
                      addNhanKhau(result);
                      closeModal();
                    } catch (err) {
                      setErrorMessage("Có lỗi xảy ra");
                    }
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-5">
                      <div className="grid grid-cols-2 gap-10">
                        <Input
                          label="Họ và tên"
                          name="hoVaTen"
                          required={true}
                        />
                        <Input label="Tên gọi khác" name="hoVaTenKhac" />
                      </div>
                      <div className="grid grid-cols-2 gap-10">
                        <div className="w-fit">
                          <Input
                            label="Ngày sinh"
                            name="ngaySinh"
                            type="date"
                            required={true}
                          />
                        </div>
                        <div className="space-y-3">
                          <h1 className="text-gray-500 space-x-3">
                            <span>Giới tinh</span>
                            <span className="text-red-700">*</span>
                          </h1>
                          <div className="space-x-10">
                            <label className="space-x-3">
                              <Field type="radio" name="gioiTinh" value="Nam" />
                              <span>Nam</span>
                            </label>
                            <label className="space-x-3">
                              <Field type="radio" name="gioiTinh" value="Nữ" />
                              <span>Nữ</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-10">
                        <Input label="Số CMND/CCCD" name="cccd" />
                        <Input label="Số hộ chiếu" name="soHoChieu" />
                      </div>
                      <div className="flex items-center">
                        <Input
                          label="Quan hệ với chủ hộ"
                          name="quanHeVoiChuHo"
                          required={true}
                        />
                      </div>
                      <div className="grid grid-cols-9 gap-10">
                        <div className="col-span-3">
                          <Input
                            label="Nguyên quán"
                            name="nguyenQuan"
                            required={true}
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            label="Dân tộc"
                            name="danToc"
                            required={true}
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            label="Tôn giáo"
                            name="tonGiao"
                            required={true}
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            label="Quốc tịch"
                            name="quocTich"
                            required={true}
                          />
                        </div>
                      </div>
                      <Input
                        label="Địa chỉ thường trú"
                        name="noiThuongTru"
                        required={true}
                      />
                      <Input
                        label="Địa chỉ hiện tại"
                        name="diaChiHienTai"
                        required={true}
                      />
                      <div className="grid grid-cols-9 gap-10">
                        <div className="col-span-2">
                          <Input
                            label="Trình độ học vấn"
                            name="trinhDoHocVan"
                          />
                        </div>

                        <div className="col-span-3">
                          <Input label="Nghề nghiệp" name="ngheNghiep" />
                        </div>

                        <div className="col-span-4">
                          <Input label="Nơi làm việc" name="noiLamViec" />
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
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
