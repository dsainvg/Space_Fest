'use client';

import Link from 'next/link';
import React from 'react';
// Styles for this page will be in index.css or a dedicated not-found.css
// For simplicity, we can add to index.css or use inline styles initially.

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Page Not Updated Yet.</p>
      <p className="not-found-description">
        This page is currently under construction or the content is not yet available. Please check back later.
      </p>
      {/* <Link href="./" className="not-found-link">
        Go Back to Homepage
      </Link> */}
    </div>
  );
}
