import { useRouteLoaderData } from "react-router-dom";

import EventForm from "../components/EventForm";

function EditEventPage() {
  const loaderData = useRouteLoaderData("event-detail");

  return (
    <EventForm method="PATCH" event={loaderData.event} />
  )
}

export default EditEventPage;