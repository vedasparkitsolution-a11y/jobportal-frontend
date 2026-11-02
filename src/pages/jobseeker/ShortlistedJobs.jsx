import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getApplicationsByUser } from '../../services/applicationService';
import LoadingSpinner from '../../components/LoadingSpinner';
import CandidateSidebar from '../../components/CandidateSidebar';
import { format } from 'date-fns';
import {
    FiCheckSquare, FiBriefcase, FiExternalLink, FiCalendar, FiClock,
    FiVideo, FiStar, FiFileText, FiSearch, FiMapPin, FiDollarSign, FiAward
} from 'react-icons/fi';

export default function ShortlistedJobs() {
    const { currentUser, userData } = useAuth();
    const [applications, setApplications] = useState([]);
    const [shortlisted, setShortlisted] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'shortlisted', 'interview', 'hired'

    useEffect(() => {
        if (currentUser) {
            loadShortlisted();
        }
    }, [currentUser, userData]);

    async function loadShortlisted() {
        setLoading(true);
        try {
            const uid = currentUser?.uid || userData?.id;
            const email = currentUser?.email || userData?.email;
            const apps = await getApplicationsByUser(uid, email);
            const allApps = Array.isArray(apps) ? apps : [];
            setApplications(allApps);

            const filtered = allApps.filter(app => {
                const s = String(app.applicationStatus || app.status || '').toLowerCase().trim();
                return s === 'shortlisted' || s.includes('shortlist') || s.includes('interview') || s === 'selected' || s === 'hired';
            });
            setShortlisted(filtered);
        } catch (err) {
            console.error('Error loading shortlisted jobs:', err);
        } finally {
            setLoading(false);
        }
    }

    const displayedJobs = shortlisted.filter(app => {
        const s = String(app.applicationStatus || app.status || '').toLowerCase().trim();
        if (filterStatus === 'interview') return s.includes('interview');
        if (filterStatus === 'hired') return s === 'selected' || s === 'hired';
        if (filterStatus === 'shortlisted') return s === 'shortlisted' || s.includes('shortlist');
        return true;
    });

    const getStatusBadge = (status) => {
        const s = String(status || 'Shortlisted').toLowerCase();
        if (s === 'selected' || s === 'hired') {
            return { label: 'Selected / Hired 🎉', bg: '#dcfce7', color: '#15803d', border: '#bbf7d0' };
        }
        if (s.includes('interview')) {
            return { label: 'Interview Stage', bg: '#f3e8ff', color: '#7e22ce', border: '#d8b4fe' };
        }
        return { label: 'Shortlisted', bg: '#ecfdf5', color: '#047857', border: '#a7f3d0' };
    };

    if (loading) return <LoadingSpinner />;

    return (
        <CandidateSidebar>
            <div style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '60px' }}>
                {/* Header */}
                <div style={{ marginBottom: '28px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                        <div style={{
                            width: '42px', height: '42px', borderRadius: '12px',
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#ffffff', fontSize: '1.3rem'
                        }}>
                            <FiCheckSquare />
                        </div>
                        <div>
                            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                                Shortlisted Jobs
                            </h1>
                            <p style={{ color: '#64748b', margin: '2px 0 0 0', fontSize: '0.95rem' }}>
                                Jobs where your profile and application have been approved and shortlisted by employers
                            </p>
                        </div>
                    </div>
                </div>

                {/* Filter Tabs */}
                {shortlisted.length > 0 && (
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => setFilterStatus('all')}
                            style={{
                                padding: '8px 18px', borderRadius: '24px', border: '1px solid',
                                borderColor: filterStatus === 'all' ? '#10b981' : '#e2e8f0',
                                background: filterStatus === 'all' ? '#10b981' : '#ffffff',
                                color: filterStatus === 'all' ? '#ffffff' : '#475569',
                                fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', transition: 'all 0.2s'
                            }}
                        >
                            All Shortlisted ({shortlisted.length})
                        </button>
                        <button
                            onClick={() => setFilterStatus('interview')}
                            style={{
                                padding: '8px 18px', borderRadius: '24px', border: '1px solid',
                                borderColor: filterStatus === 'interview' ? '#7e22ce' : '#e2e8f0',
                                background: filterStatus === 'interview' ? '#7e22ce' : '#ffffff',
                                color: filterStatus === 'interview' ? '#ffffff' : '#475569',
                                fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', transition: 'all 0.2s'
                            }}
                        >
                            Interviewing ({shortlisted.filter(a => String(a.applicationStatus || a.status || '').toLowerCase().includes('interview')).length})
                        </button>
                        <button
                            onClick={() => setFilterStatus('hired')}
                            style={{
                                padding: '8px 18px', borderRadius: '24px', border: '1px solid',
                                borderColor: filterStatus === 'hired' ? '#047857' : '#e2e8f0',
                                background: filterStatus === 'hired' ? '#047857' : '#ffffff',
                                color: filterStatus === 'hired' ? '#ffffff' : '#475569',
                                fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', transition: 'all 0.2s'
                            }}
                        >
                            Selected / Hired ({shortlisted.filter(a => ['selected', 'hired'].includes(String(a.applicationStatus || a.status || '').toLowerCase())).length})
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {displayedJobs.length === 0 ? (
                    <div style={{
                        background: '#ffffff', borderRadius: '20px', padding: '60px 24px',
                        textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.02)'
                    }}>
                        <div style={{
                            width: '76px', height: '76px', borderRadius: '50%',
                            background: '#ecfdf5', color: '#10b981', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', fontSize: '2.4rem',
                            margin: '0 auto 18px'
                        }}>
                            <FiStar />
                        </div>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>
                            {shortlisted.length === 0 ? 'No Shortlisted Jobs Yet' : 'No jobs matching this filter'}
                        </h3>
                        <p style={{ color: '#64748b', maxWidth: '480px', margin: '0 auto 24px', fontSize: '0.95rem', lineHeight: 1.6 }}>
                            {shortlisted.length === 0
                                ? 'When employers review your application and shortlist your resume for interviews or hiring rounds, they will appear right here!'
                                : 'Switch to "All Shortlisted" or browse open opportunities to submit new applications.'}
                        </p>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/jobs" className="btn btn-primary" style={{ padding: '10px 22px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                <FiSearch /> Browse Open Jobs
                            </Link>
                            <Link to="/jobseeker/applications" className="btn btn-outline" style={{ padding: '10px 22px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                <FiFileText /> View All Applied Jobs
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {displayedJobs.map(app => {
                            const badge = getStatusBadge(app.applicationStatus || app.status);
                            const rawDate = app.appliedDate || app.appliedAt;
                            let appliedStr = 'Recently';
                            try {
                                if (rawDate) {
                                    const d = rawDate.toDate ? rawDate.toDate() : new Date(rawDate);
                                    if (!isNaN(d.getTime())) appliedStr = format(d, 'MMM dd, yyyy');
                                }
                            } catch (e) {}

                            const isSelected = ['selected', 'hired'].includes(String(app.applicationStatus || app.status || '').toLowerCase());
                            const hasInterview = Boolean(app.interviewDate) || String(app.applicationStatus || app.status || '').toLowerCase().includes('interview');

                            return (
                                <div key={app.id || app.applicationId} style={{
                                    background: '#ffffff', borderRadius: '18px', padding: '24px',
                                    border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                                    position: 'relative'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '14px' }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
                                                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                                                    {app.jobTitle}
                                                </h3>
                                                <span style={{
                                                    background: badge.bg, color: badge.color, border: `1px solid ${badge.border}`,
                                                    padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800,
                                                    display: 'inline-flex', alignItems: 'center', gap: '5px'
                                                }}>
                                                    <FiCheckSquare /> {badge.label}
                                                </span>
                                            </div>
                                            <p style={{ margin: '0 0 6px 0', fontSize: '1rem', fontWeight: 700, color: '#0ea5e9' }}>
                                                {app.companyName}
                                            </p>
                                            <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', fontSize: '0.84rem', color: '#64748b' }}>
                                                <span>Applied on: <strong>{appliedStr}</strong></span>
                                                <span>Application ID: <strong>{app.applicationId || app.id}</strong></span>
                                                {app.joiningAvailability && <span>Availability: <strong>{app.joiningAvailability}</strong></span>}
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                                            <Link to={`/jobs/${app.jobId}`} className="btn btn-primary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700 }}>
                                                <FiExternalLink /> View Job Details
                                            </Link>
                                            <Link to="/jobseeker/applications" className="btn btn-outline btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                                                <FiFileText /> View Application
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Success Message Banner */}
                                    <div style={{
                                        background: isSelected ? 'linear-gradient(135deg, #f0fdf4, #dcfce7)' : '#f8fafc',
                                        border: `1px solid ${isSelected ? '#86efac' : '#e2e8f0'}`,
                                        borderRadius: '12px', padding: '12px 16px', fontSize: '0.9rem',
                                        color: isSelected ? '#166534' : '#475569', marginBottom: hasInterview ? '12px' : '0',
                                        display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600
                                    }}>
                                        <FiStar style={{ color: isSelected ? '#16a34a' : '#10b981', flexShrink: 0 }} />
                                        <span>
                                            {isSelected
                                                ? 'Congratulations! You have received a selection/offer for this role. The employer will contact you soon with onboarding steps.'
                                                : 'Your application has been shortlisted! The hiring team found your profile a strong fit for this position.'}
                                        </span>
                                    </div>

                                    {/* Interview Details if scheduled */}
                                    {hasInterview && (
                                        <div style={{
                                            background: 'linear-gradient(135deg, #faf5ff, #f3e8ff)',
                                            border: '1.5px solid #d8b4fe', borderRadius: '14px', padding: '16px 20px',
                                            display: 'flex', flexDirection: 'column', gap: '8px'
                                        }}>
                                            <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#6b21a8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <FiCalendar /> Upcoming Interview Invitation
                                            </h4>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '0.88rem', color: '#581c87', fontWeight: 600 }}>
                                                <span><FiCalendar /> Date: <strong>{app.interviewDate || 'To be communicated'}</strong></span>
                                                <span><FiClock /> Time: <strong>{app.interviewTime || '10:00 AM'}</strong></span>
                                                <span><FiVideo /> Type: <strong>{app.interviewType || 'Online Video Interview'}</strong></span>
                                            </div>
                                            {app.meetingLink && (
                                                <div style={{ marginTop: '6px' }}>
                                                    <a
                                                        href={app.meetingLink.startsWith('http') ? app.meetingLink : `https://${app.meetingLink}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="btn btn-primary btn-sm"
                                                        style={{ background: '#7e22ce', textDecoration: 'none', fontWeight: 700 }}
                                                    >
                                                        Join Video Meeting
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </CandidateSidebar>
    );
}
