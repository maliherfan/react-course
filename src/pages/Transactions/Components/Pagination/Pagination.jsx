import { useApp } from '../../../../context/AppContext';
import './Pagination.css';

const Pagination = () => {
  const { pagination, totalPages, changePage, filteredTransactions } = useApp();

  const { currentPage } = pagination;

  if (filteredTransactions.length <= pagination.itemsPerPage) {
    return null;
  }

  const renderPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            className={`page-btn ${currentPage === i ? 'active' : ''}`}
            onClick={() => changePage(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      let startPage = currentPage;

      if (currentPage > totalPages - 2) {
        startPage = totalPages - 4;
      } else if (currentPage < 3) {
        startPage = 1;
      } else {
        startPage = currentPage - 2;
      }
      for (let i = 0; i < 5; i++) {
        const pageNum = startPage + i;
        pages.push(
          <button
            key={pageNum}
            className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
            onClick={() => changePage(pageNum)}
          >
            {pageNum}
          </button>
        );
      }
    }

    return pages;
  };

  return (
    <div className="pagination-wrapper">
      <div className="pagination-container">
        <button
          className={`pagination-nav prev ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <img src="/icons/prev.svg" alt="قبلی" width="16" height="16" />
        </button>

        <div className="page-numbers">{renderPageNumbers()}</div>

        <button
          className={`pagination-nav next ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <img src="/icons/next.svg" alt="بعدی" width="16" height="16" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
