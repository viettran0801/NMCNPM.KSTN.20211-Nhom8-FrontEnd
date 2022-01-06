import BellIcon, { MailIcon } from "../icons";
import Dashboard from "./Dashboard";

export default function BaseLayout({ isDashboard = true, children }) {
  return (
    <div className="min-h-screen flex">
      {isDashboard && <Dashboard />}
      <div className="flex-1 flex flex-col pt-[150px] relative">
        <div className="h-[200px] bg-blue-700 absolute top-0 w-full -z-10 rounded-b-xl flex justify-end p-10 text-white space-x-5">
          {isDashboard && (
            <>
              <BellIcon />
              <MailIcon />
              <h1>Hatuan</h1>
            </>
          )}
        </div>
        <div className="flex-1 mx-10 bg-gray-50 rounded-t-xl overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
