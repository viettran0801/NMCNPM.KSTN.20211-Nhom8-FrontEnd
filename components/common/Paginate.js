import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";

export default function Paginate({ pageCount = 0 }) {
  const router = useRouter();
  const handlePageChange = (e) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: e.selected + 1,
      },
    });
  };
  return (
    <ReactPaginate
      pageCount={pageCount}
      initialPage={
        router.query.page ? Number.parseInt(router.query.page) - 1 : 0
      }
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      previousLabel={"<"}
      nextLabel={">"}
      renderOnZeroPageCount={null}
      containerClassName="flex items-center space-x-5"
      activeLinkClassName="font-bold text-blue-700 underline decoration-blue-700 underline-offset-4  decoration-2"
      onPageChange={handlePageChange}
    />
  );
}
