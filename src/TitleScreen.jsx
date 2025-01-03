import React, { useState, useEffect } from "react";
import PageRenderer from "./Background";
import axios from "axios";

const TitleLine = ({ title, line, id }) => (
  <div className="flex text-basic-blue gap-0 max-md:flex-wrap max-md:max-w-full">
    <button
      className="flex-grow justify-center items-center px-16 py-5 text-2xl
      border border-black border-solid bg-neutral-400 max-md:max-w-full
      hover:bg-btn-bg-red hover:text-btn-bg-yellow
      active:bg-btn-bg-yellowactive:text-btn-bg-red"
      onClick={() => {
        window.location.href = `/typing/${id}`;
      }}
    >
      {title}
    </button>
    <div className="justify-center px-12 py-5 text-2xl
    border border-black border-solid bg-neutral-400 w-fit max-md:px-5">
      {line} LINE
    </div>
  </div>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="pagination-container w-full h-16 flex text-3xl items-center justify-center border border-black border-solid">
    <button
      className="active:text-white active:bg-black ms-2"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      &lt;
    </button>
    <div className="flex-auto flex justify-center items-center text-2xl text-black">
      {currentPage} / {totalPages}
    </div>
    <button
      className="active:text-white active:bg-black me-2"
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      &gt;
    </button>
  </div>
);

const TitleScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [titleLines, setTitleLines] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await axios.get("/api/codes/titles");
        setTitleLines(response.data.contents);
        setTotalPages(Math.ceil(response.data.total / titleLinesPerPage));
      } catch (error) {
        console.error("Error fetching titles:", error);
      }
    };

    fetchTitles();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const titleLinesPerPage = 8;
  const startIndex = (currentPage - 1) * titleLinesPerPage;
  const endIndex = startIndex + titleLinesPerPage;
  const visibleTitleLines = titleLines.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col w-full h-full border border-black border-solid bg-neutral-400">
      <div className="flex justify-end items-center w-full h-1/10 p-2 border border-black border-solid bg-neutral-400">
        <PageRenderer page_type="go_back" />
      </div>
      <div>
        {visibleTitleLines.map(({ title, line, codeId }) => (
          <TitleLine key={codeId} title={title} line={line} id={codeId} />
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
};

export default TitleScreen;
