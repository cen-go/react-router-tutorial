import { useLoaderData, json, defer, Await, } from "react-router-dom";
import { Suspense } from "react";

import EventsList from '../components/EventsList';

function EventsPage() {
  const { events } = useLoaderData(); // extracted events from the object returned by defer() by destructoring

  return (
    <Suspense fallback={<h2 className="loading-text">Loading events...</h2>}>
      <Await resolve={events}>
        {(eventsData) => <EventsList events={eventsData} />}
      </Await>
    </Suspense>
  );  
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // throw new Response(JSON.stringify({ message: "Couldn't fetch events."}), {status: 500});
    throw json({message: "Couldn't fetch events."}, {status: 500});
  }
  const resData = await response.json();
  return resData.events; 
  // when using defer() we can't just return the Response object. we need to 
  // parse data manually with .json() and return parsed data for defer()
}

export function loader() {
  // don't forget to return the defer function execution
  return defer({
    events: loadEvents(),
  });
}