import crashlytics from '@react-native-firebase/crashlytics';

/**
 * Add additional logs before an error event is record, note that recordError or recordCustomError
 * must be called for these log values to be reported and displayed to crashlytics
 * @param message message to be included in log
 */
export const log = (message: string): void => crashlytics().log(message);

// Forces any unsent logs to be sent to Firebase if auto collection is disabled
export const syncErrorLogs = async (): Promise<void> => {
  if (!crashlytics().isCrashlyticsCollectionEnabled) {
    const hasUnsent = await crashlytics().checkForUnsentReports();
    if (hasUnsent) {
      crashlytics().sendUnsentReports();
    }
  }
};

/**
 * Records an error to Firebase crashlytics, allowing a custom message to be passed in
 * Note: this is required to be called if log() has previously been called
 * @param title
 * @param message
 */
export const recordError = (
  title = 'Custom Error',
  message = 'Custom error message not set',
): void => {
  // Record the error
  crashlytics().recordError(new Error(message), title);
  // Force the error to be sent to Firebase
  syncErrorLogs();
};

/**
 * Set the user ID to show alongside any subsequent crash reports
 * @param userId user id to be assigned to crash reports
 */
export const setUserId = (userId: string): Promise<null> =>
  crashlytics().setUserId(userId);

// Forces the application to crash and a report to be sent to Firebase
export const crash = (): void => crashlytics().crash();

/**
 * Indicates true / false if last app execution encountered a crash
 */
export const didCrashOnLastExecution = async (): Promise<boolean> =>
  crashlytics().didCrashOnPreviousExecution();

/**
 * Enable / disable crashlytics reporting
 * @param boolean
 */
export const setCrashlyticsCollectionEnabled = (
  boolean: boolean,
): Promise<null> => crashlytics().setCrashlyticsCollectionEnabled(boolean);

/**
 * Indicates true / false if crashlytics reporting is enabled
 */
export const isEnabled = (): boolean =>
  crashlytics().isCrashlyticsCollectionEnabled;
