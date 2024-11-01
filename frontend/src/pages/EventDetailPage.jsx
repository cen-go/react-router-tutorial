import { useParams } from "react-router-dom";

function EventDetailPage() {
  const params = useParams();

  return (
    <>
      <h1>Event Details</h1>
      <h2>{params.eventId}</h2>
    </>
  )
}

export default EventDetailPage;