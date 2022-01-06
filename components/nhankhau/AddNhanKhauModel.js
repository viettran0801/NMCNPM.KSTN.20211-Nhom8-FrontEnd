import { Dialog, Transition } from "@headlessui/react";
import { Formik, Form } from "formik";
import { Fragment, useState } from "react";
import Input from "../common/Input";
import { PlusIcon } from "../icons";

export default function AddNhanKhauModel() {
  let [isOpen, setIsOpen] = useState(false);

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
                    name: "",
                    otherName: "",
                    bod: "",
                    gender: "",
                    identityNumber: "",
                    passportNumber: "",
                    homeTown: "",
                    nationality: "",
                    religion: "",
                    ethnic: "",
                    permanentAddress: "",
                    address: "",
                    relation: "",
                    job: "",
                    academicLevel: "",
                    workplace: "",
                  }}
                  validate={(values) => {
                    const errors = {};
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false);
                    closeModal();
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-5">
                      <div className="grid grid-cols-2 gap-10">
                        <Input label="Họ và tên" name="name" />
                        <Input label="Tên gọi khác (nếu có)" name="otherName" />
                      </div>
                      <div className="flex items-center">
                        <Input label="Ngày sinh" name="bod" />
                      </div>
                      <div className="grid grid-cols-2 gap-10">
                        <Input label="Số CMND/CCCD" name="identityNumber" />
                        <Input label="Số hộ chiếu" name="passportNumber" />
                      </div>
                      <div className="flex items-center">
                        <Input label="Quan hệ với chủ hộ" name="relation" />
                      </div>
                      <div className="grid grid-cols-9 gap-10">
                        <div className="col-span-3">
                          <Input label="Nguyên quán" name="homeTown" />
                        </div>
                        <div className="col-span-2">
                          <Input label="Dân tộc" name="ethnic" />
                        </div>
                        <div className="col-span-2">
                          <Input label="Tôn giáo" name="religion" />
                        </div>
                        <div className="col-span-2">
                          <Input label="Quốc tịch" name="nationality" />
                        </div>
                      </div>
                      <Input
                        label="Địa chỉ thường trú"
                        name="permanentAddress"
                      />
                      <Input label="Địa chỉ hiện tại" name="address" />
                      <div className="grid grid-cols-9 gap-10">
                        <div className="col-span-2">
                          <Input
                            label="Trình độ học vấn"
                            name="academicLevel"
                          />
                        </div>

                        <div className="col-span-3">
                          <Input label="Nghề nghiệp" name="job" />
                        </div>

                        <div className="col-span-4">
                          <Input label="Nơi làm việc" name="workplace" />
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
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
