/// app.js
//@ts-ignore
import GlobeView from "@deck.gl/core/src/views/globe-view";
import DeckGL from "@deck.gl/react";
import styled from "@emotion/styled";
import { BitmapLayer, COORDINATE_SYSTEM, ArcLayer, TileLayer } from "deck.gl";
import { useState } from "react";

import useGlobalContext from "../../store/GlobalContext";

// Viewport settings
const INITIAL_VIEW_STATE = {
  latitude: 18.8026564796578,
  longitude: -42.1552343524665,
  zoom: 0.75,
  pitch: 0,
  bearing: 0,
};

//const controller = new MapController();

// Data to be used by the LineLayer

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

// DeckGL react component
const DeckMap = () => {
  const mapboxToken = process.env.REACT_APP_MAPBOX_API;

  const [globalState] = useGlobalContext();

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

  const routeLayer = new ArcLayer({
    id: "route-layer",
    data: globalState.routes,
    pickable: true,
    getWidth: 3,
    getSourcePosition: (d: any) => d.origin.coordinates,
    getTargetPosition: (d: any) => d.destination.coordinates,
    getSourceColor: [0, 84, 135],
    getTargetColor: [0, 143, 219],
    getHeight: 0.02,
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
