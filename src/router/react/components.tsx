import { useSyncExternalStore } from "react";
import { RouterContext, RouterStateContext } from "./contexts";
import type { BrowserRouter } from "./types";
import { matchRoutes } from "./utils";

type RouterProviderProps = {
  router: BrowserRouter;
};

export const RouterProvider = ({ router }: RouterProviderProps) => {
  const state = useSyncExternalStore(router.subscribe, router.getState);
  const match = matchRoutes(router.routes, state.location);

  return (
    <RouterContext value={{ router, match }}>
      <RouterStateContext value={{ state }}>
        {match && match.route.element}
      </RouterStateContext>
    </RouterContext>
  );
};
