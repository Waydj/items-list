const Pagination = ({ currentPage, prevPage, nextPage, totalPages }) => {
  return (
    <div className="flex items-center justify-center space-x-4 mt-8">
      <button
        disabled={currentPage === 1}
        onClick={prevPage}
        className="bg-blue-500 disabled:bg-slate-400 disabled:cursor-not-allowed hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        &lt;
      </button>
      <span className="text-gray-700">
        Страница {currentPage} из {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={nextPage}
        className="bg-blue-500 disabled:bg-slate-400 disabled:cursor-not-allowed hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
