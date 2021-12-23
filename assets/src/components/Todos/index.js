import axios from "axios";
import React, { useEffect, useState } from "react";
import { Tab } from "semantic-ui-react";

const panes = [
  { menuItem: "Tab 1", render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
  { menuItem: "Tab 2", render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
  { menuItem: "Tab 3", render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  { menuItem: "Tab 4", render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  { menuItem: "Tab 5", render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  { menuItem: "Tab 6", render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  { menuItem: "Tab 7", render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  { menuItem: "Tab 8", render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  { menuItem: "Tab 9", render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  { menuItem: "Tab 10", render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  { menuItem: "Tab 11", render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  { menuItem: "Tab 12", render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
];

const Todos = (props) => {
  const { boardId } = props;
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchTodos();
  }, [boardId]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1337/todo/list?boardId=${boardId}`
      );
      setTodos(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  if (!todos.length) {
    return <Tab.Pane loading={loading}>No Todos</Tab.Pane>;
  }
  return todos.map((todo) => {
    return <Tab.Pane>{todo.description}</Tab.Pane>;
  });
};

export default Todos;
