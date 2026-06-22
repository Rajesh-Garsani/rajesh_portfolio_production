export interface PersonalInfo { name: string; title: string; email: string; phone: string; location: string; github: string; linkedin: string; summary: string; available_for_work?: boolean; resume_file?: string; }
export interface SkillCategory { name: string; skills: string[]; icon: string; }
export interface ExperienceItem { role: string; company: string; period: string; type: string; bullets: string[]; }
export type DemoType = "none" | "security" | "scraping";
export interface ProjectItem { id: string; name: string; tech: string[]; description: string; features: string[]; demoType: DemoType; github?: string; live_demo?: string; }
export interface CertificationItem { id: string | number; title: string; issuer: string; year: string; credential_url?: string; }
export interface EducationItem { degree: string; institution: string; location: string; period: string; description?: string; }
export interface PortfolioData { personalInfo: PersonalInfo; skillsData: SkillCategory[]; experienceData: ExperienceItem[]; projectsData: ProjectItem[]; educationData: EducationItem[]; certificationsData: CertificationItem[]; }
