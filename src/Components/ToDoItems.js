import React from 'react';
import './ToDoItems.css';

const ToDoItems = props => {
    return (
        <div>
            <div className='title1'>
                Need To Buy
            </div>
            <ul className="theList">
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