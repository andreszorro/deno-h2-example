import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./widgets/NavBar.tsx";
import routes, { RouteInfo } from "./routes.ts";

// type AppProps = {
// };

const App = (/* {}: AppProps */): JSX.Element => {
  return (
    <main>
      <div onClick={(e) => window.alert("Hello World")}>
        Hello React from Deno!
      </div>
      <NavBar />
      <Switch>
        {routes.map((route: RouteInfo) =>
          <Route
            key={route.name}
            component={route.pageComponent}
            path={route.path}
          />
        )}
      </Switch>
    </main>
  );
};

export default App;
