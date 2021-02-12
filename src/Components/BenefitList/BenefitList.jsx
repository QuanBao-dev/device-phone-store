import './BenefitList.css';

import React, { useRef } from 'react';
import { useAnimationViewport } from '../../Hooks/AnimationViewport';

const dataList = [
  {
    title: "Home Shipping",
    description: "Free for all order",
    symbol: <i className="fas fa-home"></i>,
  },
  {
    title: "100% Refund",
    description: "Cash Back",
    symbol: <i className="fab fa-telegram-plane"></i>,
  },
  {
    title: "Clients′ Support",
    description: "Fast Service",
    symbol: <i className="fas fa-shield-alt"></i>,
  },
  {
    title: "Fast Delivery",
    description: "Best Service",
    symbol: <i className="fas fa-rocket"></i>,
  },
];
const BenefitList = () => {
  const benefitListContainerRef = useRef();
  useAnimationViewport(benefitListContainerRef)
  return (
    <div className="benefit-list-container" ref={benefitListContainerRef}>
      <ul className="benefit-list">
        {dataList.map(({ title, description, symbol }, key) => (
          <li key={key} className="benefit-item">
            <div className="symbol">{symbol}</div>
            <div className="container-text">
              <h1 className="title">{title}</h1>
              <div className="description">{description}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BenefitList;
