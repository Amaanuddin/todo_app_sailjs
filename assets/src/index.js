import React from "react";
import ReactDOM from "react-dom";
import Boards from "./components/Boards";
import { Container } from "semantic-ui-react";
import styled from "styled-components";

const Div = styled(Container)`
  padding: 24px;
`;
const App = () => {
  return (
    <Div fluid>
      <Boards />
    </Div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
