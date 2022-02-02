import { getSnapshot } from "mobx-state-tree";
import { createContext, FunctionComponent, useContext } from "react";
import { RootStore } from "./root.store";

const RootStoreSingleton = RootStore.create({
  tentativeRoute: {
    originInput: "",
    destinationInput: "",
  },
});

(window as any).rootStore = RootStoreSingleton;
(window as any).getSnapshot = getSnapshot;

const GlobalContext = createContext(RootStoreSingleton);

export const GlobalContextProvider: FunctionComponent = ({ children }) => {
  return (
    <GlobalContext.Provider value={RootStoreSingleton}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

export default useGlobalContext;
