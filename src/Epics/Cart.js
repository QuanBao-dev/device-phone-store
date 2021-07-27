import cartStore from "../Store/Cart";

export const cartStream = cartStore;

export const addToCart = (
  title,
  description,
  star,
  originalPrice,
  newPrice,
  imageUrl,
  amount = 1
) => {
  const { dataCart, cartNumberOfProduct } = cartStream.currentState();
  const updateObject = {
    cartNumberOfProduct: {
      ...cartNumberOfProduct,
      [title]: cartNumberOfProduct[title]
        ? cartNumberOfProduct[title] + amount
        : amount,
    },
  };
  if (!cartNumberOfProduct[title]) {
    updateObject.dataCart = [
      ...dataCart,
      {
        title,
        description,
        star,
        originalPrice,
        newPrice,
        imageUrl,
      },
    ];
  }
  cartStream.updateData(updateObject);
  const myCart = JSON.stringify(cartStream.currentState().dataCart);
  const myNumberProductCart = JSON.stringify(
    cartStream.currentState().cartNumberOfProduct
  );
  window.localStorage.setItem("myCart", myCart);
  window.localStorage.setItem("myNumberProductCart", myNumberProductCart);
};

export const removeFromCart = (title) => {
  const { cartNumberOfProduct, dataCart } = cartStream.currentState();
  delete cartNumberOfProduct[title];
  cartStream.updateData({
    dataCart: dataCart.filter((data) => data.title !== title),
    cartNumberOfProduct,
  });
  const myCart = JSON.stringify(cartStream.currentState().dataCart);
  const myNumberProductCart = JSON.stringify(
    cartStream.currentState().cartNumberOfProduct
  );
  window.localStorage.setItem("myCart", myCart);
  window.localStorage.setItem("myNumberProductCart", myNumberProductCart);
};
