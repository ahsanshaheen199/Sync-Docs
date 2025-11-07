import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "@/pages/home";
import { Documents } from "@/pages/documents";
import { Document } from "@/pages/document";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/documents",
      element: <Documents />,
    },
    {
      path: "/documents/:id",
      element: <Document />,
    },
    {
      path: "/login",
      async lazy() {
        const { Login } = await import("@/pages/login");
        return { Component: Login };
      },
    },
    {
      path: "/signup",
      async lazy() {
        const { Signup } = await import("@/pages/signup");
        return { Component: Signup };
      },
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
