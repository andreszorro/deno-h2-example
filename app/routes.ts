import { ReactElement } from "react";
import AboutPage from "./pages/AboutPage.tsx";
import HomePage from "./pages/HomePage.tsx";

export type RouteInfo = {
  path: string;
  name: string;
  pageComponent: () => ReactElement;
};

const routes: RouteInfo[] = [
  {
    path: "/react/about/",
    name: "About",
    pageComponent: AboutPage,
  },
  {
    path: "/react/",
    name: "Home",
    pageComponent: HomePage,
  },
];

export default routes;
