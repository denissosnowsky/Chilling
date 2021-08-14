import s from "./Pagination.module.css";
import cs from "classnames";
import { useState } from "react";

const Pagination = ({
  currentPage,
  totalItemsCount,
  pageSize,
  changePage,
  portionSize = 5,
}) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize);

  let pageArray = [];
  for (let i = 1; i <= pagesCount; i++) {
    pageArray.push(i);
  }

  //make portions of numbers buttons for pagination
  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <nav aria-label="Navbar" className={s.pagination}>
      <ul className="pagination justify-content-center">
        {portionNumber > 1 && (
          <li
            className="page-item"
            onClick={() => {
              setPortionNumber(portionNumber - 1);
            }}
          >
            <span className="page-link">Попередні</span>
          </li>
        )}
        {pageArray
          .filter(
            (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
          )
          .map((p) => {
            return (
              <a key={p} className={s.link} href="#">
                <li
                  className={cs(
                    [s.pageItem],
                    "page-item",
                    currentPage === p && [s.active]
                  )}
                  onClick={() => {
                    changePage(p);
                  }}
                >
                  <span className="page-link">{p}</span>
                </li>
              </a>
            );
          })}
        {portionCount > portionNumber && (
          <li
            className="page-item"
            onClick={() => {
              setPortionNumber(portionNumber + 1);
            }}
          >
            <span className="page-link">Наступні</span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
