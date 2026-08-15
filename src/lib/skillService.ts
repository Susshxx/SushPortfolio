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

export type SkillGroup = {
  id?: string;
  title: string;
  items: string[];
  color: string;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

const SKILLS_COLLECTION = 'skills';
const LOCALSTORAGE_KEY = 'portfolio_skills';

const useLocalStorage = !isFirebaseConfigured;

export async function getAllSkills(): Promise<SkillGroup[]> {
  if (useLocalStorage) {
    const stored = localStorage.getItem(LOCALSTORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  try {
    const querySnapshot = await getDocs(collection(db, SKILLS_COLLECTION));
    const skills: SkillGroup[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      skills.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      } as SkillGroup);
    });

    // Sort by order if available
    skills.sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      return 0;
    });

    return skills;
  } catch (error) {
    console.error('Error fetching skills:', error);
    throw error;
  }
}

export async function addSkill(skill: Omit<SkillGroup, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  if (useLocalStorage) {
    const skills = await getAllSkills();
    const newSkill = {
      ...skill,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    skills.push(newSkill);
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(skills));
    return newSkill.id;
  }

  try {
    const docRef = await addDoc(collection(db, SKILLS_COLLECTION), {
      ...skill,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding skill:', error);
    throw error;
  }
}

export async function updateSkill(id: string, skill: Partial<SkillGroup>): Promise<void> {
  if (useLocalStorage) {
    const skills = await getAllSkills();
    const index = skills.findIndex((s) => s.id === id);
    if (index !== -1) {
      skills[index] = {
        ...skills[index],
        ...skill,
        updatedAt: new Date(),
      };
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(skills));
    }
    return;
  }

  try {
    const skillRef = doc(db, SKILLS_COLLECTION, id);
    await updateDoc(skillRef, {
      ...skill,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating skill:', error);
    throw error;
  }
}

export async function deleteSkill(id: string): Promise<void> {
  if (useLocalStorage) {
    const skills = await getAllSkills();
    const filtered = skills.filter((s) => s.id !== id);
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(filtered));
    return;
  }

  try {
    await deleteDoc(doc(db, SKILLS_COLLECTION, id));
  } catch (error) {
    console.error('Error deleting skill:', error);
    throw error;
  }
}
