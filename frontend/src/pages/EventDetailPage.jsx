import { useRouteLoaderData, json, redirect, defer, Await } from "react-router-dom";
import { Suspense } from "react";

import EventItem from "../components/EventItem";
import EventsList from '../components/EventsList';

function EventDetailPage() { 
  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
      <Suspense fallback={<h2 className="loading-text">Loading event...</h2>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<h2 className="loading-text">Loading events...</h2>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;

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

async function loadEvent(id) {
  const response = await fetch(`http://localhost:8080/events/${id}`);
  if (!response.ok) {
    throw json({message: "Couldn't fetch the resquested event details."}, {status: 500});
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

export async function loader({request, params}) {
  const eventId = params.eventId;
  return defer({
    event: await loadEvent(eventId),  // with await waits for the event data to be ready than renders the page
    events: loadEvents(),
  });
}

export async function action({request, params}) {
  const response = await fetch(`http://localhost:8080/events/${params.eventId}`, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({message: "Couldn't delete the event!"}, {status: 500});
  }

  return redirect("/events");
}