import { Link } from "react-router-dom";


const EVENTS = [
  { id: "ev1", title: "Event 1"},
  { id: "ev2", title: "Event 2"},
  { id: "ev3", title: "Event 3"},
  { id: "ev4", title: "Event 4"},
];

function EventsPage() {
  return (
    <>
      <h1>Events</h1>
      <ul>
        {EVENTS.map((event) => (
          <li key={event.id}>
            <Link to={event.id}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default EventsPage;

