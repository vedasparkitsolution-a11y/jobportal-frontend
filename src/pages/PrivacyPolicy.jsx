import PolicyLayout from '../components/PolicyLayout';

export default function PrivacyPolicy() {
    return (
        <PolicyLayout
            title="Privacy Policy"
            subtitle="Understand how Vedaspark.pro collects, protects, and handles your personal information as a job seeker, employer, or partner."
            lastUpdated="November 14, 2026"
        >
            <div className="policy-content" style={{ fontSize: '0.96rem', color: '#334155' }}>
                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                        1. Introduction & Overview
                    </h2>
                    <p style={{ marginBottom: '12px' }}>
                        Welcome to <strong>Vedaspark.pro</strong> (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), a premier Career, HR Consultancy &amp; Recruitment Placement platform accessible at <code>https://vedaspark.pro</code>. 
                    </p>
                    <p>
                        We respect your privacy and are committed to protecting your personal data in accordance with the Information Technology Act, 2000, the Digital Personal Data Protection Act (DPDP Act, 2023), and other applicable global privacy regulations. This Privacy Policy details our practices concerning data collection, processing, storage, and sharing.
                    </p>
                </section>

                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                        2. Information We Collect
                    </h2>
                    <p style={{ marginBottom: '12px' }}>
                        Depending on your role on our platform, we collect the following categories of information:
                    </p>

                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b', margin: '16px 0 8px' }}>
                        A. For Candidates &amp; Job Seekers:
                    </h3>
                    <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
                        <li><strong>Personal Identity:</strong> Full name, date of birth, gender, profile photograph.</li>
                        <li><strong>Contact Details:</strong> Email address, mobile telephone number, city, state, country.</li>
                        <li><strong>Professional Credentials:</strong> Resumes/CVs, educational history, certifications, employment history, portfolio links (GitHub, LinkedIn), expected salary, notice period, and career preferences.</li>
                        <li><strong>Skill Assessments:</strong> Answers, scores, and evaluation results completed on the Vedaspark career analyzer.</li>
                    </ul>

                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b', margin: '16px 0 8px' }}>
                        B. For Employers &amp; Hiring Companies:
                    </h3>
                    <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
                        <li><strong>Company Profile:</strong> Registered company name, corporate identification (CIN/GSTIN), registered office address, website URL, industry type.</li>
                        <li><strong>Representative Details:</strong> HR manager / recruiter name, corporate email address, contact number.</li>
                        <li><strong>Job Postings:</strong> Job descriptions, responsibilities, salary ranges, location requirements.</li>
                        <li><strong>Billing Data:</strong> GSTIN number, billing address, and transaction references for subscription purchases.</li>
                    </ul>

                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b', margin: '16px 0 8px' }}>
                        C. Automated Technical Data:
                    </h3>
                    <ul style={{ paddingLeft: '24px' }}>
                        <li>Internet Protocol (IP) address, browser version, device identifier, operating system.</li>
                        <li>Session cookies, login timestamps, and referral sources.</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                        3. How We Use Your Information
                    </h2>
                    <p style={{ marginBottom: '12px' }}>
                        We use the information gathered solely for verified legitimate recruitment, placement, and service improvement operations:
                    </p>
                    <ul style={{ paddingLeft: '24px' }}>
                        <li><strong>Job Application Processing:</strong> Transmitting candidate applications to verified employers for relevant job vacancies.</li>
                        <li><strong>Talent Discovery:</strong> Allowing verified recruiters with active subscriptions to review candidate resumes matching their hiring criteria.</li>
                        <li><strong>Account Administration:</strong> Managing authentication, role-based dashboards, and security alerts.</li>
                        <li><strong>Payment &amp; Billing:</strong> Processing premium subscription fees via authorized payment aggregator <strong>Razorpay</strong>.</li>
                        <li><strong>Communications:</strong> Sending transactional alerts, interview schedules, job alerts, and platform announcements.</li>
                        <li><strong>Platform Safety:</strong> Detecting, preventing, and combating fraudulent job postings, spam, and malicious behavior.</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                        4. Information Sharing &amp; Disclosures
                    </h2>
                    <p style={{ marginBottom: '12px' }}>
                        <strong>We do not sell, rent, or trade your personal data to any third-party advertisers.</strong>
                    </p>
                    <p style={{ marginBottom: '12px' }}>
                        We share data strictly in the following authorized contexts:
                    </p>
                    <ul style={{ paddingLeft: '24px' }}>
                        <li><strong>With Prospective Employers:</strong> When a candidate applies for a position or marks their profile as actively open to recruiter outreach.</li>
                        <li><strong>With Payment Processors (Razorpay):</strong> Essential billing metadata (User ID, Plan ID, Amount, Email, Phone) is transmitted securely to Razorpay Software Private Limited to verify and complete transactions. We do NOT store credit card numbers or CVVs on our servers.</li>
                        <li><strong>Legal &amp; Regulatory Authorities:</strong> Where required by valid subpoenas, court orders, or applicable statutory laws in India.</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                        5. Data Security &amp; Retention
                    </h2>
                    <p style={{ marginBottom: '12px' }}>
                        We enforce robust physical, organizational, and technological safeguards to defend your data:
                    </p>
                    <ul style={{ paddingLeft: '24px' }}>
                        <li><strong>256-Bit SSL/TLS Encryption:</strong> All data in transit between your browser and our servers is encrypted using modern cryptographic protocols.</li>
                        <li><strong>Password Hashing:</strong> Credentials are encrypted using industry-standard salt algorithms (Bcrypt).</li>
                        <li><strong>Access Controls:</strong> Strict role-based permissions limit database access strictly to authorized personnel.</li>
                    </ul>
                    <p style={{ marginTop: '12px' }}>
                        We retain your data for as long as your account remains active or as required by law for taxation and accounting records.
                    </p>
                </section>

                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                        6. Your Rights &amp; Choices
                    </h2>
                    <p style={{ marginBottom: '12px' }}>You retain the following rights regarding your personal information:</p>
                    <ul style={{ paddingLeft: '24px' }}>
                        <li><strong>Access &amp; Edit:</strong> Update your profile, resume, or contact details anytime from your dashboard.</li>
                        <li><strong>Visibility Controls:</strong> Choose whether your resume is visible in general recruiter searches.</li>
                        <li><strong>Account Deletion:</strong> Request full permanent deletion of your profile and data by emailing <code>privacy@vedaspark.pro</code>.</li>
                    </ul>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                        7. Grievance Officer &amp; Contact Us
                    </h2>
                    <p style={{ marginBottom: '12px' }}>
                        In accordance with the Information Technology Act 2000 and rules made thereunder, if you have any questions or complaints regarding this Privacy Policy, please contact our Grievance Officer:
                    </p>
                    <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                        <strong>Grievance &amp; Compliance Officer</strong><br />
                        Vedaspark.pro (Vedaspark IT &amp; HR Solutions)<br />
                        Email: <a href="mailto:privacy@vedaspark.pro" style={{ color: '#4338ca', fontWeight: 600 }}>privacy@vedaspark.pro</a> / <a href="mailto:support@vedaspark.pro" style={{ color: '#4338ca', fontWeight: 600 }}>support@vedaspark.pro</a><br />
                        Website: <code>https://vedaspark.pro</code><br />
                        Operating Jurisdiction: Tamil Nadu, India.
                    </div>
                </section>
            </div>
        </PolicyLayout>
    );
}
