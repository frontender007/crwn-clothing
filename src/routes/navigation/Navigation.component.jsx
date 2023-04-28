import { useContext } from 'react';
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartIcon from '../../components/cart-icon/CartIcon.component';
import CartDropdown from '../../components/cart-dropdown/CartDropdown.component';
import "./navigation.styles.scss";
import { UserContext } from "../../contexts/user-context";
import { CartContext } from "../../contexts/cart-context";
import { signOutUser } from '../../utils/firebase/firebase.utils'


const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);
  
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="./shop">
            Shop
          </Link>
          {
            currentUser ? 
            (<span className="nav-link" onClick={signOutUser}>Sign Out</span>) :
            
            (
              <Link className="nav-link" to="./auth">
                Sign In
              </Link>
            )
          }
          <CartIcon onClick={toggleCart}/>
        </div>
        { isCartOpen && <CartDropdown /> }
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
