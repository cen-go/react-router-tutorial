import { json, redirect } from "react-router-dom";

import EventForm from "../components/EventForm";

function NewEventPage() {

  return (
    <EventForm />
  )
}

export default NewEventPage;

export async function action({ request, params }) {
  const formData = await request.formData();
  const eventData = {
    title: formData.get("title"),
    image: formData.get("image"),
    date: formData.get("date"),
    description: formData.get("description"),
  };

  const response = await fetch("http://localhost:8080/events/", {
    method: "POST",
    body: JSON.stringify(eventData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw json({message: "Couldn't save the event!"}, {status: 500});
  } 

  return redirect("/events");
}