import analytics from '@react-native-firebase/analytics';
import { AnalyticsEventName } from '@types';

/**
 * Handles logging a custom analytics event to Firebase
 * @param eventName analytics event name
 * @param payload event payload
 */
export const logEvent = async (
  eventName: AnalyticsEventName,
  payload?: { [key: string]: any },
) => analytics().logEvent(eventName, payload);

/**
 * Returns the Firebase analytics instance
 */
export const instance = () => analytics();
