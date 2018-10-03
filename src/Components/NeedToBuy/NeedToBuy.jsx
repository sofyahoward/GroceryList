import React from 'react';
import './NeedToBuy.css';

//stateless component that renders things you need to buy
const ToDoItems = props => {
    return (
        <div>
            <div className='title1'>
                Need To Buy
            </div>
            <ul className="theList">
                {/* iterate over state through props and return the items in an array */}
                {/* use props to move item and remove item, pass in two parameters: item.key and false for item being currently in cart */}
                {props.entries.map((item) => {
                    return (
                        <li key={item.key}>
                            {item.text} 
                            <button className='addBtn' onClick={() => props.moveItem(item.key, false)}>Add To Cart</button>
                            <button className='removeBtn' onClick={()=> props.removeItem(item.key, false)}>Remove</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};


export default ToDoItems;