import { fetchProduct$ } from "../Epics/Product";

export const fetchProductSubscription = (
  id,
  setProductData,
  setDataRelatedProduct,
  isRelatedProductsIncluded
) => {
  return fetchProduct$(
    `/api/product/${id}${
      isRelatedProductsIncluded ? "?isRelatedProductsIncluded=true" : ""
    }`
  ).subscribe((res) => {
    if (!res.error) {
      setProductData(res.product);
      if (isRelatedProductsIncluded)
        setDataRelatedProduct(res.dataRelatedProduct);
    }
  });
};
