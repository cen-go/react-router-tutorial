import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import EventsPage, { loader as eventsLoader } from "./pages/EventsPage";
import EventDetailPage, {
  loader as eventDetailsLoader,
  action as eventDeleteAction,
} from "./pages/EventDetailPage";
import NewEventPage from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";
import RootLayout from "./pages/Root";
import EventsNavLayout from "./pages/EventsNavLayout";
import ErrorPage from "./pages/ErrorPage";
import { action as addEditEventAction } from "./components/EventForm";
import NewsletterPage, { action as newsletterAction } from "./pages/NewsletterPage";

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
                { index: true, element: <EventDetailPage />, action: eventDeleteAction, },
                { path: "edit", element: <EditEventPage />, action: addEditEventAction },
              ],
            },
            { path: "new", element: <NewEventPage />, action: addEditEventAction, },
          ],
        },
        { path: "newsletter", element: <NewsletterPage />, action: newsletterAction, },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
