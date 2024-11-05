import { useFetcher } from "react-router-dom";
import { useEffect, useRef } from "react";

import classes from "./NewsletterSignup.module.css";

function NewsletterSignup() {
  const newsletterRef = useRef();
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  useEffect(() => {
    if (state === "idle" && data && data.message === "Signup successful!") {
      newsletterRef.current.value = "";
    }
  }, [state, data]);

  return (
    <>
      <fetcher.Form
        method="post"
        action="/newsletter"
        className={classes.newsletter}
      >
        <input
          ref={newsletterRef}
          type="email"
          name="email"
          placeholder="Sign up for newsletter..."
          aria-label="Sign up for newsletter"
        />
        <button>Sign up</button>
        {state === "idle" && data && data.message === "Signup successful!" && (
          <p className="success-message">{data.message}</p>
        )}
      </fetcher.Form>
    </>
  );
}

export default NewsletterSignup;
