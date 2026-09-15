import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <main className="container py-5 text-center">
      <p className="text-primary fw-semibold mb-2">404</p>
      <h1 className="mb-3">Kiaan couldn’t find that page</h1>
      <p className="text-muted mb-4">
        The page you are looking for does not exist.
      </p>
      <Link className="btn btn-primary" to="/">
        Go to home page
      </Link>
    </main>
  );
}

export default NotFoundPage;
