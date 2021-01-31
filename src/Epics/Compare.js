import compareStore from "../Store/Compare";

export const compareStream = compareStore;

export const addToCompare = (
  title,
  description,
  star,
  originalPrice,
  newPrice,
  imageUrl
) => {
  const { dataCompare, compareNumberOfProduct } = compareStream.currentState();
  if (!compareNumberOfProduct[title])
    compareStream.updateData({
      dataCompare: [
        {
          title,
          description,
          star,
          originalPrice,
          newPrice,
          imageUrl,
        },
        ...dataCompare,
      ],
      compareNumberOfProduct: {
        ...compareNumberOfProduct,
        [title]: 1,
      },
    });
  compareStream.updateData({ isActive: true });
};

export const removeFromCompare = (title) => {
  const { compareNumberOfProduct, dataCompare } = compareStream.currentState();
  delete compareNumberOfProduct[title];
  compareStream.updateData({
    dataCompare: dataCompare.filter((data) => data.title !== title),
    compareNumberOfProduct,
  });
};
