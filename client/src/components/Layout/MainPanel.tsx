import styled from "@emotion/styled";
import RoutesPanel from "../RoutesPanel/RoutesPanel";

const Wrapper = styled.div`
  width: 100%;
  min-height: 200px;

  z-index: 100;
  background: #020202;
  margin: 48px;
  border-radius: 8px;
  overflow: hidden;

  color: #fff;

  & > *:not(header) {
    margin: 16px 16px 0 16px;
  }
`;

const Header = styled.header`
  background: #181925;
  padding: 24px;

  h1 {
    margin: 0;
    color: #ccc;
  }
`;

function MainPanel() {
  return (
    <Wrapper>
      <Header>
        <h1>flightmapper</h1>
      </Header>
      <RoutesPanel></RoutesPanel>
    </Wrapper>
  );
}

export default MainPanel;
