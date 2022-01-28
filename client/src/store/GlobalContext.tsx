import { createContext, useContext, useState, FunctionComponent } from "react";
import { TRoute } from "./types";

interface TGlobalContext {
  routes: TRoute[];
  tentativeRoute?: TRoute;
}

const initialState: TGlobalContext = {
  routes: [],
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
