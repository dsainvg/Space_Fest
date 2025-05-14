'use client';
import './guest-lecture.css';
import { notFound } from 'next/navigation';
import { useState, useEffect, use } from 'react'; 
import Link from 'next/link'; 

export default function SomeguestLecturePage(props) { 
    const resolvedParams = use(props.params); 
    const { key } = resolvedParams; 
    const [guest, setGuest] = useState(null);

    useEffect(() => {
        if (!key) {
            notFound(); 
            return;
        }

        fetch('/guests.json') 
            .then(response => {
                return response.json();
            })
            .then(data => {
                const guestdata = data[key];
                if (!guestdata) {
                    notFound(); 
                } else {
                    setGuest(guestdata);
                }
            })
            .catch(error => {
                console.error('Failed to fetch or process guest data for key:', key, error);
                notFound();
            });
    }, [key]); 

    if (!guest) {
        return (
            <div className="guest-lecture-container" style={{ minHeight: '60vh', justifyContent: 'center' }}>
                <p className="lecture-content" style={{ textAlign: 'center', fontSize: '1.5rem' }}>
                    Guest information is currently unavailable or could not be found.
                </p>
            </div>
        );
    }

    return (
        <div className="guest-lecture-container">
            <h1 className="lecture-title">{guest.Title}</h1>
            
            {guest.Designation && (
                <h2 className="lecture-speaker">{guest.Designation}</h2>
            )}

            <div className="lecture-content">
                {guest.Image && (
                    <div style={{ textAlign: 'center', marginBottom: '30px', marginTop: '10px' }}>
                        <img 
                            src={guest.Image} 
                            alt={`Image of ${guest.Title}`} 
                            style={{ 
                                maxWidth: '100%', 
                                width: 'auto',
                                maxHeight: '350px', 
                                objectFit: 'contain',
                                borderRadius: '10px',
                                boxShadow: '0 5px 15px rgba(0,0,0,0.35)'
                            }} 
                        />
                    </div>
                )}

                {guest.About && (
                    <>
                        <h3>About this Session</h3>
                        <p>{guest.About}</p>
                    </>
                )}

                {guest.Achievements && (
                    <>
                        <h3>Key Highlights / Achievements</h3>
                        <p>{guest.Achievements}</p>
                    </>
                )}

                {guest.Agenda && (
                    <>
                        <h3>Agenda / Topics Covered</h3>
                        <p>{guest.Agenda}</p>
                    </>
                )}
            </div>

            <div className="back-button-container">
                <Link href="/guests" className="back-button">
                    Back to All Guests
                </Link>
            </div>
        </div>
    );
}