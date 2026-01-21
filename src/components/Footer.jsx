import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#1a1a1a', color: 'white', padding: '4rem 0 2rem' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>

                    {/* Company Info */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                            <img src="/assets/leaf.svg" alt="Vansutra Exports" style={{ height: '32px', filter: 'brightness(0) invert(1)' }} />
                            VANSUTRA EXPORTS
                        </div>
                        <p style={{ color: '#aaa', marginBottom: '1rem' }}>
                            We are committed to delivering the highest quality agricultural products from India to the world.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--color-accent)' }}>Quick Links</h3>
                        <ul style={{ color: '#aaa', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#products">Products</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--color-accent)' }}>Contact Us</h3>
                        <ul style={{ color: '#aaa', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><MapPin size={20} /> Nirmal Nagar, Balaghat, Madhya Pradesh 481001</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><Phone size={20} /> +91 7879743528</li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}><Mail size={20} /> info.vansutra@gmail.com</li>
                        </ul>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid #333', paddingTop: '2rem', textAlign: 'center', color: '#666' }}>
                    <p>&copy; {new Date().getFullYear()} Vansutra Exports. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
