import { useNavigate, Form, useNavigation, useActionData, json, redirect } from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
  const actionData = useActionData();
  const navigate = useNavigate();

  function cancelHandler() {
    navigate("..");
  }

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method={method} className={classes.form}>      
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : null}
        />
        {actionData && actionData.errors.title && (
          <p className="error-message">{actionData.errors.title}</p>
        )}
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : null}
        />
        {actionData && actionData.errors.image && (
          <p className="error-message">{actionData.errors.image}</p>)}
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : null}
        />
        {actionData && actionData.errors.date && (
          <p className="error-message">{actionData.errors.date}</p>)}
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : null}
        />
        {actionData && actionData.errors.description && (
          <p className="error-message">{actionData.errors.description}</p>)}
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Sumitting" : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function action({ request, params }) {
  const method = request.method;
  const formData = await request.formData();
  const eventData = {
    title: formData.get("title"),
    image: formData.get("image"),
    date: formData.get("date"),
    description: formData.get("description"),
  };
  let url = "http://localhost:8080/events/";

  if (method === "PATCH") {
    url = `http://localhost:8080/events/${params.eventId}`;
  }

  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(eventData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({message: "Couldn't save the event!"}, {status: 500});
  } 

  return redirect("/events");
}
