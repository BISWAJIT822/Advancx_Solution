// Legal content for Advancx Solution.
// NOTE: These are general starter documents — have a legal professional
// review and tailor them before relying on them in production.

const CONTACT_EMAIL = 'advancxsolution@gmail.com';
const EFFECTIVE = 'August 17, 2026';

export const legalPages = {
  'privacy-policy': {
    eyebrow: 'Legal',
    title: 'Privacy Policy',
    effective: EFFECTIVE,
    intro:
      'This Privacy Policy explains how Advancx Solution collects, uses, and protects the information you share with us when you use our website and services.',
    sections: [
      {
        heading: '1. Introduction',
        body: [
          'Advancx Solution ("we", "us", or "our") is committed to protecting your privacy. This policy describes what data we collect, why we collect it, and the choices you have. By using our website or services, you agree to the practices described here.',
        ],
      },
      {
        heading: '2. Information We Collect',
        body: [
          'We collect information you provide directly to us, and information gathered automatically as you use our website:',
          {
            list: [
              'Contact details you submit through our forms — such as your name, work email, phone number, company, and message.',
              'Technical data such as your browser type, device information, and pages visited, collected through cookies and similar technologies.',
              'Any information you choose to share with us during a demo request, project enquiry, or support conversation.',
            ],
          },
        ],
      },
      {
        heading: '3. How We Use Your Information',
        body: [
          'We use the information we collect to respond to your enquiries, provide and improve our services, communicate with you about your project, and keep our website secure. We do not sell your personal information to third parties.',
        ],
      },
      {
        heading: '4. Cookies and Tracking',
        body: [
          'Our website may use cookies and similar technologies to remember your preferences and understand how the site is used. You can control cookies through your browser settings; disabling them may affect some functionality.',
        ],
      },
      {
        heading: '5. Data Sharing and Disclosure',
        body: [
          'We may share limited information with trusted service providers who help us operate our website and deliver our services (for example, form-handling and email delivery providers). These providers are bound to use your information only as necessary to perform their services. We may also disclose information where required by law.',
        ],
      },
      {
        heading: '6. Data Security',
        body: [
          'We apply appropriate technical and organizational measures to protect your information against unauthorized access, loss, or misuse. No method of transmission over the internet is completely secure, but we work continuously to safeguard your data.',
        ],
      },
      {
        heading: '7. Data Retention',
        body: [
          'We retain your information only for as long as necessary to fulfil the purposes described in this policy, to comply with our legal obligations, resolve disputes, and enforce our agreements.',
        ],
      },
      {
        heading: '8. Your Rights',
        body: [
          'Depending on your location, you may have the right to access, correct, or delete your personal information, or to object to certain processing. To exercise these rights, contact us using the details below.',
        ],
      },
      {
        heading: '9. Changes to This Policy',
        body: [
          'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.',
        ],
      },
      {
        heading: '10. Contact Us',
        body: [
          `If you have any questions about this Privacy Policy or how we handle your data, please contact us at ${CONTACT_EMAIL}.`,
        ],
      },
    ],
  },

  'terms-of-service': {
    eyebrow: 'Legal',
    title: 'Terms of Service',
    effective: EFFECTIVE,
    intro:
      'These Terms of Service govern your use of the Advancx Solution website and the services we provide. Please read them carefully.',
    sections: [
      {
        heading: '1. Acceptance of Terms',
        body: [
          'By accessing or using the Advancx Solution website and services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website or services.',
        ],
      },
      {
        heading: '2. Our Services',
        body: [
          'Advancx Solution provides software design, development, and related digital services. The specific scope, deliverables, and timelines for any engagement are defined in a separate proposal or agreement between you and us.',
        ],
      },
      {
        heading: '3. Use of the Website',
        body: [
          'You agree to use our website lawfully and not to misuse it in any way, including attempting to gain unauthorized access, disrupting its operation, or using it to transmit harmful or unlawful content.',
        ],
      },
      {
        heading: '4. Intellectual Property',
        body: [
          'All content on this website — including text, graphics, logos, and code — is owned by or licensed to Advancx Solution and is protected by applicable intellectual property laws. You may not reproduce or reuse it without our prior written permission.',
        ],
      },
      {
        heading: '5. Submissions and Enquiries',
        body: [
          'Any information you submit through our forms should be accurate and your own to share. You are responsible for the content of your submissions and for ensuring they do not infringe the rights of others.',
        ],
      },
      {
        heading: '6. Payments and Fees',
        body: [
          'Fees for services are agreed in writing before work begins. Unless otherwise stated, invoices are payable within the terms specified in the applicable proposal or agreement.',
        ],
      },
      {
        heading: '7. Warranties and Disclaimers',
        body: [
          'Our website is provided on an "as is" and "as available" basis. While we strive for accuracy and reliability, we make no warranties that the website will be uninterrupted, error-free, or free of harmful components.',
        ],
      },
      {
        heading: '8. Limitation of Liability',
        body: [
          'To the maximum extent permitted by law, Advancx Solution will not be liable for any indirect, incidental, or consequential damages arising from your use of our website or services.',
        ],
      },
      {
        heading: '9. Termination',
        body: [
          'We may suspend or terminate access to our website or services at our discretion, including where we believe these Terms have been violated.',
        ],
      },
      {
        heading: '10. Governing Law',
        body: [
          'These Terms are governed by the laws applicable in the jurisdiction in which Advancx Solution operates, without regard to conflict-of-law principles.',
        ],
      },
      {
        heading: '11. Changes to These Terms',
        body: [
          'We may revise these Terms from time to time. Continued use of our website after changes are posted constitutes acceptance of the updated Terms.',
        ],
      },
      {
        heading: '12. Contact',
        body: [
          `For questions about these Terms of Service, contact us at ${CONTACT_EMAIL}.`,
        ],
      },
    ],
  },

  'sla-agreement': {
    eyebrow: 'Legal',
    title: 'SLA Agreement',
    effective: EFFECTIVE,
    intro:
      'This Service Level Agreement (SLA) describes the availability, support, and performance commitments Advancx Solution provides for its hosted services.',
    sections: [
      {
        heading: '1. Overview',
        body: [
          'This SLA sets out the service levels Advancx Solution commits to for the applications and infrastructure we operate on your behalf. It supplements, and is subject to, the main services agreement between you and us.',
        ],
      },
      {
        heading: '2. Definitions',
        body: [
          {
            list: [
              '"Uptime" means the percentage of time in a calendar month that the service is available and responding normally.',
              '"Downtime" means any period the service is unavailable, excluding scheduled maintenance and excluded events.',
              '"Response Time" means the time between you reporting an issue and us acknowledging it.',
            ],
          },
        ],
      },
      {
        heading: '3. Uptime Commitment',
        body: [
          'We target a monthly uptime of 99.9% for production services. Uptime is measured across the calendar month, excluding scheduled maintenance windows and events outside our reasonable control.',
        ],
      },
      {
        heading: '4. Support and Response Times',
        body: [
          'We prioritize issues by severity and aim to respond within the following targets during business hours:',
          {
            list: [
              'Critical (service down): initial response within 1 hour.',
              'High (major feature impaired): initial response within 4 hours.',
              'Normal (minor issue or question): initial response within 1 business day.',
            ],
          },
        ],
      },
      {
        heading: '5. Scheduled Maintenance',
        body: [
          'We may perform scheduled maintenance to keep services secure and up to date. Where possible, we give advance notice and schedule maintenance during off-peak hours. Scheduled maintenance does not count against uptime.',
        ],
      },
      {
        heading: '6. Exclusions',
        body: [
          'This SLA does not cover downtime caused by factors outside our reasonable control, including third-party service outages, force majeure events, misuse of the service, or issues arising from changes made without our involvement.',
        ],
      },
      {
        heading: '7. Service Credits',
        body: [
          'If we fail to meet the uptime commitment in a given month, you may be eligible for service credits as set out in your services agreement. Service credits are the sole and exclusive remedy for any failure to meet the service levels described here.',
        ],
      },
      {
        heading: '8. Reporting and Escalation',
        body: [
          `To report an incident or request support, contact us at ${CONTACT_EMAIL}. Critical issues should be flagged clearly so we can escalate them appropriately.`,
        ],
      },
      {
        heading: '9. Review',
        body: [
          'We review this SLA periodically and may update it to reflect improvements in our services. Material changes will be communicated in advance.',
        ],
      },
    ],
  },
};

export const getLegalPage = (slug) => legalPages[slug];
