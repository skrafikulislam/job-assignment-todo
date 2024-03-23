import React from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const Todo = ({ title, desc, date, updateMode, deleteTodo }) => {
  return (
    <div className="todo">
      <div className="text">{title}</div>
      <div className="text">{desc}</div>
      <div className="text">{date}</div>
      <div className="icons">
        <BiEdit className="icon" onClick={updateMode} />
        <AiFillDelete className="icon" onClick={deleteTodo} />
      </div>
    </div>
  );
};

export default Todo;
