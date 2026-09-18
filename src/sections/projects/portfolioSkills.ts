import type { PortfolioSkill } from './portfolioConstellation';

const networkNodes: PortfolioSkill[] = [
    { id: 'ai', label: 'AI' },
    { id: 'crm', label: 'CRM' },
    { id: 'erp', label: 'ERP' },
    { id: 'hrms', label: 'HRMS' },
    { id: 'ecommerce', label: 'E-COMMERCE' },
    { id: 'web3', label: 'WEB3' },
    { id: 'blockchain', label: 'BLOCKCHAIN' },
    { id: 'automation', label: 'AUTOMATION' },
    { id: 'analytics', label: 'ANALYTICS' },
    { id: 'cybersecurity', label: 'CYBERSECURITY' },
    { id: 'cloud', label: 'CLOUD' },
    { id: 'devops', label: 'DEVOPS' },
    { id: 'marketing', label: 'MARKETING' },
    { id: 'algo-systems', label: 'ALGO SYSTEMS' },
];

const technicalDisciplines: PortfolioSkill[] = [
    { id: 'typescript', label: 'TypeScript' },
    { id: 'react', label: 'React' },
    { id: 'nextjs', label: 'Next.js' },
    { id: 'threejs', label: 'Three.js' },
    { id: 'nodejs', label: 'Node.js' },
    { id: 'python', label: 'Python' },
    { id: 'fastapi', label: 'FastAPI' },
    { id: 'solidity', label: 'Solidity' },
    { id: 'postgresql', label: 'PostgreSQL' },
    { id: 'redis', label: 'Redis' },
    { id: 'docker', label: 'Docker' },
    { id: 'kubernetes', label: 'Kubernetes' },
    { id: 'cloudflare', label: 'Cloudflare' },
    { id: 'graphql', label: 'GraphQL' },
    { id: 'rest-api', label: 'REST APIs' },
    { id: 'microservices', label: 'Microservices' },
];

export const portfolioSkills: PortfolioSkill[] = [...networkNodes, ...technicalDisciplines];
