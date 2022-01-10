import { useSession } from "next-auth/react";
import BellIcon, { MailIcon, ChevronDownIcon } from "../icons";
import Dashboard from "./Dashboard";
import { Menu } from "@headlessui/react";
import Transition from "../common/Transition";
import Link from "../common/Link";
import { signOut } from "next-auth/react";

export default function BaseLayout({ isDashboard = true, children }) {
  const { data: sesssion } = useSession();
  return (
    <div className="min-h-screen flex">
      {isDashboard && <Dashboard />}
      <div className="flex-1 flex flex-col pt-[150px] relative">
        <div className="h-[200px] bg-blue-700 absolute top-0 w-full  rounded-b-xl flex justify-end p-10 text-white space-x-5">
          {isDashboard && (
            <>
              <BellIcon />
              <MailIcon />
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center space-x-3  hover:opacity-80 duration-100 focus:outline-none">
                  <h1>{sesssion?.user?.name}</h1>
                  <ChevronDownIcon className="w-4 h-4" />
                </Menu.Button>
                <Transition>
                  <Menu.Items className="absolute right-0 w-56 mt-2 text-gray-900 bg-white divide-y rounded-md shadow-2xl shadow-gray-700 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/change-password"
                          className="text-left w-full block px-3 py-2  hover:bg-gray-300 duration-100"
                        >
                          Đổi mật khẩu
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => signOut()}
                          className="text-left w-full text-red-700 block px-3 py-2  hover:bg-gray-300 duration-100"
                        >
                          Đăng xuất
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </>
          )}
        </div>
        <div className="flex-1 mx-5 bg-gray-50 rounded-t-xl overflow-hidden mb-20 z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
