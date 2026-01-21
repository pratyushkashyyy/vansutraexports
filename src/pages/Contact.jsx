import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';

const Contact = () => {
    return (
        <div className="contact-page">
            {/* Header / Breadcrumb Placeholder if needed, but original just goes straight to content usually or has a banner */}
            <div style={{ backgroundColor: '#f8f9fa', padding: '4rem 0' }}>
                <div className="container">
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-primary)', textAlign: 'center', marginBottom: '1rem' }}>Contact Us</h1>
                    <p style={{ textAlign: 'center', color: '#666' }}>We'd love to hear from you. Here is how you can reach us.</p>
                </div>
            </div>

            <section style={{ padding: '4rem 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>

                        {/* Left Column: Contact Info */}
                        <div>
                            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#333' }}>Get In Touch</h2>
                            <p style={{ color: '#666', marginBottom: '2rem' }}>
                                We are available 24/7 by fax, e-mail or by phone. You can also use our quick contact form to ask a question about our services and projects.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                                {/* Location Card */}
                                <div style={{ display: 'flex', gap: '1rem', padding: '1.5rem', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                                    <div style={{ color: 'var(--color-primary)' }}><MapPin size={28} /></div>
                                    <div>
                                        <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#333' }}>Our Location</h3>
                                        <p style={{ color: '#666', lineHeight: '1.6' }}>
                                            Nirmal Nagar, Balaghat, Madhya Pradesh 481001
                                        </p>
                                    </div>
                                </div>

                                {/* Phone Card */}
                                <div style={{ display: 'flex', gap: '1rem', padding: '1.5rem', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                                    <div style={{ color: 'var(--color-primary)' }}><Phone size={28} /></div>
                                    <div>
                                        <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#333' }}>Phone Number</h3>
                                        <p style={{ color: '#666', marginBottom: '0.25rem' }}>+91 7879743528</p>
                                    </div>
                                </div>

                                {/* Email Card */}
                                <div style={{ display: 'flex', gap: '1rem', padding: '1.5rem', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                                    <div style={{ color: 'var(--color-primary)' }}><Mail size={28} /></div>
                                    <div>
                                        <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#333' }}>Email Address</h3>
                                        <p style={{ color: '#666' }}>info.vansutra@gmail.com</p>
                                    </div>
                                </div>

                            </div>

                            {/* Social Links */}
                            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                                <a href="#" style={{ padding: '0.75rem', backgroundColor: '#eee', borderRadius: '50%', color: '#333', transition: 'background-color 0.3s' }} className="social-icon">
                                    <Facebook size={20} />
                                </a>
                                <a href="#" style={{ padding: '0.75rem', backgroundColor: '#eee', borderRadius: '50%', color: '#333', transition: 'background-color 0.3s' }} className="social-icon">
                                    <Instagram size={20} />
                                </a>
                                <a href="#" style={{ padding: '0.75rem', backgroundColor: '#eee', borderRadius: '50%', color: '#333', transition: 'background-color 0.3s' }} className="social-icon">
                                    <Linkedin size={20} />
                                </a>
                            </div>
                        </div>

                        {/* Right Column: Map */}
                        {/* <div style={{ minHeight: '400px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.223075252874!2d73.70868837508496!3d20.04123598135832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdd95cd8d26c5f5%3A0x6b4f7b2c0c7b4b0!2sV%20R%20AGRICO!5e0!3m2!1sen!2sin!4v1709228000000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div> */}

                    </div>
                </div>
            </section>

            {/* Floating WhatsApp Button */}
            <a
                href="https://wa.me/917879743528"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    backgroundColor: '#25D366',
                    color: 'white',
                    padding: '1rem',
                    borderRadius: '50%',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <MessageCircle size={32} />
            </a>

            <style>
                {`
                .social-icon:hover {
                    background-color: var(--color-primary) !important;
                    color: white !important;
                }
            `}
            </style>
        </div>
    );
};

export default Contact;
