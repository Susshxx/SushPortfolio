import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';

export type Education = {
  id?: string;
  degree: string;
  school: string;
  period: string;
  description: string;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

const EDUCATION_COLLECTION = 'education';
const LOCALSTORAGE_KEY = 'portfolio_education';

const useLocalStorage = !isFirebaseConfigured;

export async function getAllEducation(): Promise<Education[]> {
  if (useLocalStorage) {
    const stored = localStorage.getItem(LOCALSTORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  try {
    const q = query(collection(db, EDUCATION_COLLECTION), orderBy('order', 'desc'));
    const querySnapshot = await getDocs(q);
    const education: Education[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      education.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      } as Education);
    });

    return education;
  } catch (error) {
    console.error('Error fetching education:', error);
    throw error;
  }
}

export async function addEducation(education: Omit<Education, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  if (useLocalStorage) {
    const educationList = await getAllEducation();
    const newEducation = {
      ...education,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    educationList.push(newEducation);
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(educationList));
    return newEducation.id;
  }

  try {
    const docRef = await addDoc(collection(db, EDUCATION_COLLECTION), {
      ...education,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding education:', error);
    throw error;
  }
}

export async function updateEducation(id: string, education: Partial<Education>): Promise<void> {
  if (useLocalStorage) {
    const educationList = await getAllEducation();
    const index = educationList.findIndex((e) => e.id === id);
    if (index !== -1) {
      educationList[index] = {
        ...educationList[index],
        ...education,
        updatedAt: new Date(),
      };
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(educationList));
    }
    return;
  }

  try {
    const educationRef = doc(db, EDUCATION_COLLECTION, id);
    await updateDoc(educationRef, {
      ...education,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating education:', error);
    throw error;
  }
}

export async function deleteEducation(id: string): Promise<void> {
  if (useLocalStorage) {
    const educationList = await getAllEducation();
    const filtered = educationList.filter((e) => e.id !== id);
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(filtered));
    return;
  }

  try {
    await deleteDoc(doc(db, EDUCATION_COLLECTION, id));
  } catch (error) {
    console.error('Error deleting education:', error);
    throw error;
  }
}
