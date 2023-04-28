import React, { useContext } from "react";
import { CartContext } from "../../contexts/cart-context";
import "./checkout.styles.scss";
import CheckoutItem from "../../components/checkout-item/CheckoutItem.component";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>product</span>
        </div>
        <div className="header-block">
          <span>description</span>
        </div>
        <div className="header-block">
          <span>quantity</span>
        </div>
        <div className="header-block">
          <span>price</span>
        </div>
        <div className="header-block">
          <span>remove</span>
        </div>
      </div>
      {cartItems.map((item) => (
        <CheckoutItem cartItem={item} key={item.id} />
      ))}
      <div className="total">${cartTotal}</div>
    </div>
  );
};

export default Checkout;
