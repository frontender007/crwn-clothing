import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./cart-icon.styles.scss";
import { CartContext } from "../../contexts/cart-context";

const CartIcon = ({ onClick }) => {
  const { totalItems } = useContext(CartContext);
  return (
    <div className="cart-icon-container" onClick={onClick}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{totalItems}</span>
    </div>
  );
};

export default CartIcon;
