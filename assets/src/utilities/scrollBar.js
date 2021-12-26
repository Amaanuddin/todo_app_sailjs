import { css } from "styled-components";

export default (params) => {
  const { width, height } = params;

  return css`
    overflow-x: hidden;
    /* width */
    &::-webkit-scrollbar {
      width: ${width};
      height: ${height};
    }
    /* Track */
    &::-webkit-scrollbar-track {
      background: "#f1f1f1";
    }
    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: rgba(71, 56, 128, 0.5);
    }
    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: rgba(71, 56, 128, 0.75);
    }
  `;
};
