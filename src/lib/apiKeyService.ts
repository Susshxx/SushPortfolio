import { collection, addDoc, getDocs, doc, deleteDoc, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface ApiKey {
  id?: string;
  name: string;
  key: string;
  createdAt: Timestamp;
  lastUsed?: Timestamp;
  isActive: boolean;
  permissions: string[];
}

const COLLECTION_NAME = 'apiKeys';

export async function generateApiKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = 'sk_';
  for (let i = 0; i < 32; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}

export async function createApiKey(name: string, permissions: string[] = ['read', 'write']): Promise<ApiKey> {
  const key = await generateApiKey();
  const newKey: Omit<ApiKey, 'id'> = {
    name,
    key,
    createdAt: Timestamp.now(),
    isActive: true,
    permissions,
  };
  
  const docRef = await addDoc(collection(db, COLLECTION_NAME), newKey);
  return { id: docRef.id, ...newKey };
}

export async function getAllApiKeys(): Promise<ApiKey[]> {
  const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ApiKey));
}

export async function deleteApiKey(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
}

export async function validateApiKey(key: string): Promise<ApiKey | null> {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  const keys = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ApiKey));
  
  const validKey = keys.find(k => k.key === key && k.isActive);
  
  if (validKey) {
    // Update last used timestamp
    // Note: This requires updateDoc which we'd need to implement
    return validKey;
  }
  
  return null;
}
