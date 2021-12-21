import { useContext, useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../store/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [isbtnHighlighted, setBtnisHighlighted] = useState(false);

  const cartCtx = useContext(CartContext);
  const numberofItems = cartCtx.items.reduce((curNum, item) => {
    return curNum + item.amount;
  }, 0);
  let btnClasses = `${classes.button} ${isbtnHighlighted ? classes.bump : ""} `;

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBtnisHighlighted(true);
    const timer = setTimeout(() => {
      setBtnisHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx.items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{numberofItems}</span>
    </button>
  );
};

export default HeaderCartButton;
