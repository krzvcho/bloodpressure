// ...existing code from Error.js, now w TSX...
import { useRouteError } from 'react-router-dom';

import PageContent from '../shared/components/PageContent';



function ErrorPage(): JSX.Element {
  const error = useRouteError() as any;

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  if (error?.status === 500) {
    message = error.data?.message || message;
  }

  if (error?.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page.';
  }

  return (
    <>
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
