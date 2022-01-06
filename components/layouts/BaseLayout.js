import Dashboard from "./Dashboard";

export default function BaseLayout({ isDashboard = true, children }) {
  return (
    <div className="min-h-screen flex">
      {isDashboard && <Dashboard />}
      <div className="flex-1 flex flex-col pt-[200px] relative">
        <div className="h-[250px] bg-blue-700 absolute top-0 w-full -z-10 rounded-b-xl"></div>
        <div className="flex-1 mx-10 bg-gray-100 rounded-t-xl overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
