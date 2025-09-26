import { useSyncExternalStore } from "react";
import {
  RouteContext,
  RouterContext,
  RouterStateContext,
  useRouterContext,
  useRouterStateContext,
} from "./contexts";
import type { BrowserRouter } from "./types";
import { matchRoutes } from "./utils";

type RouterProviderProps = {
  router: BrowserRouter;
};

export const RouterProvider = ({ router }: RouterProviderProps) => {
  const state = useSyncExternalStore(router.subscribe, router.getState);

  return (
    <RouterContext value={{ router }}>
      <RouterStateContext value={{ state }}>
        <RenderedRoute />
      </RouterStateContext>
    </RouterContext>
  );
};

const RenderedRoute = () => {
  const { state } = useRouterStateContext();
  const { router } = useRouterContext();

  const match = matchRoutes(router.routes, state.location);

  return (
    <RouteContext value={{ match }}>
      {match && match.route.element}
    </RouteContext>
  );
};
