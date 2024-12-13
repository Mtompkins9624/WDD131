// services.js
export const serviceDetails = {
    'network-security': {
        title: 'Network Security',
        description: 'Comprehensive network protection solutions. Our robust security infrastructure safeguards your digital assets against unauthorized access, data breaches, and network-based attacks.',
        features: [
            'Firewall Management',
            'Intrusion Detection',
            'VPN Solutions',
            'Network Monitoring'
        ]
    },
    'endpoint-protection': {
        title: 'Endpoint Protection',
        description: 'Complete device security management that ensures every endpoint in your network is protected against emerging threats and vulnerabilities.',
        features: [
            'Device Management',
            'Antivirus Protection',
            'Access Control',
            'Data Encryption'
        ]
    },
    'security-consulting': {
        title: 'Security Consulting',
        description: 'Expert security guidance and planning to help your organization build and maintain a strong security posture in today\'s evolving threat landscape.',
        features: [
            'Security Assessment',
            'Compliance Consulting',
            'Security Training',
            'Incident Response'
        ]
    }
};

export function getServiceDetails(id) {
    return serviceDetails[id] || null;
}