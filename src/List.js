import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ list, deleteItemHandler, setEditID, setName }) => {
  return list.map((name) => {
    return (
      <div key={name.id} className="grocery-item">
        <div className="title">{name.name}</div>
        <div>
          <button
            className="edit-btn"
            onClick={() => {
              setName(name);
              setEditID(true);
            }}
          >
            <FaEdit />
          </button>
          <button
            className="delete-btn"
            onClick={() => deleteItemHandler(name.id)}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    );
  });
};

export default List;
