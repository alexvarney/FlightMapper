import ReactDOM from "react-dom";
import { GlobalContextProvider } from "./store/GlobalContext";
import "./index.css";
import RootLayout from "./components/Layout/RootLayout";

export const App = () => {
  return (
    <GlobalContextProvider>
      <div className="App">
        <RootLayout />
      </div>
    </GlobalContextProvider>
  );
};

export default ReactDOM.render(<App />, document.getElementById("root"));
