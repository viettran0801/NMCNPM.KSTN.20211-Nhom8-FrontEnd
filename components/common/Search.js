import { useRouter } from "next/router";
import { SearchIcon } from "../icons";

export default function Search() {
  const router = useRouter();
  const handleSummit = (e) => {
    e.preventDefault();
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        search: e.target.search.value,
      },
    });
  };
  return (
    <form onSubmit={handleSummit} className="flex items-center space-x-3">
      <SearchIcon className="w-5 h-5 text-gray-400" />
      <input
        type="text"
        name="search"
        className="w-[250px] border-b focus:outline-none p-1"
        placeholder="Tìm kiếm"
      />
    </form>
  );
}
