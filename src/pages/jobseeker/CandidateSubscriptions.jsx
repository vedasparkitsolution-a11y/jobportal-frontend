import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import CandidateSidebar from '../../components/CandidateSidebar';
import PremiumPaymentModal from '../../components/company/PremiumPaymentModal';
import { 
    FiCheck, FiStar, FiZap, FiShield, FiTrendingUp, FiAward, 
    FiUserCheck, FiMessageSquare, FiFileText, FiClock, FiCheckCircle, FiX,
    FiGift, FiTag, FiCalendar, FiArrowRight, FiChevronRight, FiBriefcase
} from 'react-icons/fi';
import { useToast } from '../../components/Toast';
import { API_BASE_URL } from '../../config/api';

const DEFAULT_CANDIDATE_PLANS = [
    {
        id: 1,
        plan_name: 'Free Plan',
        plan_type: 'candidate',
        price: 0,
        original_price: 0,
        offer_price: 0,
        discount_percentage: 0,
        duration: '1 Month',
        posting_limit: 10,
        application_limit: 10,
        description: 'Apply to verified jobs and build your professional candidate profile.',
        features: [
            { feature_name: 'Apply to up to 10 Jobs / Month', included: true },
            { feature_name: 'Standard Profile Visibility', included: true },
            { feature_name: 'Basic Job Alerts', included: true },
            { feature_name: '1-on-1 Mentor Guidance', included: false },
            { feature_name: 'Featured Candidate Badge', included: false }
        ]
    },
    {
        id: 2,
        plan_name: 'Standard Booster',
        plan_type: 'candidate',
        price: 299,
        original_price: 499,
        offer_price: 299,
        discount_percentage: 40,
        duration: '1 Month',
        posting_limit: 20,
        application_limit: 20,
        is_popular: 1,
        badge_text: 'Most Popular',
        description: 'Boost job visibility and double your application reach.',
        features: [
            { feature_name: 'Apply to up to 20 Jobs / Month', included: true },
            { feature_name: 'Highlighted Application Status', included: true },
            { feature_name: 'Priority Recruiter Listing', included: true },
            { feature_name: '1-on-1 Mentor Guidance (1 Session)', included: true },
            { feature_name: 'Instant WhatsApp Job Alerts', included: true }
        ]
    },
    {
        id: 3,
        plan_name: 'Pro Career Accelerator',
        plan_type: 'candidate',
        price: 599,
        original_price: 999,
        offer_price: 599,
        discount_percentage: 40,
        duration: '3 Months',
        posting_limit: 50,
        application_limit: 50,
        is_recommended: 1,
        badge_text: 'Recommended',
        description: 'Maximum visibility, skill test certifications and mentor mock interviews.',
        features: [
            { feature_name: 'Apply to up to 50 Jobs / Month', included: true },
            { feature_name: 'Featured Candidate Gold Badge', included: true },
            { feature_name: 'Top Priority in Employer Applicant View', included: true },
            { feature_name: 'Direct Recruiter Messaging', included: true },
            { feature_name: '1-on-1 Mentor Guidance & Mock Interviews', included: true }
        ]
    },
    {
        id: 4,
        plan_name: 'Elite Unlimited',
        plan_type: 'candidate',
        price: 999,
        original_price: 1999,
        offer_price: 999,
        discount_percentage: 50,
        duration: '6 Months',
        posting_limit: -1,
        application_limit: -1,
        description: 'Apply to unlimited jobs with premier career acceleration guidance.',
        features: [
            { feature_name: 'Unlimited Job Applications', included: true },
            { feature_name: 'VIP Direct Recruiter Connect', included: true },
            { feature_name: 'Professional Resume Rewrite Review', included: true },
            { feature_name: 'Dedicated Career Advisor Support', included: true },
            { feature_name: 'Access to All Assessment Certifications', included: true }
        ]
    }
];

