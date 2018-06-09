import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider, Subscribe } from "unstated";

import Input from "./components/Input";
import List from "./components/List";

import { ItemsContainer } from "./container";

class App extends React.Component {
  constructor(props) {
    super(props);

    // We bind `this` to the handlers
    // See https://reactjs.org/docs/handling-events.html
    this.handleCreate = this.handleCreate.bind(this);
    this.itemClick = this.itemClick.bind(this);
  }

  // handleCreate is passed down to the input below, and is called with the text of the item we want to create
  handleCreate(text) {
    this.props.addTodo(text);
  }

  // Called when an item is clicked, passed down into the items themselves
  itemClick(id, done) {
    if (done) {
      this.props.markTodoDone(id);
    } else {
      this.props.markTodoNotDone(id);
    }
  }

  render() {
    return (
      <div>
        <Input onCreate={this.handleCreate} />
        <List
          title="To do"
          items={this.props.items.filter(item => !item.done)}
          onItemClick={this.itemClick}
        />
        <List
          title="Done"
          items={this.props.items.filter(item => item.done)}
          onItemClick={this.itemClick}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <Provider>
    <Subscribe to={[ItemsContainer]}>
      {/*
        Be careful not to pass the function directly,
        or the `this` binidng will be incorrect.
      */}
      {container => (
        <App
          items={container.state.items}
          addTodo={text => container.addTodo(text)}
          markTodoDone={id => container.markTodoDone(id)}
          markTodoNotDone={id => container.markTodoNotDone(id)}
        />
      )}
    </Subscribe>
  </Provider>,
  document.getElementById("app")
);
