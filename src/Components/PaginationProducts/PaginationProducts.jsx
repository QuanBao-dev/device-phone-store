import "./PaginationProducts.css";

import React, { useEffect } from "react";

import CardProductNewList from "../CardProductNewList/CardProductNewList";
import { Link } from "react-router-dom";

const PaginationProducts = ({
  page = 1,
  maxPage = 5,
  dataListProduct,
  query,
}) => {
  const pageList = Array.from(Array(maxPage).keys());
  useEffect(() => {
    window.scroll({ top: 0 });
  }, [page]);
  return (
    <div>
      <div className="page-display-pagination">
        Showing {(page - 1) * 9 + 1} –{" "}
        {page * 9 + 1 > dataListProduct.length
          ? dataListProduct.length
          : page * 9}{" "}
        of {dataListProduct.length} results
      </div>
      <CardProductNewList
        dataList={dataListProduct.slice((page - 1) * 9, page * 9)}
      />
      {pageList.length > 1 && (
        <div className="page-list-container">
          {parseInt(page) - 1 < 1 && (
            <span>
              <i className="fas fa-chevron-left"></i>
            </span>
          )}
          {parseInt(page) - 1 >= 1 && (
            <Link to={`/shop/page/${parseInt(page) - 1 + query}`}>
              <i className="fas fa-chevron-left"></i>
            </Link>
          )}
          {pageList.map((pageItem) => (
            <Link
              to={"/shop/page/" + (pageItem + 1) + query}
              key={pageItem}
              style={{
                color: page === pageItem + 1 ? "blue" : "black",
                fontWeight: page === pageItem + 1 ? 600 : null,
              }}
            >
              {pageItem + 1}
            </Link>
          ))}
          {parseInt(page) + 1 > maxPage && (
            <span>
              <i className="fas fa-chevron-right"></i>
            </span>
          )}
          {parseInt(page) + 1 <= maxPage && (
            <Link to={`/shop/page/${parseInt(page) + 1 + query}`}>
              <i className="fas fa-chevron-right"></i>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default PaginationProducts;
