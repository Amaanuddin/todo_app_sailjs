import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Boards from "./components/Boards";
import { Container } from "semantic-ui-react";
import styled from "styled-components";
import store from "./store";

const Div = styled(Container)`
  padding: 24px;
`;
const App = () => {
  return (
    <Provider store={store}>
      <Div fluid>
        <Boards />
      </Div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
