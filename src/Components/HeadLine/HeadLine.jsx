import "./HeadLine.css";

import React from "react";
import { Link } from "react-router-dom";

const HeadLine = ({ pathLocation }) => {
  const arrayPath = pathLocation.replace("page/", "page ").split("/");
  arrayPath[0] = "home";
  return (
    <div className="head-line-container">
      <div>
        {arrayPath.map((path, key) => (
          <Link
            to={
              path === "home"
                ? "/"
                : arrayPath
                    .slice(0, arrayPath.indexOf(path) + 1)
                    .join("/")
                    .replace("home", "")
                    .replace(" ", "/")
            }
            key={key}
            style={{ color: key === arrayPath.length - 1 ? "blue" : "black" }}
            className="head-line-link"
          >
            {path}
            {key !== arrayPath.length - 1 ? " / " : ""}
          </Link>
        ))}
      </div>
      <div className="head-line-title">
        {arrayPath[arrayPath.length - 1].includes("page")
          ? arrayPath[arrayPath.length - 2]
          : arrayPath[arrayPath.length - 1]}
      </div>
    </div>
  );
};

export default HeadLine;
