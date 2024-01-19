import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./ToDoList.css";

class ToDoList extends React.Component {
  state = {
    items: [],
    newItemText: "",
    counter: 1,
  };

  handleInputChange = (event) => {
    this.setState({ newItemText: event.target.value });
  };

  handleAddItem = (event) => {
    event.preventDefault();
    if (this.state.newItemText.trim()) {
      const newItem = {
        id: uuidv4(),
        text: this.state.newItemText,
        completed: false,
        createdAt: new Date(),
        number: this.state.counter,
      };

      this.setState((prevState) => ({
        items: [...prevState.items, newItem],
        newItemText: "",
        counter: prevState.counter + 1,
      }));
    }
  };

  handleToggleComplete = (itemId) => {
    this.setState((prevState) => ({
      items: prevState.items.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      ),
    }));
  };

  handleDeleteItem = () => {
    this.setState((prevState) => {
      const items = [...prevState.items];
      if (items.length > 0) {
        items.shift();
      }
      return { items };
    });
  };

  timeSince = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);

    const timeUnits = [
      { unit: "year", duration: 31536000 },
      { unit: "month", duration: 2592000 },
      { unit: "day", duration: 86400 },
      { unit: "hour", duration: 3600 },
      { unit: "minute", duration: 60 },
      { unit: "second", duration: 1 },
    ];

    for (const unit of timeUnits) {
      const unitDuration = unit.duration;
      if (seconds >= unitDuration) {
        const count = Math.floor(seconds / unitDuration);
        return `${count} ${unit.unit}${count > 1 ? "s" : ""} ago`;
      }
    }

    return "a few seconds ago";
  };

  render() {
    const { items } = this.state;
    const completedItems = items.filter((item) => item.completed).length;
    const todosLeft = items.filter((item) => !item.completed);

    return (
      <>
        <header className="text-center todo-header">
          <h2>TODO LIST</h2>
        </header>
        <div className="todo-app-container">
          {/* Sidebar */}
          <div className="sidebar">
            <h5>TodoList</h5>
            <p>All Left</p>
            <div className="todos-left-list">
              {todosLeft.map((item) => (
                <div key={item.id} className="todo-left-item">
                  <div className="todo-container">
                    <div className="todo-left-number">#{item.number}</div>
                    <div className="todo-left-text">{item.text}</div>
                  </div>
                  <div className="todo-left-time">
                    {" "}
                    {this.timeSince(item.createdAt)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="main-content">
            <form
              onSubmit={this.handleAddItem}
              className="form-grid justify-content-center my-4"
            >
              <input
                type="text"
                className="form-control"
                placeholder="Add a new task"
                value={this.state.newItemText}
                onChange={this.handleInputChange}
              />
              <button type="submit" className="green-button">
                Add New
              </button>
            </form>
            <div className="grid-container">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`grid-item ${item.completed ? "completed" : ""}`}
                >
                  <div className="grid-display">
                    <span>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => this.handleToggleComplete(item.id)}
                      />
                      <span className="item-number bold-text">
                        #{item.number}{" "}
                      </span>
                      <label
                        className={`form-check-label ${
                          item.completed ? "completed-text" : ""
                        }`}
                        onClick={() => this.handleToggleComplete(item.id)}
                      >
                        {item.text}
                      </label>
                    </span>
                    <div className="item-details">
                      <span className="item-date">
                        {item.createdAt.toLocaleTimeString([], {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                        , {item.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => this.handleDeleteItem(item.id)}
                    className="btn btn-danger btn-sm"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
            <div className="todo-counters mt-4">
              <span className="todos-left">
                <span className="badge badge-primary">{todosLeft.length}</span>{" "}
                Todos left
              </span>
              <span className="all-todos">
                <span className="badge badge-info">{items.length}</span> All
                Todos
              </span>
            </div>
            <div className="text-left mt-4">
              <span className="bold-text">
                Completed {completedItems} of {items.length} tasks
              </span>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${(completedItems / items.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ToDoList;
