import {
  CalendarIcon,
  HomeIcon,
  SettingIcon,
  UserGroupIcon,
  UsersIcon,
} from "../icons";
import Link from "../common/Link";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "../icons";

export default function Dashboard() {
  return (
    <div className="w-[300px] px-7 py-10 space-y-10 shadow shadow-gray-100">
      <h1 className="text-2xl text-blue-700">Quản lý dân cư</h1>
      <div>
        <div className="flex space-x-3 items-center p-3">
          <HomeIcon />
          <Link href="/">Trang chủ</Link>
        </div>
        <div className="flex space-x-3 items-center p-3">
          <UserGroupIcon />
          <Link href="/hokhau">Quản lý hộ khẩu</Link>
        </div>
        <div className="flex space-x-3 items-center p-3">
          <UsersIcon />
          <Link href="/nhankhau">Quản lý nhân khẩu</Link>
        </div>
        <Disclosure>
          {({ open }) => (
            <div>
              <Disclosure.Button
                className={`flex justify-between w-full p-3 rounded-lg duration-300 ${
                  open ? "bg-gray-100" : ""
                }`}
              >
                <div className="flex space-x-3 items-center">
                  <UsersIcon />
                  <span>Quản lý nhân khẩu</span>
                </div>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180" : ""
                  }  w-5 h-5 duration-300 text-gray-700`}
                />
              </Disclosure.Button>
              <Transition
                enter="transition duration-300 ease-out"
                enterFrom="transform -translate-y-10 opacity-0"
                enterTo="transform -translate-y-0 opacity-100"
                leave="transition duration-200 ease-out"
                leaveFrom="transform opacity-10"
                leaveTo="transform  opacity-0"
              >
                <Disclosure.Panel className="mt-3">
                  <div className="space-y-3 pl-10">
                    <Link
                      href="/nhankhau"
                      className="block hover:underline duration-300"
                    >
                      Nhân khẩu
                    </Link>
                    <Link
                      href="/tamtru"
                      className="block hover:underline duration-300"
                    >
                      Tạm trú
                    </Link>
                    <Link
                      href="/tamvang"
                      className="block hover:underline duration-300"
                    >
                      Tạm vắng
                    </Link>
                  </div>
                </Disclosure.Panel>
              </Transition>
            </div>
          )}
        </Disclosure>
        <div className="flex space-x-3 items-center p-3">
          <CalendarIcon />
          <Link href="/cuochop">Quản lý cuộc họp</Link>
        </div>
        <div className="flex space-x-3 items-center p-3">
          <SettingIcon />
          <Link href="/">Tài khoản</Link>
        </div>
      </div>
    </div>
  );
}
