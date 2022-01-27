import React from "react";
import styled from "@emotion/styled";

interface TRouteListItemProps {
  id: string;
  origin: string;
  destination: string;
  description: string;
}

const flights: TRouteListItemProps[] = [
  {
    id: "0",
    description: "Kitchener - Triad",
    origin: "CYKF",
    destination: "KGSO",
  },
  {
    id: "1",
    description: "Kitchener - Lisbon",
    origin: "CYKF",
    destination: "LPPT",
  },
  {
    id: "2",
    description: "Lisbon - Dubai",
    origin: "LPPT",
    destination: "OMDB",
  },
];

const Wrapper = styled.div`
  background-color: #a5b9c01a;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  background: #182327;
  color: #a5b9c0;

  padding: 1rem;

  h2,
  button {
    margin: 0;
  }

  button {
    background-color: transparent;
    color: #a5b9c0;
    border: 2px solid#a5b9c0;
    border-radius: 4px;
    cursor: pointer;
    font-size: 24px;
    line-height: 14px;
    padding: 2px 4px;

    :hover {
      background: #a5b9c0;
      color: #182327;
    }
  }
`;

const ListContainer = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  padding: 0.125rem 0;
`;

const Title = styled.h2``;

const RouteListItemWrapper = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #020202;
  margin: 0.5rem;
  padding: 0.5rem;
  color: #a5b9c0;
  font-weight: 500;

  & > span:first-child {
    flex-grow: 1;
    font-size: 20px;
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
  return (
    <Wrapper>
      <Header>
        <Title>Routes</Title>
        <button>+</button>
      </Header>
      <ListContainer>
        {flights.map((item) => (
          <RouteListItem key={item.id} {...item} />
        ))}
      </ListContainer>
    </Wrapper>
  );
};

export default RoutesPanel;
