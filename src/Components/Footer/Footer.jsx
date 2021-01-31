import "./Footer.css";

import React from "react";
import { Link } from "react-router-dom";
const footerData = [
  {
    title: "Products",
    dataList: [
      {
        name: "Apple Watch Series",
      },
      {
        name: "Refurbished iPad 4th",
      },
      {
        name: "Apple 9.7″ iPad",
      },
      {
        name: "Apple iPhone 6s 16GB",
      },
      {
        name: "Apple Magic Mouse",
      },
    ],
  },
  {
    title: "Customer Service",
    dataList: [
      {
        name: "News",
      },
      {
        name: "FAQ",
      },
      {
        name: "Shop",
      },
      {
        name: "About us",
      },
      {
        name: "Contacts",
      },
    ],
  },
  {
    title: "Socials",
    dataList: [
      {
        name: "Twitter",
      },
      {
        name: "YouTube",
      },
      {
        name: "Instagram",
      },
      {
        name: "Snapchat",
      },
      {
        name: "Facebook",
      },
    ],
  },
  {
    title: "Customer Care",
    dataList: [
      {
        name: "Sale",
      },
      {
        name: "Shop",
      },
      {
        name: "Cart",
      },
      {
        name: "My Orders",
      },
      {
        name: "Contacts",
      },
    ],
  },
];
const Footer = () => {
  return (
    <div className="footer">
      <div
        className="footer-list-container"
        style={{ maxWidth: 1200, margin: "auto" }}
      >
        {footerData.map(({ title, dataList }, key) => (
          <div className="footer-item-container" key={key}>
            <h4>{title}</h4>
            <ul className="footer-list">
              {dataList.map(({ name, src },key) => (
                <Link to={src || "/"} key={key}>
                  <li>{name}</li>
                </Link>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
