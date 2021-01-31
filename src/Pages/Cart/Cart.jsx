import React, { useEffect } from "react";
import HeadLine from "../../Components/HeadLine/HeadLine";
import TableProductsCart from "../../Components/TableProductsCart/TableProductsCart";

const Cart = (props) => {
  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);
  return (
    <div style={{ maxWidth: 1200, margin: "auto" }}>
      <HeadLine pathLocation={props.location.pathname} />
      <TableProductsCart />
    </div>
  );
};

export default Cart;
