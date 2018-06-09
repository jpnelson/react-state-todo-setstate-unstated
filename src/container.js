import { Container } from "unstated";

export class ItemsContainer extends Container {
  constructor() {
    super();
    // The default state can go here.
    // It could otherwise be a class property, like with
    // React's own default state
    this.state = {
      items: []
    };
  }

  addTodo(text) {
    // To ensure that the ID is unique, when get the maximum id that already exists,
    // and add 1 to it (see below)
    const maxId = this.state.items.reduce(
      (maxId, todo) => Math.max(todo.id, maxId),
      -1
    );
    this.setState({
      ...this.state,
      items: this.state.items.concat({
        id: maxId + 1,
        done: false,
        text: text
      })
    });
    return;
  }

  markTodoDone(id) {
    this.setState({
      ...this.state,
      items: this.state.items.map(item => ({
        id: item.id,
        done: item.id === id ? true : item.done,
        text: item.text
      }))
    });
  }

  markTodoNotDone(id) {
    this.setState({
      ...this.state,
      items: this.state.items.map(item => ({
        id: item.id,
        done: item.id === id ? false : item.done,
        text: item.text
      }))
    });
  }
}
