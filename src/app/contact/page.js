'use client';
import '../colour.css'
import './contact.css'
import { useRouter } from 'next/navigation'; // Import useRouter

export default function ContactPage(){
    const router = useRouter(); // Initialize router

    const handleSubmit = (event) => {
        event.preventDefault();
        // Simple validation example (can be more robust)
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        if (!name || !email || !message) {
            alert("Please fill in all fields."); // Or use a more styled notification
            return;
        }
        
        localStorage.setItem("ContactData", JSON.stringify(
            {name: name,
            email: email,
            message: message}
            )
        );
        // Redirect to the success message page
        router.push('/contact/message');
    };

    return(
        <div>
            <div className="contact-main-container">
                <h1 className="maintitle">Get in Touch</h1>
                <div className="contact-lowerpart">
                    <div className="contact-leftpart">
                        <h2>Send Us a Message</h2>
                        <form className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" name="message" rows="5" required></textarea>
                            </div>
                            <button type="submit" onClick={handleSubmit} className="submit-button">Send Message</button>
                        </form>
                    </div>
                    <div className="contact-rightpart">
                        <h2>Contact Information</h2>
                        <div className="contact-info-item">
                            {/* Placeholder for an icon, e.g., using an SVG or font icon library */}
                            <span className="contact-icon">📍</span> 
                            <p>123 Future Tech Avenue, Innovation City, IC 45678</p>
                        </div>
                        <div className="contact-info-item">
                            <span className="contact-icon">📞</span>
                            <p>(123) 456-7890</p>
                        </div>
                        <div className="contact-info-item">
                            <span className="contact-icon">✉️</span>
                            <p>contact@spatsevent.com</p>
                        </div>
                        <div className="contact-info-item">
                            <span className="contact-icon">🕒</span>
                            <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}