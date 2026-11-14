import { Link } from 'react-router-dom';
import { FiBriefcase, FiFacebook, FiInstagram, FiTwitter, FiLinkedin } from 'react-icons/fi';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Column 1: Brand & Social */}
                    <div className="footer-col brand-col">
                        <Link to="/" className="footer-logo" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '12px' }}>
                            <img 
                                src="/images/vedaspark-logo.png" 
                                alt="Vedaspark.pro - JOB | CONSULTANCY | PLACEMENT" 
                                style={{ height: '42px', maxWidth: '200px', objectFit: 'contain', display: 'block' }} 
                            />
                        </Link>
                        <p style={{ fontSize: '0.86rem', color: '#64748b', margin: '4px 0 16px', lineHeight: 1.4 }}>
                            <strong>Vedaspark.pro</strong> — Your trusted partner in Job Search, Human Resource Consultancy & Career Placements.
                        </p>

                        <div className="connect-with-us">
                            <p className="social-title">Connect with us</p>
                            <div className="social-icons">
                                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                                    <FiFacebook />
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                                    <FiInstagram />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                                    <FiTwitter />
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                                    <FiLinkedin />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Company Info */}
                    <div className="footer-col">
                        <ul className="footer-link-list">
                            <li><Link to="/about">About us</Link></li>
                            <li><Link to="/careers">Careers</Link></li>
                            <li><Link to="/login?role=company">Employer home</Link></li>
                            <li><Link to="/login?role=admin">Admin Portal</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Legal & Policy */}
                    <div className="footer-col">
                        <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>
                            Legal &amp; Compliance
                        </p>
                        <ul className="footer-link-list">
                            <li><Link to="/privacy">Privacy Policy</Link></li>
                            <li><Link to="/terms">Terms of Use</Link></li>
                            <li><Link to="/payment-policy">Payment Policy</Link></li>
                            <li><Link to="/refund-policy">Return &amp; Refund Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom-bar">
                    <p>© {new Date().getFullYear()} Vedaspark.pro | JOB • CONSULTANCY • PLACEMENT. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
