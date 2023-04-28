import React, { useContext } from "react";
import "./checkout-item.styles.scss";
import { CartContext } from "../../contexts/cart-context";

const CheckoutItem = ({ cartItem }) => {
  const { id, name, imageUrl, quantity, price } = cartItem;
  const { removeItemFromCart, addItemToCart, removeItem } =
    useContext(CartContext);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <div className="name">{name}</div>
      <div className="quantity">
        <div className="arrow" onClick={() => removeItem(cartItem)}>
          &#10094;
        </div>
        <div className="value">{quantity}</div>
        <div className="arrow" onClick={() => addItemToCart(cartItem)}>
          &#10095;
        </div>
      </div>
      <div className="price">${price}</div>
      <div className="remove-button" onClick={() => removeItemFromCart(id)}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
