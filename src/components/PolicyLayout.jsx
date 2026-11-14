import { Link, useLocation } from 'react-router-dom';
import { FiShield, FiFileText, FiCreditCard, FiRefreshCw, FiMail, FiPhoneCall, FiChevronRight } from 'react-icons/fi';
import SEOHead from './SEOHead';

const POLICY_NAV = [
    { path: '/privacy', label: 'Privacy Policy', icon: FiShield },
    { path: '/terms', label: 'Terms of Use', icon: FiFileText },
    { path: '/payment-policy', label: 'Payment Policy', icon: FiCreditCard },
    { path: '/refund-policy', label: 'Return & Refund Policy', icon: FiRefreshCw },
];

export default function PolicyLayout({ title, subtitle, lastUpdated, children }) {
    const location = useLocation();

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '60px' }}>
            <SEOHead 
                title={`${title} | Vedaspark.pro`} 
                description={`${title} for Vedaspark.pro - Leading Job Portal, HR Consultancy & Career Placement Platform.`} 
            />

            {/* Hero Header */}
            <section style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
                color: '#ffffff',
                padding: '52px 20px 48px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '-40%',
                    right: '-10%',
                    width: '450px',
                    height: '450px',
                    background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(0,0,0,0) 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none'
                }} />

                <div className="container" style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <div style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        fontSize: '0.82rem', 
                        color: '#cbd5e1', 
                        marginBottom: '14px',
                        background: 'rgba(255,255,255,0.08)',
                        padding: '6px 14px',
                        borderRadius: '20px'
                    }}>
                        <Link to="/" style={{ color: '#93c5fd', textDecoration: 'none' }}>Home</Link>
                        <FiChevronRight size={13} />
                        <span>Legal & Compliance</span>
                        <FiChevronRight size={13} />
                        <span style={{ color: '#ffffff', fontWeight: 600 }}>{title}</span>
                    </div>

                    <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '8px 0 12px', letterSpacing: '-0.02em' }}>
                        {title}
                    </h1>
                    <p style={{ fontSize: '1.05rem', color: '#cbd5e1', maxWidth: '640px', margin: '0 auto 16px', lineHeight: 1.5 }}>
                        {subtitle}
                    </p>
                    {lastUpdated && (
                        <span style={{ fontSize: '0.82rem', color: '#94a3b8', display: 'inline-block' }}>
                            Last Updated: {lastUpdated}
                        </span>
                    )}
                </div>
            </section>

            {/* Policy Navigation Bar */}
            <div style={{
                background: '#ffffff',
                borderBottom: '1px solid #e2e8f0',
                position: 'sticky',
                top: 0,
                zIndex: 40,
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}>
                <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 16px' }}>
                    <div style={{
                        display: 'flex',
                        overflowX: 'auto',
                        gap: '8px',
                        padding: '10px 0',
                        scrollbarWidth: 'none'
                    }}>
                        {POLICY_NAV.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '10px 18px',
                                        borderRadius: '8px',
                                        fontSize: '0.9rem',
                                        fontWeight: isActive ? 600 : 500,
                                        color: isActive ? '#4338ca' : '#64748b',
                                        background: isActive ? '#eef2ff' : 'transparent',
                                        border: isActive ? '1px solid #c7d2fe' : '1px solid transparent',
                                        textDecoration: 'none',
                                        whiteSpace: 'nowrap',
                                        transition: 'all 0.15s ease'
                                    }}
                                >
                                    <Icon size={16} />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="container" style={{ maxWidth: '1100px', margin: '36px auto 0', padding: '0 20px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1fr) 280px',
                    gap: '32px',
                    alignItems: 'start'
                }}>
                    {/* Content Paper */}
                    <div style={{
                        background: '#ffffff',
                        borderRadius: '16px',
                        border: '1px solid #e2e8f0',
                        padding: '40px 44px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                        lineHeight: 1.7,
                        color: '#334155'
                    }}>
                        {children}
                    </div>

                    {/* Sidebar Help Card */}
                    <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{
                            background: '#ffffff',
                            borderRadius: '14px',
                            border: '1px solid #e2e8f0',
                            padding: '24px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
                        }}>
                            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                                Need Assistance?
                            </h3>
                            <p style={{ fontSize: '0.86rem', color: '#64748b', marginBottom: '16px', lineHeight: 1.5 }}>
                                Have questions regarding our policies, payments, or terms? Contact our support team.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <a 
                                    href="mailto:support@vedaspark.pro"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        padding: '10px 14px',
                                        background: '#f1f5f9',
                                        borderRadius: '8px',
                                        color: '#0f172a',
                                        fontSize: '0.85rem',
                                        fontWeight: 500,
                                        textDecoration: 'none'
                                    }}
                                >
                                    <FiMail style={{ color: '#4f46e5' }} size={16} />
                                    <span>support@vedaspark.pro</span>
                                </a>
                                <a 
                                    href="mailto:billing@vedaspark.pro"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        padding: '10px 14px',
                                        background: '#f1f5f9',
                                        borderRadius: '8px',
                                        color: '#0f172a',
                                        fontSize: '0.85rem',
                                        fontWeight: 500,
                                        textDecoration: 'none'
                                    }}
                                >
                                    <FiCreditCard style={{ color: '#059669' }} size={16} />
                                    <span>billing@vedaspark.pro</span>
                                </a>
                            </div>

                            <hr style={{ margin: '18px 0', border: 'none', borderTop: '1px solid #f1f5f9' }} />

                            <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.4 }}>
                                <strong>Vedaspark.pro</strong><br />
                                Job, HR Consultancy & Placement Solutions.<br />
                                Secure 256-Bit SSL & Razorpay Verified.
                            </div>
                        </div>

                        {/* Quick Razorpay Trust Badge */}
                        <div style={{
                            background: '#f8fafc',
                            borderRadius: '12px',
                            border: '1px dashed #cbd5e1',
                            padding: '18px',
                            textAlign: 'center'
                        }}>
                            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Payment Partner
                            </span>
                            <div style={{ marginTop: '8px', fontSize: '0.92rem', fontWeight: 700, color: '#0f172a' }}>
                                Razorpay Verified
                            </div>
                            <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>
                                100% Secure Payments with PCI-DSS Level 1 Compliance.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
