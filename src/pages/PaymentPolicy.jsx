import PolicyLayout from '../components/PolicyLayout';
import { FiCheckCircle, FiShield, FiCreditCard, FiLock, FiAlertCircle } from 'react-icons/fi';

export default function PaymentPolicy() {
    return (
        <PolicyLayout
            title="Payment Policy"
            subtitle="Clear, transparent terms regarding payment methods, billing cycles, security, and transaction processing on Vedaspark.pro."
            lastUpdated="November 14, 2026"
        >
            <div className="policy-content" style={{ fontSize: '0.96rem', color: '#334155' }}>
                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                        1. Overview &amp; Authorized Gateway
                    </h2>
                    <p style={{ marginBottom: '12px' }}>
                        At <strong>Vedaspark.pro</strong>, we are committed to providing a seamless, highly secure, and transparent digital payment experience. All financial transactions on our Platform are processed via our authorized payment partner:
                    </p>
                    <div style={{
                        background: '#f0fdf4',
                        border: '1px solid #bbf7d0',
                        borderRadius: '12px',
                        padding: '18px 22px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '14px',
                        marginBottom: '16px'
                    }}>
                        <FiShield size={24} style={{ color: '#16a34a', flexShrink: 0, marginTop: '2px' }} />
                        <div>
                            <strong style={{ color: '#15803d', fontSize: '1.02rem' }}>
                                Razorpay Software Private Limited (Razorpay)
                            </strong>
                            <p style={{ margin: '4px 0 0', color: '#166534', fontSize: '0.9rem', lineHeight: 1.5 }}>
                                Razorpay is a Reserve Bank of India (RBI) authorized Payment Aggregator and is certified under the <strong>Payment Card Industry Data Security Standard (PCI-DSS Level 1)</strong>.
                            </p>
                        </div>
                    </div>
                </section>

                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                        2. Accepted Payment Instruments
                    </h2>
                    <p style={{ marginBottom: '12px' }}>
                        We support a wide variety of secure electronic payment channels for your convenience:
                    </p>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '14px',
                        marginBottom: '16px'
                    }}>
                        <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                            <strong style={{ color: '#0f172a' }}>⚡ Instant UPI</strong>
                            <p style={{ margin: '4px 0 0', fontSize: '0.86rem', color: '#64748b' }}>
                                Google Pay, PhonePe, Paytm, BHIM, CRED, Amazon Pay, and all major UPI handles.
                            </p>
                        </div>
                        <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                            <strong style={{ color: '#0f172a' }}>💳 Credit &amp; Debit Cards</strong>
                            <p style={{ margin: '4px 0 0', fontSize: '0.86rem', color: '#64748b' }}>
                                Visa, MasterCard, RuPay, Maestro, and American Express with 3D Secure OTP verification.
                            </p>
                        </div>
                        <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                            <strong style={{ color: '#0f172a' }}>🏦 Net Banking</strong>
                            <p style={{ margin: '4px 0 0', fontSize: '0.86rem', color: '#64748b' }}>
                                Direct Internet Banking from over 50+ leading Indian banks (HDFC, ICICI, SBI, Axis, etc.).
                            </p>
                        </div>
                        <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                            <strong style={{ color: '#0f172a' }}>💼 Corporate &amp; Wallets</strong>
                            <p style={{ margin: '4px 0 0', fontSize: '0.86rem', color: '#64748b' }}>
                                Mobikwik, Freecharge, PayZapp, and Corporate Expense Cards.
                            </p>
                        </div>
                    </div>
                </section>

                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                        3. Pricing Currency &amp; Taxation
                    </h2>
                    <ul style={{ paddingLeft: '24px' }}>
                        <li><strong>Currency:</strong> All fees for Candidate Subscriptions and Employer Hiring Plans are quoted and charged exclusively in <strong>Indian Rupees (INR - ₹)</strong>.</li>
                        <li><strong>Taxes:</strong> Prices displayed on our Pricing page may be subject to applicable Goods and Services Tax (GST) as mandated by the Government of India. The final payable amount with breakdown is explicitly displayed prior to payment initiation.</li>
                        <li><strong>No Hidden Surcharges:</strong> Vedaspark.pro does not levy any undisclosed transaction fees or platform convenience charges.</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                        4. Instant Plan Activation &amp; Invoices
                    </h2>
                    <ul style={{ paddingLeft: '24px' }}>
                        <li><strong>Real-Time Activation:</strong> Upon successful completion of the Razorpay transaction, your subscription plan is activated automatically and instantly in our database.</li>
                        <li><strong>Tax Invoices:</strong> A digital tax invoice and payment confirmation will be generated and made available in your account dashboard under <em>Payment History</em>. A confirmation receipt will also be sent to your registered email address.</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                        5. Payment Security &amp; Data Privacy
                    </h2>
                    <p style={{ marginBottom: '12px' }}>
                        We prioritize financial data security above all else:
                    </p>
                    <ul style={{ paddingLeft: '24px' }}>
                        <li><strong>Zero Card Storage:</strong> Vedaspark.pro never captures, stores, or logs your CVV, PIN, UPI MPIN, or full 16-digit card numbers on our servers.</li>
                        <li><strong>Encrypted Tunneling:</strong> All payment communication happens through secure, end-to-end 256-bit SSL encrypted tunnels directly between your browser and Razorpay servers.</li>
                        <li><strong>Two-Factor Authentication:</strong> Card transactions strictly require OTP or 3D Secure verification issued by your issuing bank.</li>
                    </ul>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                        6. Handling Failed or Debited Transactions
                    </h2>
                    <p style={{ marginBottom: '12px' }}>
                        Occasionally, due to network dropouts or banking server lag, money might be debited from your bank account without your plan status being updated immediately:
                    </p>
                    <div style={{
                        background: '#eff6ff',
                        border: '1px solid #bfdbfe',
                        borderRadius: '10px',
                        padding: '16px 20px',
                        marginBottom: '16px'
                    }}>
                        <strong style={{ color: '#1e40af' }}>Auto-Reversal Guideline:</strong>
                        <p style={{ margin: '6px 0 0', color: '#1e3a8a', fontSize: '0.9rem', lineHeight: 1.5 }}>
                            In 95% of cases, failed or interrupted payments are automatically reconciled by Razorpay and your bank, and the amount is reversed back to your source account within <strong>24 to 48 hours</strong>.
                        </p>
                    </div>
                    <p>
                        If your plan is not activated and the amount has not been refunded after 48 hours, please write to our dedicated billing team at <a href="mailto:billing@vedaspark.pro" style={{ color: '#4338ca', fontWeight: 600 }}>billing@vedaspark.pro</a> along with:
                    </p>
                    <ul style={{ paddingLeft: '24px' }}>
                        <li>Registered Email ID and Phone Number</li>
                        <li>Razorpay Payment ID (begins with <code>pay_...</code>)</li>
                        <li>Date &amp; Exact Amount Debited</li>
                    </ul>
                </section>
            </div>
        </PolicyLayout>
    );
}
