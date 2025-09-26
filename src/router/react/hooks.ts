import { useRouterContext, useRouterStateContext } from "./contexts";

export const useNavigate = () => {
  const { router } = useRouterContext();

  return router.navigate;
};

export const useLocation = () => {
  const { state } = useRouterStateContext();

  return state.location;
};

export const useParams = () => {
  const { match } = useRouterContext();

  return match ? match.params : {};
};
