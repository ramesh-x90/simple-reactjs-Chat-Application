import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";

import TopNav from "./Presentation/Core/TopNav/TopNav";
import { AppRoutes, navBarRoutes } from "./AppRoutes";

function App() {
  return (
    <div>
      <TopNav paths={navBarRoutes} />
      <AppRoutes />
    </div>
  );
}

export default App;
