import type { AgnosticRoute, Router } from "../core/types";

export type Route = {
  path: AgnosticRoute["path"];
  element?: React.ReactNode;
};

export type BrowserRouter = Router;

export type Params = Record<string, string>;

export type RouteMatch = {
  params: Params;
  route: Route;
};
