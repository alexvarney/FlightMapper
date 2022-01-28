import styled from "@emotion/styled";
import { useState } from "react";
import useGlobalContext from "../../store/GlobalContext";
import NewRouteField from "./NewRouteInput";

interface TRouteListItemProps {
  origin: string;
  destination: string;
  description?: string;
}

const Wrapper = styled.div`
  background-color: #a5b9c01a;
  display: flex;
  flex-direction: column;

  --primary: #a5b9c0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  background: #182327;
  color: var(--primary);

  padding: 1rem;

  h2,
  button {
    margin: 0;
  }

  button {
    background-color: transparent;
    color: var(--primary);
    border: 2px solid var(--primary);
    border-radius: 4px;
    cursor: pointer;
    font-size: 24px;
    line-height: 14px;
    padding: 2px 4px;
    width: 29px;
    height: 29px;

    :hover {
      background: var(--primary);
      color: #182327;
    }
  }
`;

const ListContainer = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  padding: 0.125rem 0;

  & > li {
    background: #020202;
    margin: 0.5rem;
    padding: 0.5rem;
    color: var(--primary);
    font-weight: 500;
  }
`;

const Title = styled.h2``;

const RouteListItemWrapper = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;

  & > span:first-child {
    flex-grow: 1;
    font-size: 20px;
  }
  & > span:last-child {
    white-space: nowrap;
  }
`;

const RouteListItem = (props: TRouteListItemProps) => (
  <RouteListItemWrapper>
    <span>{props.description}</span>
    <span></span>
    <span>
      {props.origin} - {props.destination}
    </span>
  </RouteListItemWrapper>
);

const RoutesPanel = () => {
  const [globalState] = useGlobalContext();
  const [showNewRoute, setShowNewRoute] = useState(false);

  const routes = globalState.routes.map((item) => ({
    key: item.id,
    origin: item.origin.icao,
    destination: item.destination.icao,
    description: item.description,
  }));

  return (
    <Wrapper>
      <Header>
        <Title>Routes</Title>
        <button onClick={() => setShowNewRoute((x) => !x)}>
          {showNewRoute ? "×" : "+"}
        </button>
      </Header>
      <ListContainer>
        {showNewRoute && <NewRouteField />}
        {routes.map((item) => (
          <RouteListItem {...item} />
        ))}
      </ListContainer>
    </Wrapper>
  );
};

export default RoutesPanel;
