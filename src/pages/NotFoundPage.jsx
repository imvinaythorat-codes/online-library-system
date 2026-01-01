import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// 404 page is rendered without the shared header and shows the invalid URL.
// This component is used outside the main layout, so it intentionally has no header.
export default function NotFoundPage() {
  const location = useLocation();

  return (
    <section className="page page-404">
      <div className="page-404-inner">
        <h1 className="page-title">Page Not Found</h1>
        <p className="page-subtitle">
          The route <code className="code-chip">{location.pathname}</code> does
          not exist in this application.
        </p>

        <p className="muted-text">
          Check the address for typos, or use the button below to return to the
          home page.
        </p>

        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </section>
  );
}