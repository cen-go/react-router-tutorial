import { useRouteError } from "react-router-dom";

import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";

function ErrorPage() {
  const error = useRouteError();

  let title = "An error occured!";
  let message = "Something went wrong.";

  if (error.status === 500) {
    // message = JSON.parse(error.data).message;
    message = error.data.message; //when throwing json() function of router, we dont need to parse
  }
  if (error.status === 404) {
    title = "Not found!";
    message = "Couldn't find resource or page.";
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