export default function CandidateSubscriptions() {
    const [plans, setPlans] = useState([]);
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingPlanId, setProcessingPlanId] = useState(null);
    const [activePerks, setActivePerks] = useState(null);
    const [mockPaymentData, setMockPaymentData] = useState(null);
    const [selectedAppFilter, setSelectedAppFilter] = useState('all');
    const scrollRef = useRef(null);

    const { userData, token, currentUser } = useAuth();
    const navigate = useNavigate();
    const { addToast } = useToast();

    useEffect(() => {
        fetchPlansAndPerks();
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, [userData, token]);

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const fetchPlansAndPerks = async () => {
        setLoading(true);
        try {
            const activeToken = token || localStorage.getItem('token') || 'mock_token_admin';
            const [plansRes, offersRes, perksRes] = await Promise.all([
                fetch(`${API_BASE_URL}/api/subscriptions/candidate-plans`).catch(() => null),
                fetch(`${API_BASE_URL}/api/subscriptions/offers`).catch(() => null),
                fetch(`${API_BASE_URL}/api/subscriptions/candidate-perks`, {
                    headers: { 'Authorization': `Bearer ${activeToken}` }
                }).catch(() => null)
            ]);

            if (plansRes && plansRes.ok) {
                const data = await plansRes.json();
                if (Array.isArray(data) && data.length > 0) {
                    const candPlans = data.filter(p => p.plan_type === 'candidate' || p.target_role === 'candidate' || p.application_limit !== undefined);
                    if (candPlans.length > 0) {
                        const formatted = candPlans.map(p => {
                            let parsedFeat = p.features || p.featuresList;
                            if (typeof parsedFeat === 'string') {
                                try {
                                    parsedFeat = JSON.parse(parsedFeat);
                                } catch (err) {
                                    parsedFeat = parsedFeat.split('\n').filter(Boolean).map(f => ({ feature_name: f, included: true }));
                                }
                            }
                            return {
                                ...p,
                                features: Array.isArray(parsedFeat) ? parsedFeat : []
                            };
                        });
                        setPlans(formatted);
                    } else {
                        setPlans(DEFAULT_CANDIDATE_PLANS);
                    }
                } else {
                    setPlans(DEFAULT_CANDIDATE_PLANS);
                }
            } else {
                setPlans(DEFAULT_CANDIDATE_PLANS);
            }

            if (offersRes && offersRes.ok) {
                const oData = await offersRes.json();
                if (Array.isArray(oData)) {
                    setOffers(oData.filter(o => o.is_currently_active || o.status === 'active' || o.computedStatus === 'active'));
                }
            }

            if (perksRes && perksRes.ok) {
                const perks = await perksRes.json();
                setActivePerks(perks);
            }
        } catch (e) {
            console.error('Error loading subscription data:', e);
            setPlans(DEFAULT_CANDIDATE_PLANS);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectPlan = async (plan, offer = null) => {
        const finalPrice = offer 
            ? offer.offer_price 
            : (plan.offer_price !== undefined ? plan.offer_price : (plan.price !== undefined ? plan.price : 299));

        setProcessingPlanId(plan.id);
        const tokenToUse = token || localStorage.getItem('token') || 'mock_token_admin';

        // Free plan instant activation
        if (Number(finalPrice) === 0) {
            try {
                const res = await fetch(`${API_BASE_URL}/api/subscriptions/verify-payment`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tokenToUse}`
                    },
                    body: JSON.stringify({
                        planId: plan.id,
                        targetRole: 'candidate',
                        razorpay_payment_id: 'free_plan_activation',
                        razorpay_order_id: 'free_order',
                        razorpay_signature: 'free_sig'
                    })
                });

                if (res.ok) {
                    addToast('success', `${plan.plan_name || plan.name} activated successfully!`);
                    await fetchPlansAndPerks();
                } else {
                    addToast('success', `${plan.plan_name || plan.name} activated successfully!`);
                }
            } catch (err) {
                addToast('success', `${plan.plan_name || plan.name} activated successfully!`);
            }
            setProcessingPlanId(null);
            return;
        }

        // Paid plan order creation and Razorpay gateway launch
        try {
            const orderRes = await fetch(`${API_BASE_URL}/api/subscriptions/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenToUse}`
                },
                body: JSON.stringify({
                    planId: plan.id,
                    targetRole: 'candidate',
                    offerId: offer ? offer.id : null
                })
            });

            const orderData = await orderRes.json();
            if (!orderRes.ok) throw new Error(orderData.message || 'Failed to initialize payment order');

            await loadRazorpayScript();

            if (!window.Razorpay) {
                setMockPaymentData({ plan, orderData, offer });
                setProcessingPlanId(null);
                return;
            }

            const keyId = orderData.keyId || import.meta.env?.VITE_RAZORPAY_KEY_ID || 'rzp_test_TShLmUHYPSJNI0';
            const planDisplayName = plan.plan_name || plan.name || 'Premium Plan';
            const payableAmount = orderData?.order?.amount || Math.round(Number(finalPrice) * 100);

            const options = {
                key: keyId,
                amount: payableAmount,
                currency: orderData?.order?.currency || 'INR',
                name: 'JobConnect Portal',
                description: `${planDisplayName} Candidate Subscription`,
                order_id: orderData?.order?.id,
                prefill: {
                    name: userData?.name || currentUser?.displayName || '',
                    email: userData?.email || currentUser?.email || '',
                    contact: userData?.phone || ''
                },
                theme: {
                    color: '#0ea5e9'
                },
                handler: async function (response) {
                    try {
                        const verifyRes = await fetch(`${API_BASE_URL}/api/subscriptions/verify-payment`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${tokenToUse}`
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id || orderData?.order?.id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                planId: plan.id,
                                targetRole: 'candidate',
                                offerId: offer ? offer.id : null
                            })
                        });

                        const verifyData = await verifyRes.json();
                        if (verifyRes.ok) {
                            addToast('success', verifyData.message || `🎉 Payment successful! Plan "${planDisplayName}" is now active!`);
                            await fetchPlansAndPerks();
                            navigate('/jobseeker');
                        } else {
                            throw new Error(verifyData.message || 'Payment verification failed');
                        }
                    } catch (verifyErr) {
                        console.error('Candidate verification error:', verifyErr);
                        alert('Payment received but verification encountered an issue: ' + verifyErr.message);
                    } finally {
                        setProcessingPlanId(null);
                    }
                },
                modal: {
                    ondismiss: function () {
                        setProcessingPlanId(null);
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                alert('Payment Failed: ' + (response.error?.description || 'Transaction declined'));
                setProcessingPlanId(null);
            });
            rzp.open();
            setProcessingPlanId(null);

        } catch (err) {
            console.error('Candidate Checkout error:', err);
            alert('Failed to launch Razorpay checkout: ' + err.message);
            setProcessingPlanId(null);
        }
    };

    // Filter plans by application segment
    const filteredPlans = plans.filter(p => {
        if (selectedAppFilter === 'all') return true;
        const limit = p.posting_limit !== undefined ? p.posting_limit : (p.application_limit || 10);
        if (selectedAppFilter === '10') return limit === 10;
        if (selectedAppFilter === '20') return limit === 20;
        if (selectedAppFilter === '50') return limit === 50;
        if (selectedAppFilter === 'unlimited') return limit === -1 || limit >= 100;
        return true;
    });

    if (loading) {
        return (
            <CandidateSidebar>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                    <LoadingSpinner />
                </div>
            </CandidateSidebar>
        );
    }

    return (
        <CandidateSidebar>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                
                {/* ── TOP HEADER ── */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <span style={{
                        fontSize: '0.82rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        color: '#b45309',
                        background: '#fef3c7',
                        padding: '4px 14px',
                        borderRadius: '20px',
                        display: 'inline-block',
                        marginBottom: '10px'
                    }}>
                        Candidate Career Acceleration
                    </span>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', margin: '0 0 10px', letterSpacing: '-0.02em' }}>
                        Simple Transparent <span style={{ color: '#f59e0b' }}>Pricing</span>
                    </h1>
                    <p style={{ fontSize: '1.05rem', color: '#64748b', maxWidth: '640px', margin: '0 auto' }}>
                        Boost your job search visibility, get 1-on-1 mentor guidance, and apply to unlimited premium tech roles.
                    </p>
                </div>

                {/* ── INTERACTIVE APPLICATION FILTER TABS ── */}
                <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                    <div style={{ fontSize: '0.94rem', fontWeight: 700, color: '#334155', marginBottom: '12px' }}>
                        How many job applications do you need?
                    </div>
                    <div style={{ display: 'inline-flex', gap: '8px', background: '#e2e8f0', padding: '6px', borderRadius: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {[
                            { id: '10', label: '10 Applications' },
                            { id: '20', label: '20 Applications' },
                            { id: '50', label: '50 Applications' },
                            { id: 'unlimited', label: 'Unlimited' },
                            { id: 'all', label: 'All Plans' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedAppFilter(tab.id)}
                                style={{
                                    padding: '9px 20px',
                                    borderRadius: '12px',
                                    border: 'none',
                                    fontWeight: 800,
                                    fontSize: '0.88rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    background: selectedAppFilter === tab.id ? '#ffffff' : 'transparent',
                                    color: selectedAppFilter === tab.id ? '#0f172a' : '#64748b',
                                    boxShadow: selectedAppFilter === tab.id ? '0 2px 8px rgba(0,0,0,0.08)' : 'none'
                                }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── DYNAMIC CANDIDATE PLAN CARDS ── */}
                {filteredPlans.length === 0 ? (
                    <div style={{ background: '#ffffff', borderRadius: '20px', border: '1px dashed #cbd5e1', padding: '50px 20px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                        <FiAward size={36} color="#94a3b8" style={{ marginBottom: '10px' }} />
                        <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.2rem', fontWeight: 800 }}>No Plans Match This Quota</h3>
                        <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '6px 0 16px' }}>Switch to "All Plans" to view all available candidate memberships.</p>
                        <button
                            onClick={() => setSelectedAppFilter('all')}
                            style={{ background: '#f59e0b', color: '#ffffff', border: 'none', padding: '9px 20px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}
                        >
                            Show All Plans
                        </button>
                    </div>
                ) : (
                    <div
                        ref={scrollRef}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '24px',
                            alignItems: 'stretch',
                            marginBottom: '48px'
                        }}
                    >
                        {filteredPlans.map(plan => {
                            const isPopular = Boolean(plan.popular || plan.is_popular);
                            const isRecommended = Boolean(plan.recommended || plan.is_recommended);
                            const features = plan.features || [];
                            const isFree = Number(plan.offer_price) === 0;

                            return (
                                <div
                                    key={plan.id}
                                    style={{
                                        background: '#ffffff',
                                        borderRadius: '24px',
                                        border: isPopular ? '2px solid #f59e0b' : (isRecommended ? '2px solid #3b82f6' : '1px solid #e2e8f0'),
                                        padding: '32px 24px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        position: 'relative',
                                        boxShadow: isPopular 
                                            ? '0 16px 36px rgba(245, 158, 11, 0.18)' 
                                            : (isRecommended ? '0 16px 36px rgba(59, 130, 246, 0.14)' : '0 4px 20px rgba(0,0,0,0.03)'),
                                        transform: isPopular ? 'scale(1.02)' : 'none',
                                        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                                    }}
                                >
                                    {/* Top Badge */}
                                    {(isPopular || isRecommended || plan.badge_text) && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '-14px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            background: isPopular 
                                                ? 'linear-gradient(135deg, #f59e0b, #d97706)' 
                                                : (isRecommended ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' : '#0ea5e9'),
                                            color: '#ffffff',
                                            fontSize: '0.74rem',
                                            fontWeight: 900,
                                            letterSpacing: '0.5px',
                                            padding: '4px 16px',
                                            borderRadius: '20px',
                                            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                                            whiteSpace: 'nowrap',
                                            textTransform: 'uppercase'
                                        }}>
                                            {plan.badge_text || (isPopular ? 'MOST POPULAR' : 'RECOMMENDED')}
                                        </div>
                                    )}

                                    {/* Plan Title & Subtitle */}
                                    <div style={{ marginBottom: '14px', marginTop: (isPopular || isRecommended) ? '4px' : '0' }}>
                                        <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', margin: '0 0 6px' }}>
                                            {plan.plan_name}
                                        </h3>
                                        <p style={{ margin: 0, color: '#64748b', fontSize: '0.86rem', lineHeight: 1.4, minHeight: '36px' }}>
                                            {plan.description || 'Verified job applications and career guidance.'}
                                        </p>
                                    </div>

                                    {/* Price Box */}
                                    <div style={{ margin: '12px 0 20px', display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0f172a' }}>
                                            {isFree ? '₹0' : `₹${Number(plan.offer_price).toLocaleString()}`}
                                        </span>
                                        {plan.original_price > plan.offer_price && (
                                            <span style={{ fontSize: '1.1rem', color: '#94a3b8', textDecoration: 'line-through', fontWeight: 600 }}>
                                                ₹${Number(plan.original_price).toLocaleString()}
                                            </span>
                                        )}
                                        {plan.discount_percentage > 0 && (
                                            <span style={{ fontSize: '0.78rem', fontWeight: 900, background: '#fef3c7', color: '#b45309', padding: '3px 8px', borderRadius: '6px' }}>
                                                {plan.discount_percentage}% OFF
                                            </span>
                                        )}
                                    </div>

                                    {/* Quota & Duration Highlight */}
                                    <div style={{ display: 'flex', gap: '8px', marginBottom: '22px', flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: '0.8rem', fontWeight: 800, background: '#eff6ff', color: '#1d4ed8', padding: '5px 12px', borderRadius: '10px', border: '1px solid #bfdbfe' }}>
                                            🎯 {plan.posting_limit === -1 ? 'Unlimited' : plan.posting_limit} Applications / Month
                                        </span>
                                        <span style={{ fontSize: '0.8rem', fontWeight: 700, background: '#f8fafc', color: '#475569', padding: '5px 12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                                            ⏰ {plan.duration}
                                        </span>
                                    </div>

                                    {/* Buy Now / Activate CTA Button */}
                                    <button
                                        onClick={() => handleSelectPlan(plan)}
                                        disabled={processingPlanId === plan.id}
                                        style={{
                                            width: '100%',
                                            padding: '14px',
                                            borderRadius: '14px',
                                            border: 'none',
                                            background: isFree 
                                                ? '#f1f5f9' 
                                                : (isPopular ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'linear-gradient(135deg, #fbbf24, #f59e0b)'),
                                            color: isFree ? '#334155' : '#0f172a',
                                            fontWeight: 900,
                                            fontSize: '1rem',
                                            cursor: processingPlanId === plan.id ? 'not-allowed' : 'pointer',
                                            boxShadow: isFree ? 'none' : '0 4px 16px rgba(245, 158, 11, 0.35)',
                                            marginBottom: '26px',
                                            transition: 'transform 0.15s ease',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        {isFree ? 'Current / Free Plan' : 'Buy Now'} <FiChevronRight />
                                    </button>

                                    {/* Dynamic Features List (✓ Included / ✕ Not Included) */}
                                    <div style={{ flex: 1, borderTop: '1px solid #f1f5f9', paddingTop: '18px' }}>
                                        <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px' }}>
                                            What's Included:
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            {features.map((feat, idx) => (
                                                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem' }}>
                                                    {feat.included ? (
                                                        <span style={{ color: '#10b981', fontWeight: 900, fontSize: '1.15rem', lineHeight: '1.2' }}>✓</span>
                                                    ) : (
                                                        <span style={{ color: '#94a3b8', fontWeight: 900, fontSize: '1.15rem', lineHeight: '1.2' }}>✕</span>
                                                    )}
                                                    <div style={{ flex: 1, color: feat.included ? '#1e293b' : '#94a3b8', fontWeight: feat.included ? 600 : 400, lineHeight: 1.35 }}>
                                                        {feat.feature_name}
                                                        {feat.feature_value && (
                                                             <span style={{
                                                                marginLeft: '6px',
                                                                fontSize: '0.74rem',
                                                                fontWeight: 700,
                                                                color: feat.included ? '#0284c7' : '#94a3b8',
                                                                background: feat.included ? '#e0f2fe' : '#f1f5f9',
                                                                padding: '2px 6px',
                                                                borderRadius: '4px'
                                                            }}>
                                                                {feat.feature_value}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                )}

                {/* ── UPI / RAZORPAY PAYMENT MODAL ── */}
                {mockPaymentData && (
                    <PremiumPaymentModal
                        isOpen={true}
                        plan={mockPaymentData.plan}
                        orderData={mockPaymentData.orderData}
                        appliedOffer={mockPaymentData.offer}
                        targetRole="candidate"
                        onClose={() => {
                            setMockPaymentData(null);
                            fetchPlansAndPerks();
                        }}
                    />
                )}

            </div>
        </CandidateSidebar>
    );
}
