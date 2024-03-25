import React, { useState } from "react";
import { Link } from "react-router-dom";

const TitleLine = ({ title, line }) => (
  <div className="flex text-basic-blue gap-0 max-md:flex-wrap max-md:max-w-full">
    <button className="grow justify-center items-center px-16 py-5 text-2xl border border-black border-solid bg-neutral-400 w-fit max-md:px-5 max-md:max-w-full hover:bg-btn-bg-red hover:text-btn-bg-yellow active:bg-btn-bg-yellow active:text-btn-bg-red">
      {title}
    </button>
    <div className="justify-center px-12 py-5 text-2xl border border-black border-solid bg-neutral-400 w-fit max-md:px-5">
      {line}
    </div>
  </div>
);

const color_lt_gt = "active:text-white active:bg-black";

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="pagination-container w-full h-16 flex text-3xl items-center justify-center border border-black border-solid">
    <button
      className={`${color_lt_gt}`}
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      &lt;
    </button>
    <div className="flex-auto flex justify-center items-center text-2xl text-black">
      {currentPage} / {totalPages}
    </div>
    <button
      className={`${color_lt_gt}`}
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      &gt;
    </button>
  </div>
);

const titleLines = [];

for (let i = 1; i <= 50; i++) {
  const title = `title ${i.toString().padStart(2, '0')}`;
  const line = "xxx LINE";
  titleLines.push({ title, line });
}

const titleLinesPerPage = 8;
const totalPages = Math.ceil(titleLines.length / titleLinesPerPage);

function TitleScreen() {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * titleLinesPerPage;
  const endIndex = startIndex + titleLinesPerPage;
  const visibleTitleLines = titleLines.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col w-full h-full border border-black border-solid bg-neutral-400">
      <div className="flex justify-end items-center w-full h-1/10 p-2 border border-black border-solid bg-neutral-400">
        <button
          className="text-2xl justify-center items-center uppercase pt-1 pe-1 ps-1.5 text-center
            border-4 border-t-neutral-200 border-l-neutral-300 border-b-neutral-900 border-r-neutral-800 bg-neutral-400
            hover:border-t-red-950 hover:border-l-red-900 hover:border-b-red-300 hover:border-r-red-400 hover:bg-btn-bg-red hover:text-black
            active:border-t-red-950 active:border-l-red-900 active:border-b-red-300 active:border-r-red-400 active:text-white"
          onClick={() => window.history.back()}>
          x
        </button>
      </div>
      <div>
        {visibleTitleLines.map(({ title, line }) => (
          <TitleLine key={title} title={title} line={line} />
        ))}
      </div>
      <div className="pagination-wrapper mt-auto">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default TitleScreen;
