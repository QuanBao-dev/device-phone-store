import "./Home.css";

import React, { useEffect, useState } from "react";

import BenefitList from "../../Components/BenefitList/BenefitList";
import BestSeller from "../../Components/BestSeller/BestSeller";
import BlackCardProductList from "../../Components/BlackCardProductList/BlackCardProductList";
import CardProductSaleList from "../../Components/CardProductSaleList/CardProductSaleList";
import Carousel from "../../Components/Carousel/Carousel";
import ClientLogos from "../../Components/ClientLogos/ClientLogos";
import DealOfTheDays from "../../Components/DealOfTheDays/DealOfTheDays";
import NewsLetterSignUp from "../../Components/NewsLetterSignUp/NewsLetterSignUp";
import PopularNews from "../../Components/PopularNews/PopularNews";
import ProductsFilter from "../../Components/ProductsFilter/ProductsFilter";
import { productStream } from "../../Epics/Product";
import {
  useFetchDetailProduct,
  useFetchHomeProducts,
} from "../../Hooks/fetchApi";
import { useInitStream } from "../../Hooks/InitStream";

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
const Home = () => {
  const [productState, setProductState] = useState(
    productStream.currentState()
  );
  const [dealOfTheDayProduct, setDealOfTheDayProduct] = useState(null);
  useInitStream(setProductState, productStream);
  useFetchHomeProducts(productState, productStream);
  useFetchDetailProduct("polaroid-cube+", setDealOfTheDayProduct, null, false);
  const {
    dataFeaturedList,
    dataRecentList,
    dataSaleList,
    dataSaleProductList,
    dataTopList,
    dataBestSeller,
  } = productState;
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
      {dealOfTheDayProduct && (
        <DealOfTheDays dataProduct={dealOfTheDayProduct} />
      )}
      <BestSeller dataBestSeller={dataBestSeller} />
      <PopularNews />
      <ClientLogos />
      <NewsLetterSignUp />
    </div>
  );
};

export default Home;
