import {
  CalendarIcon,
  HomeIcon,
  SettingIcon,
  UserGroupIcon,
  UsersIcon,
} from "../icons";
import Link from "../common/Link";

export default function Dashboard() {
  return (
    <div className="w-[250px] px-5 py-10 space-y-10 shadow shadow-gray-100">
      <h1 className="text-2xl text-blue-700">Quản lý dân cư</h1>
      <div className="space-y-7">
        <div className="flex space-x-3 items-center">
          <HomeIcon />
          <Link href="/">Trang chủ</Link>
        </div>
        <div className="flex space-x-3 items-center">
          <UserGroupIcon />
          <Link href="/hokhau">Quản lý hộ khẩu</Link>
        </div>
        <div className="flex space-x-3 items-center">
          <UsersIcon />
          <Link href="/nhankhau">Quản lý nhân khẩu</Link>
        </div>
        <div className="flex space-x-3 items-center">
          <CalendarIcon />
          <Link href="/">Quản lý cuộc họp</Link>
        </div>
        <div className="flex space-x-3 items-center">
          <SettingIcon />
          <Link href="/">Tài khoản</Link>
        </div>
      </div>
    </div>
  );
}
