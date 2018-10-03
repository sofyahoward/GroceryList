import React, { Component } from "react";
import ToDoItems from "../ToDoItems";
import ItemsInCart from "../ItemsInCart/ItemsInCart";
import "./ToDoList.css";

class ToDoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      itemsInCart: []
    };
  }

  addItem = e => {
    var stateItems = this.state.items;
    var stateCart = this.state.itemsInCart;
    var input = this._inputElement.value;

    var checkInput = function(element) {
      return element.text === input;
    };

    if (stateItems.some(checkInput) || stateCart.some(checkInput)) {
      alert("Hey, this is already on your list");
    }

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

  removeItem = (itemKey, isItemInCart) => {
    const location = isItemInCart ? "itemsInCart" : "items";

    const filteredItems = this.state[location].filter(
      item => item.key !== itemKey
    );

    this.setState({ [location]: filteredItems });
  };

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
            <ToDoItems
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
