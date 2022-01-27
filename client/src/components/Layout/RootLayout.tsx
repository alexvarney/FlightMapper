import React from "react";
import DeckMap from "../DeckMap/DeckMap";
import styled from "@emotion/styled";
import MainPanel from "./MainPanel";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border: 1px solid red;
  display: grid;
  grid-template-columns: 33% 1fr;
  background: rgb(40, 40, 40);
`;

function RootLayout() {
  return (
    <Wrapper>
      <MainPanel />
      <DeckMap />
    </Wrapper>
  );
}

export default RootLayout;
