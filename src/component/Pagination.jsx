import React from "react";
import "./pagination.css";
import "../themes.css";

const Pagination = ({ dataPerPage, totalData, paginate }) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <>
      {/* <div className="pagination__container"> */}
      <ul className="pagination">
        {pageNumber.map((itemNumber) => (
          <li
            key={itemNumber}
            className="page-item"
            onClick={() => paginate(itemNumber)}
          >
            <a href="!#" className="page-link">
              {itemNumber}
            </a>
          </li>
        ))}
      </ul>
      {/* </div> */}
    </>
  );
};

export default Pagination;
