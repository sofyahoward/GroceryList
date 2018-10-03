import React from "react";
import "./ItemsInCart.css";

//stateless component that renders items currently in cart
const ItemsInCart = props => {
  // iterate over the state for items in cart
  //use props to move item on click with ite.key parameter and true for items being currently in cart
  return (
    <div className="CartContainer">
      <div className='title'>Items in Cart</div>
      <ul className="theList">
        {props.entries.map(item => {

          return(
            <li key={item.key}>
              {item.text}
              <button className='returnBtn' onClick={() => props.moveItem(item.key, true)}>
                Add Back
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ItemsInCart;

