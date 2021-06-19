import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import routes, { RouteInfo } from "../routes.ts";

const NavBar = (): ReactElement => (
  <nav>
    <ul>
      {routes.map((route: RouteInfo) =>
        <li>
          <Link to={route.path}>{route.name}</Link>
        </li>
      )}
    </ul>
  </nav>
);

export default NavBar;
