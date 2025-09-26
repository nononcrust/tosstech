import type { RouterState } from "../core/types";
import { createContextFactory } from "@/lib/utils";
import type { BrowserRouter, RouteMatch } from "./types";

type RouterContextValue = {
  router: BrowserRouter;
};

export const [RouterContext, useRouterContext] =
  createContextFactory<RouterContextValue>("Router");

type RouterStateContextValue = {
  state: RouterState;
};

export const [RouterStateContext, useRouterStateContext] =
  createContextFactory<RouterStateContextValue>("RouterState");

type RouteContextValue = {
  match: RouteMatch | null;
};

export const [RouteContext, useRouteContext] =
  createContextFactory<RouteContextValue>("Route");
