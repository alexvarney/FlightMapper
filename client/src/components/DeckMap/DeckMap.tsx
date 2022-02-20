/// app.js
//@ts-ignore
import GlobeView from "@deck.gl/core/src/views/globe-view";
import DeckGL from "@deck.gl/react";
import styled from "@emotion/styled";
import { BitmapLayer, COORDINATE_SYSTEM, ArcLayer, TileLayer } from "deck.gl";
import { useState, useMemo } from "react";
import { useStore } from "../../store/root.store";

// Viewport settings
const INITIAL_VIEW_STATE = {
  latitude: 18.8026564796578,
  longitude: -42.1552343524665,
  zoom: 0.75,
  pitch: 0,
  bearing: 0,
};

// Data to be used by the LineLayer

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const useTentativeRoute = () => {
  const [_origin, _destination, airports] = useStore((state) => [
    state.tentativeRoute.origin,

    state.tentativeRoute.destination,

    state.airports,
  ]);

  const [origin, destination] = useMemo(
    () => [airports[_origin ?? ""], airports[_destination ?? ""]],
    [airports, _destination, _origin]
  );

  return origin && destination
    ? [
        {
          id: "tentative",
          origin: {
            name: origin?.name,
            coordinates: origin?.coordinates,
          },
          destination: {
            name: destination?.name,
            coordinates: destination?.coordinates,
          },
        },
      ]
    : [];
};

// DeckGL react component
const DeckMap = () => {
  const mapboxToken = process.env.REACT_APP_MAPBOX_API;

  const tentativeRoute = useTentativeRoute();

  const tileLayer = new TileLayer({
    data: `https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=${mapboxToken}`,
    minZoom: 0,
    maxZoom: 19,
    tileSize: 256,
    pickable: true,
    onClick: (info) => console.log(info),

    renderSubLayers: (props) => {
      const {
        bbox: { west, south, east, north },
      } = props.tile;

      return new BitmapLayer(props, {
        data: null,
        image: props.data,
        _imageCoordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
        bounds: [west, south, east, north],
      });
    },
  });

  console.log(tentativeRoute);

  const routeLayer = new ArcLayer({
    id: "route-layer",
    //@ts-ignore
    data: tentativeRoute,
    pickable: true,
    getWidth: 3,
    //ArcLayer needs lng-lats instead of lat-lngs and I don't like that
    getSourcePosition: (d: any) => [
      d.origin.coordinates[1],
      d.origin.coordinates[0],
    ],
    getTargetPosition: (d: any) => [
      d.destination.coordinates[1],
      d.destination.coordinates[0],
    ],
    getSourceColor: (d: any) =>
      d.id === "tentative" ? [138, 32, 0, 255] : [0, 84, 135],
    getTargetColor: (d: any) =>
      d.id === "tentative" ? [196, 46, 0, 100] : [0, 143, 219],
    getHeight: 0.04,
    greatCicle: true,
  });

  const layers = [routeLayer, tileLayer];
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

  return (
    <MapWrapper>
      <DeckGL
        views={new GlobeView()}
        viewState={viewState}
        onViewStateChange={(e) => setViewState(e.viewState)}
        controller={true}
        layers={layers}
      ></DeckGL>
    </MapWrapper>
  );
};

export default DeckMap;
