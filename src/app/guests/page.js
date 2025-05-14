'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import './guests.css'; // Styles for this page
import Link from 'next/link'; // Import Link component

// Assuming your rock images are in public/rocks/
const rockImages = [
    '/rocks/rock1.png', // Replace with your actual image path
    '/rocks/rock2.png'  // Replace with your actual image path
];

export default function InteractiveGuestLecturesPage() {
    const [guestScenes, setGuestScenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeSceneIndex, setActiveSceneIndex] = useState(0); // Tracks the active scene

    const sceneRefs = useRef([]);

    useEffect(() => {
        fetch('/guests.json') // Assuming guests.json is in the public folder
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const guestsArray = Object.values(data);
                const scenes = guestsArray.map(guest => ({
                    ...guest,
                    rockImage: rockImages[Math.floor(Math.random() * rockImages.length)]
                }));
                setGuestScenes(scenes);
                setLoading(false);
                // Initialize refs arrays based on scenes length
                sceneRefs.current = Array(scenes.length).fill(null).map((_, i) => sceneRefs.current[i] || React.createRef());
            })
            .catch(error => {
                console.error('Error fetching or processing guests:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (loading || guestScenes.length === 0) return;

        const observerOptions = {
            root: null, // observes intersections relative to the viewport
            rootMargin: '0px',
            threshold: 0.7, // Trigger when 70% of the scene is visible
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const intersectingSceneIndex = sceneRefs.current.findIndex(ref => ref && ref.current === entry.target);
                    if (intersectingSceneIndex !== -1) {
                        setActiveSceneIndex(intersectingSceneIndex);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sceneRefs.current.forEach(ref => {
            if (ref && ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => {
            sceneRefs.current.forEach(ref => {
                if (ref && ref.current) {
                    observer.unobserve(ref.current);
                }
            });
            observer.disconnect();
        };
    }, [guestScenes, loading]);

    if (loading) {
        return <div className="loading-message">Loading interactive guest lectures...</div>;
    }

    if (guestScenes.length === 0) {
        return <div className="loading-message">No guest lectures to display.</div>;
    }

    return (
        <div className="interactive-guest-container">
            {guestScenes.map((scene, index) => (
                <section 
                    key={scene.Link || index} 
                    className={`guest-scene ${index === activeSceneIndex ? 'active-scene' : ''}`} // Added active-scene class
                    ref={sceneRefs.current[index]} // Assign individual ref
                >
                    <div className="rock-image-container">
                        <Image 
                            src={scene.rockImage} 
                            alt="Decorative rock formation" 
                            width={500} 
                            height={500} 
                            style={{ objectFit: 'contain', maxWidth: '100%', height: 'auto' }}
                        />
                    </div>
                    <div 
                        className={`guest-details-main-container ${index === activeSceneIndex ? 'active-details' : ''}`}
                    >
                        <div className="guest-details-container">
                            <img src={scene.Image} alt={scene.Name} className="guest-image" />
                            <div className="guest-text-content">
                                <h2>{scene.Title}</h2>
                                {scene.Designation && <h3>{scene.Designation}</h3>}
                                <p>{scene.Description}</p>
                                <Link href={`/guests/${scene.Link}`}>More Details</Link>
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
}
