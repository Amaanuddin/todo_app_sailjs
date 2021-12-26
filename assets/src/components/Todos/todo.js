import React, { useState } from "react";
import { Tab, Checkbox, Icon, Input } from "semantic-ui-react";
import styled, { css } from "styled-components";

const TodoDescriptionWrapper = styled.div`
  display: inline-flex;
  justify-content: space-between;
  width: -webkit-fill-available;
  align-items: center;
  ${(props) => {
    if (props.checked) {
      return css`
        .ui.checkbox input.hidden + label {
          text-decoration: line-through;
        }
      `;
    }
  }}
`;

const ActionButtonWrapper = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const Todo = (props) => {
  const { todo, onEdit, onDelete, onMarkComplete, boardId } = props;
  const [edit, setEdit] = useState(false);
  const [newdescription, setNewDescription] = useState(todo.description);
  return (
    <Tab.Pane>
      <TodoDescriptionWrapper checked={todo.status}>
        {edit ? (
          <Input
            placeholder="Edit Todo..."
            value={newdescription}
            onChange={(e) => {
              setNewDescription(e.target.value);
            }}
          />
        ) : (
          <Checkbox
            label={todo.description}
            checked={todo.status}
            onChange={() => {
              onMarkComplete({
                ...todo,
                status: !todo.status,
                boardId: boardId,
              });
            }}
          />
        )}
        <ActionButtonWrapper>
          {!todo.status &&
            (!edit ? (
              <Icon
                name="edit"
                color="blue"
                size="large"
                onClick={() => {
                  setEdit(true);
                }}
              />
            ) : (
              <Icon
                name="check"
                color="blue"
                size="large"
                onClick={() => {
                  setEdit(false);
                  if (!newdescription) return;
                  onEdit({
                    ...todo,
                    description: newdescription,
                    boardId: boardId,
                  });
                }}
              />
            ))}
          <Icon
            name="trash alternate outline"
            color="red"
            size="large"
            onClick={() => {
              onDelete(todo.id);
            }}
          />
        </ActionButtonWrapper>
      </TodoDescriptionWrapper>
    </Tab.Pane>
  );
};

export default Todo;
