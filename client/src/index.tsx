import ReactDOM from "react-dom";
import "./index.css";
import RootLayout from "./components/Layout/RootLayout";

export const App = () => {
  return (
    <div className="App">
      <RootLayout />
    </div>
  );
};

export default ReactDOM.render(<App />, document.getElementById("root"));
