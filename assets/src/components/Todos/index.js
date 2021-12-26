import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Header,
  Tab,
  Icon,
  Container,
  Input,
} from "semantic-ui-react";
import Todo from "./todo";
import styled from "styled-components";

const HeadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => (props.completed ? "25px" : "16px")};
  .ui.header {
    margin-bottom: 0;
  }
`;

const Todos = (props) => {
  const { boardId } = props;
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddButton, setShowAddButton] = useState(true);
  const [newTodo, setNewTodo] = useState("");
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

  const addNewTodo = async () => {
    try {
      const response = await axios.post("http://localhost:1337/todo/create", {
        description: newTodo,
        boardId,
        status: false,
      });
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      console.log(error);
    }
  };

  const editTodo = async (newTodo) => {
    try {
      const response = await axios.patch("http://localhost:1337/todo/update", {
        ...newTodo,
      });

      setTodos(
        todos.map((todo) => {
          if (todo.id === response.data.id) {
            return {
              ...todo,
              description: response.data.description,
              status: response.data.status,
            };
          }
          return todo;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await axios.delete(`http://localhost:1337/todo/delete?id=${todoId}`);

      const filteredTodos = todos.filter((todo) => {
        return todo.id !== todoId;
      });
      setTodos([...filteredTodos]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid divided="vertically">
      <Grid.Row columns={2}>
        <Grid.Column className="newtask">
          <HeadingWrapper>
            <Header size="large">New Task</Header>
            {showAddButton ? (
              <Button
                basic
                color="teal"
                icon
                labelPosition="right"
                onClick={() => {
                  setShowAddButton(false);
                }}
              >
                Add New Todo
                <Icon name="add" />
              </Button>
            ) : (
              <Input
                action={{
                  icon: "check",
                  color: "blue",
                  onClick: () => {
                    setShowAddButton(true);
                    if (!newTodo) return;
                    addNewTodo();
                  },
                }}
                placeholder="Enter Todo item..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
              />
            )}
          </HeadingWrapper>
          {todos && todos.length ? (
            todos
              .filter((todo) => !todo.status)
              .map((todo) => {
                return (
                  <Todo
                    todo={todo}
                    key={todo.id}
                    onEdit={editTodo}
                    onDelete={deleteTodo}
                    onMarkComplete={editTodo}
                    boardId={boardId}
                  />
                );
              })
          ) : (
            <Tab.Pane loading={loading}>
              <Container>No Todos.</Container>
            </Tab.Pane>
          )}
        </Grid.Column>
        <Grid.Column className="completedtask">
          <HeadingWrapper completed>
            <Header size="large">Completed Task</Header>
          </HeadingWrapper>
          {todos
            .filter((todo) => todo.status)
            .map((todo) => {
              return (
                <Todo
                  todo={todo}
                  key={todo.id}
                  onDelete={deleteTodo}
                  onMarkComplete={editTodo}
                  boardId={boardId}
                />
              );
            })}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Todos;
