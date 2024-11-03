import { useLoaderData, json } from "react-router-dom";

import EventsList from '../components/EventsList';

function EventsPage() {
  const responseData = useLoaderData();
  const eventsData = responseData.events;
  
  return (
    <>
      <EventsList events={eventsData} />
    </>
  );
}

export default EventsPage;

export async function loader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // throw new Response(JSON.stringify({ message: "Couldn't fetch events."}), {status: 500});
    throw json({message: "Couldn't fetch events."}, {status: 500});
  }
  return response;
}