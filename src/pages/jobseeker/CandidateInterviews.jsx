import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getApplicationsByUser } from '../../services/applicationService';
import LoadingSpinner from '../../components/LoadingSpinner';
import CandidateSidebar from '../../components/CandidateSidebar';
import { format } from 'date-fns';
import {
    FiCalendar, FiClock, FiVideo, FiExternalLink, FiSearch,
    FiFileText, FiMapPin, FiCheckCircle
} from 'react-icons/fi';

export default function CandidateInterviews() {
    const { currentUser, userData } = useAuth();
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (currentUser) {
            loadInterviews();
        }
    }, [currentUser, userData]);

    async function loadInterviews() {
        setLoading(true);
        try {
            const uid = currentUser?.uid || userData?.id;
            const email = currentUser?.email || userData?.email;
            const apps = await getApplicationsByUser(uid, email);
            const allApps = Array.isArray(apps) ? apps : [];

            const filtered = allApps.filter(app => {
                const s = String(app.applicationStatus || app.status || '').toLowerCase().trim();
                return s.includes('interview') || Boolean(app.interviewDate) || Boolean(app.meetingLink);
            });
            setInterviews(filtered);
        } catch (err) {
            console.error('Error loading candidate interviews:', err);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <LoadingSpinner />;

    return (
        <CandidateSidebar>
            <div style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '60px' }}>
                {/* Header */}
                <div style={{ marginBottom: '28px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                        <div style={{
                            width: '42px', height: '42px', borderRadius: '12px',
                            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#ffffff', fontSize: '1.3rem'
                        }}>
                            <FiCalendar />
                        </div>
                        <div>
                            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                                My Interviews
                            </h1>
                            <p style={{ color: '#64748b', margin: '2px 0 0 0', fontSize: '0.95rem' }}>
                                Manage your scheduled interview rounds, invitations, and meeting access
                            </p>
                        </div>
                    </div>
                </div>

                {/* Empty State */}
                {interviews.length === 0 ? (
                    <div style={{
                        background: '#ffffff', borderRadius: '20px', padding: '60px 24px',
                        textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.02)'
                    }}>
                        <div style={{
                            width: '76px', height: '76px', borderRadius: '50%',
                            background: '#f5f3ff', color: '#8b5cf6', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', fontSize: '2.4rem',
                            margin: '0 auto 18px'
                        }}>
                            <FiCalendar />
                        </div>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>
                            No Interviews Scheduled Yet
                        </h3>
                        <p style={{ color: '#64748b', maxWidth: '480px', margin: '0 auto 24px', fontSize: '0.95rem', lineHeight: 1.6 }}>
                            When employers review your application and invite you for an interview, the meeting link, time, and instructions will appear here.
                        </p>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/jobs" className="btn btn-primary" style={{ padding: '10px 22px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                <FiSearch /> Browse Open Jobs
                            </Link>
                            <Link to="/jobseeker/applications" className="btn btn-outline" style={{ padding: '10px 22px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                <FiFileText /> View My Applications
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {interviews.map(app => {
                            const rawDate = app.appliedDate || app.appliedAt;
                            let appliedStr = 'Recently';
                            try {
                                if (rawDate) {
                                    const d = rawDate.toDate ? rawDate.toDate() : new Date(rawDate);
                                    if (!isNaN(d.getTime())) appliedStr = format(d, 'MMM dd, yyyy');
                                }
                            } catch (e) {}

                            return (
                                <div key={app.id || app.applicationId} style={{
                                    background: '#ffffff', borderRadius: '18px', padding: '24px',
                                    border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
                                                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                                                    {app.jobTitle}
                                                </h3>
                                                <span style={{
                                                    background: '#f3e8ff', color: '#7e22ce', border: '1px solid #d8b4fe',
                                                    padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800,
                                                    display: 'inline-flex', alignItems: 'center', gap: '5px'
                                                }}>
                                                    <FiCalendar /> Interview Invitation
                                                </span>
                                            </div>
                                            <p style={{ margin: '0 0 6px 0', fontSize: '1rem', fontWeight: 700, color: '#0ea5e9' }}>
                                                {app.companyName}
                                            </p>
                                            <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', fontSize: '0.84rem', color: '#64748b' }}>
                                                <span>Applied on: <strong>{appliedStr}</strong></span>
                                                <span>Application ID: <strong>{app.applicationId || app.id}</strong></span>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                                            <Link to={`/jobs/${app.jobId}`} className="btn btn-outline btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                                                <FiExternalLink /> View Job
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Meeting Details Box */}
                                    <div style={{
                                        background: 'linear-gradient(135deg, #faf5ff, #f3e8ff)',
                                        border: '1.5px solid #d8b4fe', borderRadius: '14px', padding: '18px 20px',
                                        display: 'flex', flexDirection: 'column', gap: '10px'
                                    }}>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', fontSize: '0.9rem', color: '#581c87', fontWeight: 600 }}>
                                            <span><FiCalendar /> Interview Date: <strong>{app.interviewDate || 'To be communicated'}</strong></span>
                                            <span><FiClock /> Time: <strong>{app.interviewTime || '10:00 AM'}</strong></span>
                                            <span><FiVideo /> Format: <strong>{app.interviewType || 'Online Video Interview'}</strong></span>
                                        </div>

                                        {app.meetingLink ? (
                                            <div style={{ marginTop: '6px' }}>
                                                <a
                                                    href={app.meetingLink.startsWith('http') ? app.meetingLink : `https://${app.meetingLink}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="btn btn-primary"
                                                    style={{ background: '#7e22ce', borderColor: '#7e22ce', textDecoration: 'none', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                                                >
                                                    <FiVideo /> Join Video Meeting
                                                </a>
                                            </div>
                                        ) : (
                                            <p style={{ margin: 0, fontSize: '0.85rem', color: '#7e22ce', fontStyle: 'italic' }}>
                                                Meeting link or location will be updated shortly by the interviewer.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </CandidateSidebar>
    );
}
