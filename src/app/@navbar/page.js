'use client';
import Link from 'next/link'; 
import './navbar.css';
import '../colour.css';
import { useState } from 'react';

export default function Navbar() { 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      <Link href="/">
        
      </Link>
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <Link href="/Schedule" className="Linkbtn">Schedule</Link>
        <Link href="/profile" className="Linkbtn">Profile</Link>
        <Link href="/contact" className="Linkbtn">Contact Us</Link>
        <Link href="/about" className='Linkbtn'>About</Link>
        <Link href="/guests" className='Linkbtn'>Guest Lectures</Link>
        <Link href="/team" className="Linkbtn">Our Team</Link>
      </div>
    </div>
  );
}