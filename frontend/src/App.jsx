import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import EventsPage, { loader as eventsLoader } from "./pages/EventsPage";
import EventDetailPage, { loader as eventDetailsLoader } from "./pages/EventDetailPage";
import NewEventPage, { action as newEventAction } from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";
import RootLayout from "./pages/Root";
import EventsNavLayout from "./pages/EventsNavLayout";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "events",
          element: <EventsNavLayout />,
          children: [
            { index: true, element: <EventsPage />, loader: eventsLoader },
            {
              path: ":eventId",
              loader: eventDetailsLoader,
              id: "event-detail",
              children: [
                { index: true, element: <EventDetailPage /> },
                { path: "edit", element: <EditEventPage /> },
              ],
            },
            { path: "new", element: <NewEventPage />, action: newEventAction, },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
