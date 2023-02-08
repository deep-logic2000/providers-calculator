import SlidersSection from "./Sections/SlidersSection/SlidersSection";
import ChartContainer from "./Sections/ChartContainer/ChartContainer";
import { ViewportProvider } from "./helpers/WindowContext";

import "./App.scss";

function App() {
  return (
    <ViewportProvider>
      <div className="container">
        <div className="pageWrapper">
          <SlidersSection />
          <ChartContainer />
        </div>
      </div>
    </ViewportProvider>
  );
}

export default App;
