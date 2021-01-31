import "./HeadLineProduct.css";

import React, { useMemo } from "react";
import { Link } from "react-router-dom";

const HeadLineProduct = ({ productData }) => {
  const dataHeadLine = useMemo(() => {
    return [
      {
        href: "/",
        link: "home",
      },
      ...productData.tags.reduce((ans, tag) => {
        ans.push({
          href: "/shop/page/1?category=" + tag.trim().replace(/ /g, "-"),
          link: tag,
        });
        return ans;
      }, []),
      {
        href: "/product/" + productData.id,
        link: productData.title,
      },
    ];
  }, [productData]);
  return (
    <div className="head-line-product-container">
      <div className="head-line-product">
        {dataHeadLine.map(({ href, link }, index) => (
          <Link
            key={index}
            to={href}
            style={{
              color: index === dataHeadLine.length - 1 ? "blue" : null,
            }}
          >
            {link}
            {index === dataHeadLine.length - 1 ? "" : " / "}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeadLineProduct;
