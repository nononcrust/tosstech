export type AgnosticRoute = {
  path: string;
};

export type Location = {
  pathname: string;
  search: string;
  hash: string;
};

export type RouterState = {
  location: Location;
};

export type RouterInit = {
  routes: AgnosticRoute[];
  history: History;
};

export type RouterInitializer = {
  initialize: () => Router;
};

export type Router = {
  routes: AgnosticRoute[];
  state: RouterState;
  subscribe: (listener: () => void) => () => void;
  getState: () => RouterState;
  navigate: (to: string, options?: { replace?: boolean }) => void;
  dispose: () => void;
};

export type History = {
  location: Location;
  push: (to: string) => void;
  replace: (to: string) => void;
  listen: (listener: HistoryListener) => () => void;
};

export type HistoryListener = (location: Location) => void;

export type BrowserHistory = History;
