import type { Location } from "../core/types";
import { createBrowserHistory, createRouter } from "../core/utils";
import type { BrowserRouter, Params, Route, RouteMatch } from "./types";

export const createBrowserRouter = (routes: Route[]): BrowserRouter => {
  return createRouter({
    routes,
    history: createBrowserHistory(),
  }).initialize();
};

export const matchRoutes = (
  routes: Route[],
  location: Location
): RouteMatch | null => {
  const route = routes.find((route) => {
    if (route.path === location.pathname) {
      return true;
    }

    const routeSegments = route.path.split("/").filter(Boolean);
    const locationSegments = location.pathname.split("/").filter(Boolean);

    if (routeSegments.length !== locationSegments.length) {
      return false;
    }

    return routeSegments.every((segment, index) => {
      return segment.startsWith(":") || segment === locationSegments[index];
    });
  });

  if (!route) {
    return null;
  }

  const params = route.path
    .split("/")
    .filter(Boolean)
    .reduce<Params>((acc, segment, index) => {
      const isDynamicRoute = segment.startsWith(":");

      if (isDynamicRoute) {
        const paramName = segment.slice(1);
        const paramValue = location.pathname.split("/").filter(Boolean)[index];
        acc[paramName] = paramValue;
      }

      return acc;
    }, {});

  return {
    params,
    route,
  };
};
