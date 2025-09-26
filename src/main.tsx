import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Home, Post } from "@/pages";
import { RouterProvider } from "./router/react/components";
import { createBrowserRouter } from "./router/react/utils";
import { PostList } from "./pages/PostList";
import { PostCreate } from "./pages/PostCreate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/posts",
    element: <PostList />,
  },
  {
    path: "/posts/create",
    element: <PostCreate />,
  },
  {
    path: "/posts/:id",
    element: <Post />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
