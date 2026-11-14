import PolicyLayout from '../components/PolicyLayout';
import { FiRefreshCw, FiClock, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

export default function ReturnRefundPolicy() {
    return (
        <PolicyLayout
            title="Return & Refund Policy"
            subtitle="Details regarding subscription cancellations, refund eligibility, processing timelines, and customer support."
            lastUpdated="November 14, 2026"
        >
            <div className="policy-content" style={{ fontSize: '0.96rem', color: '#334155' }}>
                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                        1. Introduction &amp; Nature of Services
                    </h2>
                    <p style={{ marginBottom: '12px' }}>
                        At <strong>Vedaspark.pro</strong>, we deliver digital software-as-a-service (SaaS) and recruitment solutions, including instant job postings, resume database access, AI career analyzer tools, verified employer badges, and priority placement services.
                    </p>
                    <p>
                        Because our subscription plans provide immediate digital access upon payment completion, we have established clear guidelines regarding cancellations and refund requests to maintain fairness and operational transparency.
                    </p>
                </section>

                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                        2. Subscription Cancellation Policy
                    </h2>
                    <ul style={{ paddingLeft: '24px' }}>
                        <li><strong>Cancel Anytime:</strong> Users may cancel their recurring subscription at any time prior to the next billing cycle directly through their Account Settings or by emailing <code>support@vedaspark.pro</code>.</li>
                        <li><strong>Continued Access:</strong> If you cancel your subscription, your account will remain active with full premium privileges until the end of the current paid billing period. No future charges will be levied.</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                        3. Refund Eligibility &amp; Criteria
                    </h2>
                    <p style={{ marginBottom: '14px' }}>
                        We evaluate refund requests under the following conditions:
                    </p>

                    <div style={{
                        background: '#f0fdf4',
                        border: '1px solid #bbf7d0',
                        borderRadius: '10px',
                        padding: '18px 20px',
                        marginBottom: '16px'
                    }}>
                        <h4 style={{ color: '#15803d', margin: '0 0 8px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FiCheckCircle size={18} /> Eligible for 100% Full Refund:
                        </h4>
                        <ul style={{ paddingLeft: '20px', margin: 0, color: '#166534', fontSize: '0.9rem' }}>
                            <li><strong>Duplicate Charges:</strong> If multiple deductions occurred for the same order due to a network or technical glitch.</li>
                            <li><strong>Technical Non-Delivery:</strong> If a payment succeeded via Razorpay but platform benefits/credits were not activated within 24 hours and our technical engineering team is unable to resolve the issue.</li>
                            <li><strong>Fraudulent / Unauthorized Transactions:</strong> Validated fraudulent payments reported within 48 hours of occurrence.</li>
                        </ul>
                    </div>

                    <div style={{
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        borderRadius: '10px',
                        padding: '18px 20px'
                    }}>
                        <h4 style={{ color: '#b91c1c', margin: '0 0 8px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FiAlertTriangle size={18} /> Non-Refundable Scenarios:
                        </h4>
                        <ul style={{ paddingLeft: '20px', margin: 0, color: '#991b1b', fontSize: '0.9rem' }}>
                            <li>Change of mind after digital credits (job postings, candidate unlocks, or assessment evaluations) have been utilized or partially consumed.</li>
                            <li>Lack of candidate applications or hiring success, as recruitment outcomes depend on employer job descriptions, market conditions, and candidate discretion.</li>
                            <li>Account suspension or termination arising from violations of our Terms of Use (such as fraudulent job postings, recruitment fee demands, or spam).</li>
                            <li>Refund claims submitted after the mandatory 72-hour request window.</li>
                        </ul>
                    </div>
                </section>

                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                        4. Refund Request Window &amp; How to Apply
                    </h2>
                    <p style={{ marginBottom: '12px' }}>
                        To be considered, eligible refund claims must be initiated within <strong>72 hours (3 business days)</strong> of the transaction timestamp.
                    </p>
                    <p style={{ marginBottom: '12px' }}>
                        To submit a refund request, please send an email to <a href="mailto:billing@vedaspark.pro" style={{ color: '#4338ca', fontWeight: 600 }}>billing@vedaspark.pro</a> with the subject line <code>&ldquo;Refund Request - [Your Razorpay Payment ID]&rdquo;</code> and include:
                    </p>
                    <ol style={{ paddingLeft: '24px' }}>
                        <li>Your Full Name and Registered Email Address / Mobile Number.</li>
                        <li>Razorpay Transaction / Payment ID (e.g., <code>pay_XXXXXXXXXXXXXX</code>).</li>
                        <li>Date, Time, and Exact Amount Debited (in INR).</li>
                        <li>Clear explanation of the error or reason for the refund request, with screenshots if applicable.</li>
                    </ol>
                </section>

                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                        5. Refund Processing Timeline &amp; Mode
                    </h2>
                    <div style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '20px 24px',
                        marginBottom: '16px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                            <FiClock size={20} style={{ color: '#4f46e5' }} />
                            <strong style={{ fontSize: '1.05rem', color: '#0f172a' }}>
                                Standard Turnaround Time: 5 to 7 Business Days
                            </strong>
                        </div>
                        <p style={{ margin: '0 0 10px', fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
                            Once your refund request is verified and approved by our finance audit team (within 24 to 48 hours), the refund will be automatically triggered via Razorpay back to your original source payment method.
                        </p>
                        <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.88rem', color: '#475569' }}>
                            <li><strong>UPI &amp; Wallets:</strong> Usually credited back within 24 to 48 hours.</li>
                            <li><strong>Net Banking &amp; Debit/Credit Cards:</strong> Typically reflects in your bank statement within <strong>5 to 7 business days</strong>, depending on your card issuer or banking network.</li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                        6. Contact &amp; Escalations
                    </h2>
                    <p style={{ marginBottom: '12px' }}>
                        If you have any pending queries regarding refunds, cancellations, or payment verification:
                    </p>
                    <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                        <strong>Billing &amp; Refund Support Team</strong><br />
                        Vedaspark.pro (Vedaspark IT &amp; HR Solutions)<br />
                        Email: <a href="mailto:billing@vedaspark.pro" style={{ color: '#4338ca', fontWeight: 600 }}>billing@vedaspark.pro</a> / <a href="mailto:support@vedaspark.pro" style={{ color: '#4338ca', fontWeight: 600 }}>support@vedaspark.pro</a><br />
                        Operating Hours: Monday – Saturday, 9:30 AM to 6:30 PM IST<br />
                        Website: <code>https://vedaspark.pro</code>
                    </div>
                </section>
            </div>
        </PolicyLayout>
    );
}
