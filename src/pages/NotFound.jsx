import React from 'react';

function NotFound() {
  return (
    <div className="container text-center py-5">
      <h1 className="display-4">404</h1>
      <p className="lead">Oops! The page you're looking for doesn't exist.</p>
      <a href="/" className="btn btn-primary mt-3">Go Home</a>
    </div>
  );
}

export default NotFound;
