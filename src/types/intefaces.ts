import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface AppScreensProps {
  navigationReady: boolean;
}

export interface AuthProviderContext {
  authenticated: boolean;
  currentUser: FirebaseAuthTypes.User | null;
  initialized: boolean;
}
