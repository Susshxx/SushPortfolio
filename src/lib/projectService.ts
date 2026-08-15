import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  Timestamp
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';

export type Project = {
  id?: string;
  eyebrow?: string;
  title: string;
  description: string;
  tech: string[];
  link?: { label: string; href: string; icon: 'external' | 'github' };
  note?: string;
  liveUrl?: string;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const PROJECTS_COLLECTION = 'projects';
const LOCALSTORAGE_KEY = 'portfolio_projects';

// Helper function to use localStorage as fallback
const useLocalStorage = !isFirebaseConfigured;

// Get all projects
export async function getAllProjects(): Promise<Project[]> {
  if (useLocalStorage) {
    const stored = localStorage.getItem(LOCALSTORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  try {
    const querySnapshot = await getDocs(collection(db, PROJECTS_COLLECTION));
    const projects: Project[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      projects.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      } as Project);
    });

    // Sort by createdAt if available, otherwise by id
    projects.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
      return 0;
    });

    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
}

// Add a new project
export async function addProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  if (useLocalStorage) {
    const projects = await getAllProjects();
    const newProject = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    projects.push(newProject);
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(projects));
    return newProject.id;
  }

  try {
    const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), {
      ...project,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding project:', error);
    throw error;
  }
}

// Update an existing project
export async function updateProject(id: string, project: Partial<Project>): Promise<void> {
  if (useLocalStorage) {
    const projects = await getAllProjects();
    const index = projects.findIndex((p) => p.id === id);
    if (index !== -1) {
      projects[index] = {
        ...projects[index],
        ...project,
        updatedAt: new Date(),
      };
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(projects));
    }
    return;
  }

  try {
    const projectRef = doc(db, PROJECTS_COLLECTION, id);
    await updateDoc(projectRef, {
      ...project,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
}

// Delete a project
export async function deleteProject(id: string): Promise<void> {
  if (useLocalStorage) {
    const projects = await getAllProjects();
    const filtered = projects.filter((p) => p.id !== id);
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(filtered));
    return;
  }

  try {
    await deleteDoc(doc(db, PROJECTS_COLLECTION, id));
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
}
