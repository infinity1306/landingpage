import { type PortfolioProject } from './portfolioConstellation';
import { preloadImage } from '../../utils/assetLoaders';
import { portfolioSkills } from './portfolioSkills';
import {
    PROJECT_DETAILS_IMAGE_SIZES,
    PROJECT_PREVIEW_IMAGE_SIZES,
    projectImagesById,
} from './projectImageAssets';

const withProjectScreenshots = (projects: PortfolioProject[]): PortfolioProject[] =>
    projects.map((project) => ({
        ...project,
        screenshot: projectImagesById[project.id]?.preview,
        detailsScreenshot: projectImagesById[project.id]?.details,
        skills: project.skills.map(
            (skill) =>
                portfolioSkills[portfolioSkills.findIndex((s) => s.id === skill)]?.label ?? skill,
        ),
    }));

const getAdjacentProjects = (
    project: PortfolioProject,
    projects: PortfolioProject[],
): PortfolioProject[] => {
    const index = projects.findIndex((candidate) => candidate.id === project.id);
    if (index < 0 || projects.length < 2) {
        return [];
    }

    return [
        projects[(index - 1 + projects.length) % projects.length],
        projects[(index + 1) % projects.length],
    ];
};

export const preloadAdjacentProjectScreenshots = (project: PortfolioProject): void => {
    const constellationProjects = portfolioProjects.filter(
        (candidate) => candidate.constellation.id === project.constellation.id,
    );
    const adjacentProjects = new Set([
        ...getAdjacentProjects(project, portfolioProjects),
        ...getAdjacentProjects(project, constellationProjects),
    ]);

    adjacentProjects.forEach((candidate) => {
        if (candidate.screenshot) {
            preloadImage(candidate.screenshot, PROJECT_PREVIEW_IMAGE_SIZES);
        }
    });
};

export const preloadAdjacentProjectDetails = async (project: PortfolioProject): Promise<void> => {
    const adjacentScreenshots = getAdjacentProjects(project, portfolioProjects).flatMap(
        (candidate) => (candidate.detailsScreenshot ? [candidate.detailsScreenshot] : []),
    );

    await Promise.allSettled(
        adjacentScreenshots.map((source) => preloadImage(source, PROJECT_DETAILS_IMAGE_SIZES)),
    );
};

const digitalProductsProjects: PortfolioProject[] = [
    {
        id: 'civicpulse-grid',
        title: 'CivicPulse — Municipal Intelligence & Triage Grid',
        label: 'Civic Intelligence',
        description:
            'Intelligent public grievance triage and verification platform featuring geo-tagged mobile submissions, computer vision authenticity checks, and automated SLA dispatching.',
        period: 'Production Deployment',
        role: 'Enterprise Solutions Architecture',
        skills: [
            'ai',
            'analytics',
            'automation',
            'cloud',
            'cybersecurity',
            'postgresql',
            'react',
            'typescript',
            'docker',
        ],
        domain: 'Civic Technology / Public Administration',
        owner: 'Star Chain Labs (Aniket & Harshit Pandey)',
        constellation: {
            id: 'front-end',
            position: [-1.02, 0.82, -0.18],
            links: ['ecommerce-cloud'],
        },
    },
    {
        id: 'ecommerce-cloud',
        title: 'High-Concurrency Commerce Engine',
        label: 'Omnichannel Commerce',
        description:
            'Sub-second headless storefront infrastructure capable of sustaining flash-sale peaks, dynamic international pricing, real-time inventory locking, and instant payments.',
        period: 'Commerce Architecture',
        role: 'Full-Stack Performance Engineering',
        skills: [
            'ecommerce',
            'cloud',
            'devops',
            'react',
            'nextjs',
            'redis',
            'graphql',
            'typescript',
        ],
        domain: 'Enterprise E-Commerce / High Concurrency',
        owner: 'Star Chain Labs',
        constellation: {
            id: 'front-end',
            position: [-0.42, -0.16, 0.02],
            links: ['civicpulse-grid'],
        },
    },
];

