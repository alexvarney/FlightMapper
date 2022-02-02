import { useState } from "react";
import useGlobalContext from "../../store/GlobalContext";
import NewRouteField from "./NewRouteInput";
import { observer } from "mobx-react-lite";

import {
  Wrapper,
  Header,
  ListContainer,
  Title,
  RouteListItemWrapper,
} from "./RoutesPanel.style";

interface TRouteListItemProps {
  origin: string;
  destination: string;
  description?: string;
}

const RouteListItem = (props: TRouteListItemProps) => (
  <RouteListItemWrapper>
    <span>{props.description}</span>
    <span></span>
    <span>
      {props.origin} - {props.destination}
    </span>
  </RouteListItemWrapper>
);

const RoutesPanel = observer(() => {
  const rootStore = useGlobalContext();
  const [showNewRoute, setShowNewRoute] = useState(false);

  const routes = rootStore.routes.map((item) => ({
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
});

export default RoutesPanel;
