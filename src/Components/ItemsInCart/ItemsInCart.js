import React from "react";
import "./ItemsInCart.css";

const ItemsInCart = props => {

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

ItemsInCart.propTypes = {};

export default ItemsInCart;

