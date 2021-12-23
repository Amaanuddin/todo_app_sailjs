import axios from "axios";
import React, { useEffect, useState } from "react";
import { Tab } from "semantic-ui-react";
import Todos from "../Todos";

const Board = () => {
  const [boards, setBoards] = useState([]);
  const [panes, setPanes] = useState([]);
  useEffect(() => {
    fetchBoards();
  }, []);

  useEffect(() => {
    console.log("BOARDS");
    let boardsPane = [];
    boards.forEach((board) => {
      console.log(board);
      boardsPane = [
        ...boardsPane,
        {
          menuItem: board.name,
          render: () => {
            console.log(board.id);
            return <Todos boardId={board.id} />;
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
  console.log(panes);
  return (
    <div className="tabswrapper">
      <Tab
        menu={{ fluid: true, vertical: true, pointing: true }}
        panes={panes}
        menuPosition="left"
      />
    </div>
  );
};

export default Board;
