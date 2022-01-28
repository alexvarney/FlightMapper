import { createContext, useContext, useState, FunctionComponent } from "react";
import { TRoute } from "./types";

interface TGlobalContext {
  routes: TRoute[];
}

const initialState: TGlobalContext = {
  routes: [
    {
      id: "0",
      description: "Triad - Kitchener",
      origin: {
        name: "Piedmont Triad International Airport",
        icao: "KGSO",
        coordinates: [-79.941122, 36.101],
      },
      destination: {
        name: "Kitchener/Waterloo International Airport",
        icao: "CYKF",
        coordinates: [-80.379671, 43.460444],
      },
    },
    {
      id: "1",
      description: "Kitchener - Lisbon",
      origin: {
        name: "Kitchener/Waterloo International Airport",
        icao: "CYKF",
        coordinates: [-80.379671, 43.460444],
      },
      destination: {
        name: "Lisbon Humberto Delgado Airport",
        icao: "LPPT",
        coordinates: [-9.134167, 38.774167],
      },
    },
    {
      id: "2",
      description: "Lisbon - Dubai",
      origin: {
        name: "Lisbon Humberto Delgado Airport",
        icao: "LPPT",
        coordinates: [-9.134167, 38.774167],
      },
      destination: {
        name: "Dubai International Airport",
        icao: "OMDB",
        coordinates: [55.364444, 25.252778],
      },
    },
  ],
};

type TGlobalContextProvider = [
  TGlobalContext,
  React.Dispatch<React.SetStateAction<TGlobalContext>>
];

export const GlobalContext = createContext<TGlobalContextProvider>([
  { routes: [] as TRoute[] },
  (args) => undefined,
]);

export const GlobalContextProvider: FunctionComponent = ({ children }) => {
  const globalState = useState(initialState);

  return (
    <GlobalContext.Provider value={globalState}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

export default useGlobalContext;
