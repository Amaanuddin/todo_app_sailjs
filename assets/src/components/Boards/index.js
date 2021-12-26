import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Tab,
  Menu,
  Header,
  Icon,
  Button,
  Container,
  Input,
} from "semantic-ui-react";
import Todos from "../Todos";

import scrollBar from "../../utilities/scrollBar";
import styled from "styled-components";

const Wrapper = styled.div`
  .newtask,
  .completedtask,
  .vertical.menu {
    max-height: 88vh;
    ${() => scrollBar({ width: "4px", height: "6px" })};
  }
  .stretched,
  .active {
    height: max-content;
    max-height: 83vh;
  }

  .newtask,
  .completedtask {
    max-height: 83vh;
  }
  .ui.container {
    margin: 0;
    margin-bottom: 16px;
    width: -webkit-fill-available;
  }

  .ui[class*="vertically divided"].grid > .row {
    /* position: relative;
    top: -50px; */
    margin-top: 14px;
    border: 1px solid rgba(34, 36, 38, 0.15);
    box-shadow: 0 1px 2px 0 rgb(34 36 38 / 15%);
  }
  .board-button-container {
    button {
      margin-right: 16px;
    }
  }
  .ui.segment,
  .ui.attached.segment {
    border: none;
  }
`;

const BoardNameWrapper = styled.div`
  display: inline-flex;
  justify-content: space-between;
  width: -webkit-fill-available;
  align-items: center;
  .ui.header {
    margin: 0;
  }
`;

const ActionButtonWrapper = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const Boards = () => {
  const [boards, setBoards] = useState([]);
  const [panes, setPanes] = useState([]);
  const [newBoardName, setNewBoardName] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAddButton, setShowAddButton] = useState(true);
  useEffect(() => {
    fetchBoards();
  }, []);

  useEffect(() => {
    let boardsPane = [];
    boards.forEach((board) => {
      boardsPane = [
        ...boardsPane,
        {
          menuItem: (
            <Menu.Item key={board.id}>
              <BoardNameWrapper>
                <Header as="h4">{board.name}</Header>
                <ActionButtonWrapper>
                  <Icon
                    name="trash alternate outline"
                    color="red"
                    size="small"
                    onClick={() => {
                      deleteBoard(board.id);
                    }}
                  />
                </ActionButtonWrapper>
              </BoardNameWrapper>
            </Menu.Item>
          ),
          render: () => {
            return (
              <Wrapper>
                <Todos boardId={board.id} key={board.id} />
              </Wrapper>
            );
          },
        },
      ];
    });
    setPanes(boardsPane);
  }, [boards]);

  const fetchBoards = async () => {
    try {
      const response = await axios.get("http://localhost:1337/board/list");
      setBoards(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const addNewBoard = async () => {
    try {
      const response = await axios.post("http://localhost:1337/board/create", {
        name: newBoardName,
      });
      setBoards([...boards, response.data]);
      setNewBoardName("");
      setActiveIndex(boards.length);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBoard = async (boardId) => {
    try {
      const index = boards.findIndex((board) => board.id === boardId);
      await axios.delete(`http://localhost:1337/board/delete?id=${boardId}`);
      if (index === boards.length - 1 && index !== 0) {
        setActiveIndex(index - 1);
      } else setActiveIndex(index);

      const filteredBoards = boards.filter((board) => {
        return board.id !== boardId;
      });
      setBoards([...filteredBoards]);
    } catch (error) {
      console.log(error);
    }
  };
  return boards && boards.length ? (
    <Wrapper>
      <Container className="board-button-container">
        {showAddButton ? (
          <Button
            basic
            color="orange"
            icon
            labelPosition="right"
            onClick={() => {
              setShowAddButton(false);
            }}
          >
            Add New Board
            <Icon name="add" />
          </Button>
        ) : (
          <Input
            action={{
              icon: "check",
              color: "blue",
              onClick: () => {
                setShowAddButton(true);
                if (!newBoardName) return;
                addNewBoard();
              },
            }}
            placeholder="Board Name..."
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
          />
        )}
      </Container>
      <Tab
        menu={{ fluid: true, vertical: true, pointing: true }}
        panes={panes}
        // menuPosition="left"
        activeIndex={activeIndex}
        onTabChange={(e, { activeIndex: newIndex }) => setActiveIndex(newIndex)}
        className="tab"
      />
    </Wrapper>
  ) : (
    <Wrapper>
      <Container className="board-button-container">
        {showAddButton ? (
          <Button
            basic
            color="orange"
            icon
            labelPosition="right"
            onClick={() => {
              setShowAddButton(false);
            }}
          >
            Add New Board
            <Icon name="add" />
          </Button>
        ) : (
          <Input
            action={{
              icon: "check",
              color: "blue",
              onClick: () => {
                setShowAddButton(true);
                addNewBoard();
              },
            }}
            placeholder="Board Name..."
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
          />
        )}
      </Container>
    </Wrapper>
  );
};

export default Boards;
