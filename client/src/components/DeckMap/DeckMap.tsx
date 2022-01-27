/// app.js
//@ts-ignore
import GlobeView from "@deck.gl/core/src/views/globe-view";
import DeckGL from "@deck.gl/react";
import styled from "@emotion/styled";
import { BitmapLayer, COORDINATE_SYSTEM, ArcLayer, TileLayer } from "deck.gl";
import { useState } from "react";

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
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

const lineData = [
  {
    from: {
      type: "major",
      name: "Kitchener/Waterloo International Airport",
      abbrev: "CYKF",
      coordinates: [-80.379671, 43.460444],
    },
    to: {
      type: "major",
      name: "Piedmont Triad International Airport",
      abbrev: "LPL",
      coordinates: [-79.941122, 36.101],
    },
  },
  {
    from: {
      type: "major",
      name: "Kitchener/Waterloo International Airport",
      abbrev: "CYKF",
      coordinates: [-80.379671, 43.460444],
    },
    to: {
      type: "major",
      name: "Lisbon Humberto Delgado Airport",
      abbrev: "LPPT",
      coordinates: [-9.134167, 38.774167],
    },
  },
  {
    from: {
      type: "major",
      name: "Lisbon Humberto Delgado Airport",
      abbrev: "LPPT",
      coordinates: [-9.134167, 38.774167],
    },
    to: {
      type: "major",
      name: "Dubai International Airport",
      abbrev: "OMDB",
      coordinates: [55.364444, 25.252778],
    },
  },
];

// DeckGL react component
const DeckMap = () => {
  const mapboxToken = process.env.REACT_APP_MAPBOX_API;

  const tileLayer = new TileLayer({
    data: `https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=${mapboxToken}`,
    minZoom: 0,
    maxZoom: 19,
    tileSize: 256,

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

  const circleLayer = new ArcLayer({
    id: "great-circle-layer",
    data: lineData,
    pickable: true,
    getWidth: 3,
    getSourcePosition: (d: any) => d.from.coordinates,
    getTargetPosition: (d: any) => d.to.coordinates,
    getSourceColor: [64, 255, 0],
    getTargetColor: [0, 128, 200],
    getHeight: 0.01,
    greatCicle: true,
  });

  // const tileLayer = new MVTLayer({
  //   data: `https://a.tiles.mapbox.com/v4/mapbox.country-boundaries-v1/{z}/{x}/{y}.vector.pbf?access_token=${mapboxToken}`,

  //   minZoom: 0,
  //   maxZoom: 23,
  //   //@ts-ignore
  //   // getLineColor: [192, 192, 192],
  //   // getFillColor: ,

  //   getLineWidth: (f: any) => {
  //     switch (f.properties.class) {
  //       case "street":
  //         return 6;
  //       case "motorway":
  //         return 10;
  //       default:
  //         return 1;
  //     }
  //   },
  //   lineWidthMinPixels: 1,
  // });

  const layers = [circleLayer, tileLayer];
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

  return (
    <MapWrapper>
      <DeckGL
        views={new GlobeView()}
        viewState={viewState}
        onViewStateChange={(e: any) => setViewState(e.viewState)}
        controller={true}
        layers={layers}
        // width={"100%"}
        // height={"100%"}
      ></DeckGL>
    </MapWrapper>
  );
};

export default DeckMap;
