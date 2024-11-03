import { useRouteLoaderData, json } from "react-router-dom";

import EventItem from "../components/EventItem";

function EventDetailPage() { 
  const loaderData = useRouteLoaderData("event-detail");

  return (
    <>
      <EventItem event={loaderData.event} />      
    </>
  )
}

export default EventDetailPage;

export async function loader({request, params}) {
  const response = await fetch(`http://localhost:8080/events/${params.eventId}`);
  if (!response.ok) {
    throw json({message: "Couldn't fetch the resquested event details."}, {status: 500});
  } else {
    return response
  }
}