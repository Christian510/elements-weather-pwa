import { useRouteError } from "react-router-dom";

function ErrorPage({title = 'Error'}) {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Error Message for {title}</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default ErrorPage;