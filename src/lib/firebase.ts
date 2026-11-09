import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  getDocFromServer,
  setDoc,
  collection,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  onAuthStateChanged,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore with specific provisioned database ID
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Error handling contracts required by Firestore security specifications
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Connection test on boot as mandated by the integration skill
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore offline notice: please check network configuration.');
    }
    // Expected in rules without read on test/connection, but confirms backend reachability
    return false;
  }
}

// Default Constants
export const DEFAULT_HERO_IMAGE = '/src/assets/images/ghana_hero_banner_1794255705201.jpg';
export const DEFAULT_ELDER_AVATAR = '/src/assets/images/ghana_adinkra_elder_1794255756821.jpg';

// Service: Site Settings (Hero Banner & Elder Avatar)
export interface SiteSettingsDoc {
  heroImage: string;
  elderAvatar: string;
  updatedAt?: string;
}

export async function getSiteSettingsFromFirestore(): Promise<SiteSettingsDoc | null> {
  const path = 'settings/site';
  try {
    const docRef = doc(db, 'settings', 'site');
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return snapshot.data() as SiteSettingsDoc;
    }
    return null;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, path);
  }
}

export async function saveSiteSettingsToFirestore(
  settings: Partial<SiteSettingsDoc>
): Promise<void> {
  const path = 'settings/site';
  try {
    const current = (await getDoc(doc(db, 'settings', 'site'))).data() || {};
    const payload: SiteSettingsDoc = {
      heroImage: settings.heroImage || current.heroImage || DEFAULT_HERO_IMAGE,
      elderAvatar: settings.elderAvatar || current.elderAvatar || DEFAULT_ELDER_AVATAR,
      updatedAt: new Date().toISOString(),
    };
    await setDoc(doc(db, 'settings', 'site'), payload);
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

// Service: Game Assets (Covers & Artworks)
export interface GameAssetDoc {
  id: string;
  image: string;
  name?: string;
  category?: string;
  updatedAt?: string;
}

export async function getGameAssetsFromFirestore(): Promise<Record<string, string>> {
  const path = 'game_assets';
  try {
    const querySnapshot = await getDocs(collection(db, path));
    const assets: Record<string, string> = {};
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data() as GameAssetDoc;
      if (data.id && data.image) {
        assets[data.id] = data.image;
      }
    });
    return assets;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, path);
  }
}

export async function saveGameAssetToFirestore(
  gameId: string,
  image: string,
  extra?: { name?: string; category?: string }
): Promise<void> {
  const path = `game_assets/${gameId}`;
  try {
    const payload: GameAssetDoc = {
      id: gameId,
      image,
      name: extra?.name,
      category: extra?.category,
      updatedAt: new Date().toISOString(),
    };
    await setDoc(doc(db, 'game_assets', gameId), payload);
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

// Service: Story Assets (Oral History & Essay Photography)
export interface StoryAssetDoc {
  id: string;
  image: string;
  title?: string;
  updatedAt?: string;
}

export async function getStoryAssetsFromFirestore(): Promise<Record<string, string>> {
  const path = 'story_assets';
  try {
    const querySnapshot = await getDocs(collection(db, path));
    const assets: Record<string, string> = {};
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data() as StoryAssetDoc;
      if (data.id && data.image) {
        assets[data.id] = data.image;
      }
    });
    return assets;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, path);
  }
}

export async function saveStoryAssetToFirestore(
  storyId: string,
  image: string,
  title?: string
): Promise<void> {
  const path = `story_assets/${storyId}`;
  try {
    const payload: StoryAssetDoc = {
      id: storyId,
      image,
      title,
      updatedAt: new Date().toISOString(),
    };
    await setDoc(doc(db, 'story_assets', storyId), payload);
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

// Service: Real-time listener for Settings
export function subscribeToSiteSettings(
  callback: (data: SiteSettingsDoc | null) => void
): () => void {
  const path = 'settings/site';
  const unsubscribe = onSnapshot(
    doc(db, 'settings', 'site'),
    (snap) => {
      if (snap.exists()) {
        callback(snap.data() as SiteSettingsDoc);
      } else {
        callback(null);
      }
    },
    (err) => {
      handleFirestoreError(err, OperationType.GET, path);
    }
  );
  return unsubscribe;
}

// Service: Real-time listener for Game Assets
export function subscribeToGameAssets(
  callback: (assets: Record<string, string>) => void
): () => void {
  const path = 'game_assets';
  const unsubscribe = onSnapshot(
    collection(db, path),
    (snapshot) => {
      const assets: Record<string, string> = {};
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as GameAssetDoc;
        if (data.id && data.image) {
          assets[data.id] = data.image;
        }
      });
      callback(assets);
    },
    (err) => {
      handleFirestoreError(err, OperationType.GET, path);
    }
  );
  return unsubscribe;
}

// Service: Real-time listener for Story Assets
export function subscribeToStoryAssets(
  callback: (assets: Record<string, string>) => void
): () => void {
  const path = 'story_assets';
  const unsubscribe = onSnapshot(
    collection(db, path),
    (snapshot) => {
      const assets: Record<string, string> = {};
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as StoryAssetDoc;
        if (data.id && data.image) {
          assets[data.id] = data.image;
        }
      });
      callback(assets);
    },
    (err) => {
      handleFirestoreError(err, OperationType.GET, path);
    }
  );
  return unsubscribe;
}

// Auth Helpers
export async function loginWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export async function logoutAdmin(): Promise<void> {
  await signOut(auth);
}

export function subscribeToAuth(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, callback);
}
