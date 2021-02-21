import shopStore from "../Store/Shop";

export const shopStream = shopStore;

export function filterByQuery(stream = shopStream, category, keySearch, minPrice, maxPrice) {
  let dataOriginalList = [...stream.currentState().dataOriginalList];
  if (category.trim() !== "") {
    dataOriginalList = dataOriginalList.filter(({ tags }) =>
      tags.includes(category.trim())
    );
  }
  if (keySearch.trim() !== "") {
    dataOriginalList = dataOriginalList.filter(({ title }) => {
      const keyReg = new RegExp(keySearch.trim(), "i");
      return title.match(keyReg);
    });
  }
  if(minPrice !== undefined && maxPrice !== undefined){
    dataOriginalList = dataOriginalList.filter(({ newPrice, originalPrice }) => {
      const priceDisplay = parseFloat(
        (newPrice ? newPrice : originalPrice).replace("$", "")
      );
      return minPrice <= priceDisplay && priceDisplay <= maxPrice;
    })
  }
  stream.updateData({
    dataList: dataOriginalList,
  });
}
