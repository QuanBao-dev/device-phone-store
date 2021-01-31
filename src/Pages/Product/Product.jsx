import './Product.css';

import React, { useEffect, useMemo } from 'react';

import HeadLineProduct from '../../Components/HeadLineProduct/HeadLineProduct';
import ProductDetail from '../../Components/ProductDetail/ProductDetail';
import TabProductDetail from '../../Components/TabProductDetail/TabProductDetail';
import { getAllDataByTags, getDataById } from '../../Epics/Share';

const tabNameList = ["Description", "Additional information", "Reviews"];
const Product = (props) => {
  const { id } = props.match.params;
  const productData = useMemo(() => getDataById(id), [id]);
  const dataRelatedProduct = useMemo(() => getAllDataByTags(productData.tags), [
    productData.tags,
  ]);
  useEffect(() => {
    window.scroll({ top: 0 });
  }, [id]);

  return (
    <div style={{ width: "1210px", margin: "auto", marginTop: "3rem" }}>
      <HeadLineProduct productData={productData} />
      <ProductDetail productData={productData} />
      <TabProductDetail
        dataRelatedProduct={dataRelatedProduct}
        tabNameList={tabNameList}
        productData={productData}
      />
    </div>
  );
};

export default Product;
