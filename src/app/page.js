'use client'; // Still needed if you have client-side interactions on this page, otherwise can be removed.

import React from 'react';
// CSS imports (index.css, colour.css) are now handled by layout.js

export default function Page() {
    return (
        <div className="page-wrapper"> {/* Main page wrapper for specific page layout */}
            <div className="content-wrapper"> {/* Content wrapper */}
                <div className="event-title">
                    National Students&apos; Space Challenge 2025
                </div>
                <div className="main-heading">
                    Imber Titanis
                </div>
                <div className="tagline">
                    Shower of Titan
                </div>
                <div className="button-container">
                    <button className="action-button">
                        Let&apos;s Explore
                    </button>
                    <button className="action-button">
                        Login
                    </button>
                </div>
                {/* Other page content would go here */}
            </div>
        </div>
    );
}
