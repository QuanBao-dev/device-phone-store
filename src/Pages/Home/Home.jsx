import './Home.css';

import React from 'react';

import BenefitList from '../../Components/BenefitList/BenefitList';
import BestSeller from '../../Components/BestSeller/BestSeller';
import BlackCardProductList from '../../Components/BlackCardProductList/BlackCardProductList';
import CardProductSaleList from '../../Components/CardProductSaleList/CardProductSaleList';
import Carousel from '../../Components/Carousel/Carousel';
import ClientLogos from '../../Components/ClientLogos/ClientLogos';
import DealOfTheDays from '../../Components/DealOfTheDays/DealOfTheDays';
import NewsLetterSignUp from '../../Components/NewsLetterSignUp/NewsLetterSignUp';
import PopularNews from '../../Components/PopularNews/PopularNews';
import ProductsFilter from '../../Components/ProductsFilter/ProductsFilter';
import { dataListProduct, getDataByTitle } from '../../Epics/Share';

const dataBlackCardList = [
  {
    genre: "New Step",
    title: "Apple iPhone",
    startingAt: "$599",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/12/featured-2-2.jpg",
  },
  {
    genre: "One Shot",
    title: "iMac Pro Xeon Radeon Vega",
    startingAt: "$5199",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/12/featured-1-1-2.jpg",
  },
];

const dataSaleProductList = [
  getDataByTitle("Meizu M6 Note Blue"),
  getDataByTitle("Asus Zenbook ux360ca"),
  getDataByTitle("Samsung Gear Blue"),
];

const dataRecentList = [
  getDataByTitle("Xiaomi Mi Mix 2"),
  getDataByTitle("OnePlus 5T"),
  getDataByTitle("Google Daydream VR"),
  getDataByTitle("JBL Pulse 3"),
];

const dataFeaturedList = [
  getDataByTitle("Misfit Shine 2"),
  getDataByTitle("Bluetooth Keyboard"),
  getDataByTitle("Sony Watch Series F"),
  getDataByTitle("Nokia 6 Dual Sim"),
];

const dataTopList = [
  getDataByTitle("Polaroid Cube+"),
  getDataByTitle("Xiaomi Mi Mix 2"),
  getDataByTitle("Google Daydream VR"),
  getDataByTitle("JBL Pulse 3"),
];

const dataSaleList = dataListProduct.filter(({ isSale }) => isSale).slice(0, 4);

const Home = () => {
  return (
    <div>
      <Carousel />
      <BenefitList />
      <div
        style={{
          width: "100%",
          margin: "auto",
          paddingTop: "6rem",
          maxWidth: "1210px",
        }}
      >
        <BlackCardProductList dataList={dataBlackCardList} />
        <CardProductSaleList dataList={dataSaleProductList} />
      </div>
      <ProductsFilter
        dataListRecent={dataRecentList}
        dataListFeatured={dataFeaturedList}
        dataListSale={dataSaleList}
        dataListTop={dataTopList}
      />
      <DealOfTheDays dataProduct={getDataByTitle("Polaroid Cube+")} />
      <BestSeller />
      <PopularNews />
      <ClientLogos />
      <NewsLetterSignUp />
    </div>
  );
};

export default Home;
