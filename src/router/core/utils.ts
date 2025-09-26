import type {
  BrowserHistory,
  HistoryListener,
  Location,
  Router,
  RouterInit,
  RouterInitializer,
  RouterState,
} from "./types";

export const createRouter = (init: RouterInit): RouterInitializer => {
  const initialize = (): Router => {
    const listeners = new Set<() => void>();

    let state: RouterState = {
      location: init.history.location,
    };

    const subscribe = (listener: () => void) => {
      listeners.add(listener);

      return () => {
        listeners.delete(listener);
      };
    };

    const getState = () => {
      return state;
    };

    const updateState = (newState: RouterState) => {
      state = newState;

      listeners.forEach((listener) => listener());
    };

    const navigate = (to: string, options?: { replace?: boolean }) => {
      if (options?.replace) {
        init.history.replace(to);
      } else {
        init.history.push(to);
      }
    };

    const unlisten = init.history.listen((location) => {
      updateState({
        location,
      });
    });

    const dispose = () => {
      listeners.clear();
      unlisten();
    };

    return {
      routes: init.routes,
      state,
      getState,
      subscribe,
      navigate,
      dispose,
    };
  };

  return {
    initialize,
  };
};

export const createBrowserHistory = (): BrowserHistory => {
  let listener: HistoryListener | null = null;

  const notify = () => {
    const location = createBrowserLocation();

    if (listener !== null) {
      listener(location);
    }
  };

  const listen = (fn: HistoryListener) => {
    if (listener !== null) {
      throw new Error("하나의 리스너만 등록할 수 있습니다.");
    }

    window.addEventListener("popstate", notify);

    listener = fn;

    return () => {
      window.removeEventListener("popstate", notify);

      listener = null;
    };
  };

  const push = (to: string) => {
    window.history.pushState(null, "", to);

    notify();
  };

  const replace = (to: string) => {
    window.history.replaceState(null, "", to);

    notify();
  };

  return {
    location: createBrowserLocation(),
    push,
    replace,
    listen,
  };
};

const createBrowserLocation = (): Location => {
  return {
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  };
};
