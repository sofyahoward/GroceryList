import React, { Component } from "react";
import NeedToBuy from "../NeedToBuy/NeedToBuy.jsx";
import ItemsInCart from "../ItemsInCart/ItemsInCart.jsx";
import "./GroceryList.css";

class ToDoList extends Component {
  constructor(props) {
    super(props);
    
    //set the state of both components items and items in cart
    this.state = {
      items: [],
      itemsInCart: []
    };
  }

  //add item handler
  addItem = e => {
    var stateItems = this.state.items;
    var stateCart = this.state.itemsInCart;
    //change everything in input to lower case for validation
    var input = this._inputElement.value.toLowerCase();

    //check if an element matches current input
    var checkInput = function(element) {
      return element.text === input;
    };

    //go through each element in a component and see if any element matches the current input
    //if so, throw an alert
    if (stateItems.some(checkInput) || stateCart.some(checkInput)) {
      alert("Hey, this is already on your list");
    }

    //if input value is nt an empty string and 
    //it input value doesnt match previously entered values, add new value to the list
    if (
      this._inputElement.value !== "" &&
      !stateCart.some(checkInput) &&
      !stateItems.some(checkInput)
    ) {
      var newItem = {
        text: this._inputElement.value,
        key: Date.now()
      };

      this.setState(prevState => {
        return {
          items: prevState.items.concat(newItem)
        };
      });
    }
    this._inputElement.value = "";
    e.preventDefault();
  };

  //remove item handler
  //const location allows for dynamic changes to the state
  //filter out all items that dont match the one clicked
  //set state dynamically to the newly filtered items
  //checking for isItemInCart allows to see which component the item is in
  removeItem = (itemKey, isItemInCart) => {
    const location = isItemInCart ? "itemsInCart" : "items";

    const filteredItems = this.state[location].filter(
      item => item.key !== itemKey
    );

    this.setState({ [location]: filteredItems });
  };

  //move item handler
  //const location allows for dynamic changes to the state
  //this time we are moving an item to the other component if its' key matches the clicked item's key
  //we are doing so by pushing that itme to the corresponding state array
  //then set the state and remove item from previous array
  moveItem = (itemKey, isItemInCart) => {
    const location = isItemInCart ? "itemsInCart" : "items";
    const destination = isItemInCart ? "items" : "itemsInCart";
    const moveItemArray = this.state[location].filter(
      item => item.key === itemKey
    );
    const moveItem = moveItemArray[0];
    const array = this.state[destination];
    array.push(moveItem);
    this.setState({ [destination]: array });
    this.removeItem(itemKey, isItemInCart);
  };
  //pass the props to both components from parent to child
  render() {
    return (
      <div className="contents">
        <div className="todoListMain">
          <div className="header">
            <form onSubmit={this.addItem}>
              <input
                ref={a => (this._inputElement = a)}
                placeholder="enter groceries"
              />
              <button type="submit">add</button>
            </form>
          </div>
          <div className="row">
            <NeedToBuy
              entries={this.state.items}
              removeItem={this.removeItem}
              moveItem={this.moveItem}
            />
            <ItemsInCart
              entries={this.state.itemsInCart}
              moveItem={this.moveItem}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ToDoList;
