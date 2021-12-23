import React from "react";
import ReactDOM from "react-dom";
import Boards from "./components/Boards";
import { Container } from "semantic-ui-react";
const App = () => {
  return (
    <Container fluid textAlign="center">
      <Boards />
    </Container>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
