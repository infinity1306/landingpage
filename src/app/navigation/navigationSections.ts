import { sectionIds, type SectionId } from '../../sections/sectionIds';

export type SectionLanding =
    | {
          type: 'position';
          positions: {
              default: string;
              mobile?: string;
          };
      }
    | {
          type: 'page-end';
      };

export const sectionLandings: Record<SectionId, SectionLanding> = {
    intro: {
        type: 'position',
        positions: {
            default: 'top top',
        },
    },
    experience: {
        type: 'position',
        positions: {
            default: '24% top',
            mobile: '24%+=120 top',
        },
    },
    projects: {
        type: 'position',
        positions: {
            default: '60% top',
            mobile: '60% top',
        },
    },
    contact: {
        type: 'page-end',
    },
};

export const parseSectionId = (target: string): SectionId | undefined => {
    const normalizedTarget = target.replace(/^#/, '');

    return sectionIds.find((sectionId) => sectionId === normalizedTarget);
};

export const isPageEndNavigationTarget = (target: string): boolean => {
    const sectionId = parseSectionId(target);

    return sectionId !== undefined && sectionLandings[sectionId].type === 'page-end';
};
