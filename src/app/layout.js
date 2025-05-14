'use client'; 

import React, { useEffect, useRef } from 'react';
import './index.css'; 
import './colour.css'; 

const NUM_PARTICLES_TARGET = 100;
const PARTICLE_ADD_INTERVAL = 100;
const PARTICLES_PER_INTERVAL = 3;

export default function RootLayout({ children ,navbar}) {
  const showerContainerRef = useRef(null);
  const particleIntervalRef = useRef(null);

  useEffect(() => {
    const container = showerContainerRef.current;
    if (!container) return;

    const createParticle = () => {
      if (!container) return;

      const particle = document.createElement('div');
      particle.classList.add('shower-particle');

      const screenWidth = window.innerWidth;
      const xPosition = (Math.random()) * screenWidth;

      const duration = 0.8 + Math.random() * 1.2;
      const delay = Math.random() * 3;

      const baseAngle = 30; 
      const angleVariation = (Math.random() - 0.5) * 10; 
      const fallAngle = baseAngle + angleVariation;

      particle.style.left = `${xPosition}px`;
      particle.style.setProperty('--fall-angle', `${fallAngle}deg`);
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;

      container.appendChild(particle);

      setTimeout(() => {
        if (particle.parentNode === container) {
          container.removeChild(particle);
        }
      }, (duration + delay) * 1000 + 200);
    };

    for (let i = 0; i < NUM_PARTICLES_TARGET * 0.8; i++) {
      createParticle();
    }

    particleIntervalRef.current = setInterval(() => {
      if (container && container.children.length < NUM_PARTICLES_TARGET) {
        for (let i = 0; i < Math.ceil(Math.random() * PARTICLES_PER_INTERVAL); i++) {
          if (container.children.length < NUM_PARTICLES_TARGET + 10) {
            createParticle();
          }
        }
      }
    }, PARTICLE_ADD_INTERVAL);

    return () => {
      if (particleIntervalRef.current) {
        clearInterval(particleIntervalRef.current);
      }
      if (container) {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
    };
  }, []); 

  return (
    <html lang="en">
      <body>
        <div 
          key="root-layout-shower-container" 
          id="shower-container" 
          ref={showerContainerRef}
        ></div>
        <div className="page-wrapper"
            key={"root-layout-page-wrapper"}>
                {children}
                {navbar}
        </div>
      </body>
    </html>
  );
}