const businessSystemsProjects: PortfolioProject[] = [
    {
        id: 'auraflow-enterprise',
        title: 'AuraFlow Enterprise ERP & CRM',
        label: 'Enterprise Core',
        description:
            'Deterministic multi-tenant operational suite uniting customer deal pipeline, multi-hub warehouse inventory reservations, and automated payroll with zero reconciliation drift.',
        period: 'Enterprise Suite',
        role: 'Core Systems Engineering',
        skills: [
            'crm',
            'erp',
            'hrms',
            'automation',
            'analytics',
            'postgresql',
            'redis',
            'react',
            'nodejs',
        ],
        domain: 'Enterprise Operations / Supply Chain',
        owner: 'Star Chain Labs',
        constellation: {
            id: 'full-stack',
            position: [0.35, 0.65, -0.1],
            links: ['krypton-network-engine'],
        },
    },
    {
        id: 'krypton-network-engine',
        title: 'Krypton Network Distribution Core',
        label: 'Network MLM',
        description:
            'High-speed multi-tier marketing calculation engine recursively computing binary pairs, matrix levels, sponsor overrides, and multi-tier digital ledgers.',
        period: 'Production Engine',
        role: 'Distributed Systems & Fintech',
        skills: [
            'marketing',
            'automation',
            'analytics',
            'nodejs',
            'postgresql',
            'redis',
            'microservices',
        ],
        domain: 'Network Distribution / Multi-Tier Ledgers',
        owner: 'Star Chain Labs',
        constellation: {
            id: 'full-stack',
            position: [0.92, -0.32, 0.15],
            links: ['auraflow-enterprise'],
        },
    },
];

const intelligentTechProjects: PortfolioProject[] = [
    {
        id: 'ai-workflow-engine',
        title: 'Autonomous Multi-Agent AI Pipeline',
        label: 'AI Automation',
        description:
            'Event-driven generative agents executing complex document extraction, triage categorization, semantic search, and structured operational handoffs.',
        period: 'Applied AI Core',
        role: 'Intelligence Engineering',
        skills: ['ai', 'automation', 'analytics', 'python', 'fastapi', 'microservices', 'docker'],
        domain: 'Enterprise Automation / Generative AI',
        owner: 'Star Chain Labs',
        constellation: {
            id: 'back-end',
            position: [-0.65, 0.25, 0.2],
            links: ['nexis-web3-bridge'],
        },
    },
    {
        id: 'nexis-web3-bridge',
        title: 'Nexis Web3 Protocol & Ledger',
        label: 'Web3 Ledger',
        description:
            'Audited EVM smart contract staking vault and cross-chain asset management protocol with gas-optimized execution and real-time on-chain telemetry.',
        period: 'Protocol Engineering',
        role: 'Blockchain Architecture',
        skills: ['web3', 'blockchain', 'cybersecurity', 'solidity', 'threejs', 'typescript'],
        domain: 'Decentralized Finance / Smart Contracts',
        owner: 'Star Chain Labs',
        constellation: {
            id: 'back-end',
            position: [-0.08, -0.75, -0.15],
            links: ['ai-workflow-engine'],
        },
    },
];

const constellationScrollOrder = {
    'front-end': 0,
    'full-stack': 1,
    'back-end': 2,
} satisfies Record<PortfolioProject['constellation']['id'], number>;

const compareProjectScrollOrder = (a: PortfolioProject, b: PortfolioProject): number =>
    constellationScrollOrder[a.constellation.id] - constellationScrollOrder[b.constellation.id] ||
    a.constellation.position[0] - b.constellation.position[0] ||
    b.constellation.position[1] - a.constellation.position[1];

const portfolioProjectsWithoutScreenshots: PortfolioProject[] = [
    ...digitalProductsProjects,
    ...businessSystemsProjects,
    ...intelligentTechProjects,
].sort(compareProjectScrollOrder);

export const portfolioProjects: PortfolioProject[] = withProjectScreenshots(
    portfolioProjectsWithoutScreenshots,
);
