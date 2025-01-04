import { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";

export default function Pagination({ paginationData, onPageChange, onPageSizeChange }) {
  const [selectedPageSize, setSelectedPageSize] = useState(paginationData.meta.per_page || 10);
  const handlePageClick = (url) => {
    if (!url) return;
    const pageNumber = parseInt(url.split("page=")[1]);
    onPageChange(pageNumber);
  };

  const goToPreviousPage = () => {
    const previousPage = paginationData.meta.current_page - 1;
    if (previousPage >= 1) onPageChange(previousPage);
  };

  const goToNextPage = () => {
    const nextPage = paginationData.meta.current_page + 1;
    if (nextPage <= paginationData.meta.last_page) onPageChange(nextPage);
  };

  const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value);
    setSelectedPageSize(newSize);
    onPageSizeChange(newSize); // Notify the parent component about the new page size
  };

  const links = paginationData.links || [];

  // Find the index of the active link
  const activeIndex = links.findIndex((link) => link.active);

  // Determine which links to show
  const linksToShow = [];
  const totalLinks = links.length;

  // Show first 3 links
  linksToShow.push(...links.slice(0, 3));

  // Show links around the active link
  if (activeIndex >= 3 && activeIndex <= totalLinks - 3) {
    linksToShow.push(...links.slice(activeIndex - 1, activeIndex + 2));
  }

  // Show last 3 links
  linksToShow.push(...links.slice(totalLinks - 3));

  // Remove duplicates and sort by order of appearance
  const uniqueLinks = [
    ...new Map(linksToShow.map((item) => [item["label"], item])).values(),
  ].sort((a, b) => links.indexOf(a) - links.indexOf(b));
  return (
    <div className="flex items-center justify-between rounded-b-xl border-t border-gray-200 bg-white px-4 py-4 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={goToPreviousPage}
          disabled={paginationData.meta.current_page === 1}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          
          onClick={goToNextPage}
          disabled={
            paginationData.meta.current_page === paginationData.meta.last_page
          }
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {paginationData.meta?.from || 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">{paginationData.meta?.to || 1}</span>{" "}
            of{" "}
            <span className="font-medium">
              {paginationData.meta?.total || 0}
            </span>{" "}
            results
          </p>
        </div>
        <div>
          <select
            value={selectedPageSize}
            onChange={handlePageSizeChange}
            className="w-full rounded-md bg-white py-1 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300  sm:text-sm"
          >
            <option value={10}>10/Page</option>
            <option value={20}>20/Page</option>
            <option value={50}>50/Page</option>
            <option value={100}>100/Page</option>
          </select>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            {paginationData?.links?.map((link) => (
              <button
                key={link.label}
                onClick={() => handlePageClick(link.url)}
                disabled={!link.url || link.active}
                className={`relative inline-flex items-center ${
                  link.label === "&laquo; Previous"
                    ? "rounded-l-md px-2 py-2"
                    : link.label === "Next &raquo;"
                      ? "rounded-r-md px-2 py-2"
                      : "px-4 py-2"
                } text-sm font-semibold ${
                  link.active
                    ? "bg-indigo-600 text-white"
                    : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                } focus:z-20`}
              >
                {link.label === "&laquo; Previous" && (
                  <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
                )}
                {link.label !== "&laquo; Previous" &&
                  link.label !== "Next &raquo;" &&
                  link.label}
                {link.label === "Next &raquo;" && (
                  <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
