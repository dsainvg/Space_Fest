'use client';

import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Page Not Updated Yet.</p>
      <p className="not-found-description">
        This page is currently under construction or the content is not yet available. Please check back later.
      </p>
    </div>
  );
}
