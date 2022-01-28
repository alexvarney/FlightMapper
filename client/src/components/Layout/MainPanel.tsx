import styled from "@emotion/styled";
import RoutesPanel from "../RoutesPanel/RoutesPanel";

const Wrapper = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;

  z-index: 100;
  background: #020202;
  margin: 48px;
  border-radius: 8px;
  overflow: hidden;

  color: #fff;
`;

const ScrollWrapper = styled.div`
  overflow-y: scroll;
  padding: 16px;
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
      <ScrollWrapper>
        <RoutesPanel></RoutesPanel>
      </ScrollWrapper>
    </Wrapper>
  );
}

export default MainPanel;
