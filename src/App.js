import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [name, setName] = useState({ name: "", id: "" });
  const [list, setList] = useState([]);
  const [editID, setEditID] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  // handler
  const clearName = async () => {
    await setName({ name: "", id: "" });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // EDIT ITEM
    if (editID) {
      const newList = list.map((item) => {
        if (item.id === name.id) {
          return name;
        }
        return item;
      });
      setList(newList);
      setName({ name: "", id: "" });
      setEditID(false);
      setAlert({
        show: true,
        msg: "Edited",
        type: "alert-success",
      });
      return null;
    }
    // CREATE ITEM
    if (name.name && !editID) {
      const newId = new Date().getTime().toString();
      setName({ ...name, id: newId });
      setName((prevName) => {
        setList([...list, prevName]);
        return { name: "", id: "" };
      });
      setAlert({
        show: true,
        msg: "item add",
        type: "alert-success",
      });
    } else {
      setAlert({
        show: true,
        msg: "Please enter value",
        type: "alert-danger",
      });
    }
  };
  const deleteItemHandler = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList((oldList) => newList);
    setAlert({
      show: true,
      msg: "item deleted",
      type: "alert-danger",
    });
  };
  // reset the alert
  useEffect(() => {
    const timerOnalert = setTimeout(() => {
      setAlert({
        show: false,
        msg: "",
        type: "",
      });
    }, 500);
    return () => {
      return clearTimeout(timerOnalert);
    };
  }, [alert]);
  return (
    <section className="section-center">
      {/* FORM */}
      <form action="" className="grocery-form" onSubmit={submitHandler}>
        <h3>todo list</h3>
        {/* TEXT INPUT */}
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="What's your task ?! "
            value={name.name}
            onChange={(e) =>
              setName({
                ...name,
                name: e.target.value,
              })
            }
          />
          <button type="submit" className="submit-btn">
            {editID ? "edit" : "Add"}
          </button>
        </div>
      </form>
      {/* LIST OF ITEMS */}
      <div className="grocery-container">
        <List
          list={list}
          deleteItemHandler={deleteItemHandler}
          setEditID={setEditID}
          setName={setName}
        />

        {alert.show && <Alert {...alert} />}

        {list.length !== 0 && (
          <button
            className="clear-btn"
            onClick={() => {
              setList([]);
              setAlert({
                show: true,
                msg: "All items deleted",
                type: "alert-danger",
              });
            }}
          >
            clear items
          </button>
        )}
      </div>
    </section>
  );
}

export default App;
