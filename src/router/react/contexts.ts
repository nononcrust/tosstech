import type { RouterState } from "../core/types";
import { createContextFactory } from "@/lib/utils";
import type { BrowserRouter, RouteMatch } from "./types";

type RouterContextValue = {
  router: BrowserRouter;
  match: RouteMatch | null;
};

export const [RouterContext, useRouterContext] =
  createContextFactory<RouterContextValue>("Router");

type RouterStateContextValue = {
  state: RouterState;
};

export const [RouterStateContext, useRouterStateContext] =
  createContextFactory<RouterStateContextValue>("RouterState");
