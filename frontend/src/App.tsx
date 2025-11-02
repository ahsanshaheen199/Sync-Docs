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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
