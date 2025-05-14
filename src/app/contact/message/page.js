'use client';
import Link from 'next/link';
import '../../colour.css';
import '../contact.css'; // Reusing contact.css for styles

export default function MessageSentPage() {
  return (
    <div>
      <div className="message-container">
        <h1 className="message-title">Message Sent!</h1>
        <p className="message-text">
          Thank you for contacting us. We have received your message and will get back to you shortly.
        </p>
        <div className="message-actions">
          <Link href="/" >
            <h5 className="action-button message-button">Go to Homepage</h5>
          </Link>
          <Link href="/contact" >
            <h5 className="action-button message-button secondary">Send Another Message</h5>
          </Link>
        </div>
      </div>
    </div>
  );
}

