import { validateApiKey } from './apiKeyService';
import { 
  getAllProjects, 
  addProject, 
  updateProject, 
  deleteProject,
  type Project 
} from './projectService';
import { 
  getAllSkills, 
  addSkill, 
  updateSkill, 
  deleteSkill,
  type SkillGroup 
} from './skillService';
import { 
  getAllEducation, 
  addEducation, 
  updateEducation, 
  deleteEducation,
  type Education 
} from './educationService';

export class PortfolioAPI {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async validateAccess(): Promise<boolean> {
    const validKey = await validateApiKey(this.apiKey);
    if (!validKey) {
      throw new Error('Invalid or inactive API key');
    }
    return true;
  }

  // Projects API
  async getProjects(): Promise<Project[]> {
    await this.validateAccess();
    return await getAllProjects();
  }

  async addProject(project: Omit<Project, 'id'>): Promise<void> {
    await this.validateAccess();
    await addProject(project);
  }

  async updateProject(id: string, project: Partial<Project>): Promise<void> {
    await this.validateAccess();
    await updateProject(id, project);
  }

  async deleteProject(id: string): Promise<void> {
    await this.validateAccess();
    await deleteProject(id);
  }

  // Skills API
  async getSkills(): Promise<SkillGroup[]> {
    await this.validateAccess();
    return await getAllSkills();
  }

  async addSkill(skill: Omit<SkillGroup, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    await this.validateAccess();
    await addSkill(skill);
  }

  async updateSkill(id: string, skill: Partial<SkillGroup>): Promise<void> {
    await this.validateAccess();
    await updateSkill(id, skill);
  }

  async deleteSkill(id: string): Promise<void> {
    await this.validateAccess();
    await deleteSkill(id);
  }

  // Education API
  async getEducation(): Promise<Education[]> {
    await this.validateAccess();
    return await getAllEducation();
  }

  async addEducation(education: Omit<Education, 'id'>): Promise<void> {
    await this.validateAccess();
    await addEducation(education);
  }

  async updateEducation(id: string, education: Partial<Education>): Promise<void> {
    await this.validateAccess();
    await updateEducation(id, education);
  }

  async deleteEducation(id: string): Promise<void> {
    await this.validateAccess();
    await deleteEducation(id);
  }
}

// Factory function to create API instance
export function createPortfolioAPI(apiKey: string): PortfolioAPI {
  return new PortfolioAPI(apiKey);
}

// Example usage for external apps:
/*
import { createPortfolioAPI } from '@sushanta/portfolio-api';

const api = createPortfolioAPI('sk_your_api_key_here');

// Get all projects
const projects = await api.getProjects();

// Add a new project
await api.addProject({
  title: 'New Project',
  description: 'Project description',
  // ... other fields
});

// Update a project
await api.updateProject('project-id', {
  title: 'Updated Title',
});

// Delete a project
await api.deleteProject('project-id');
*/
