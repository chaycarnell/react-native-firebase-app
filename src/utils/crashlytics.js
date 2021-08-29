import crashlytics from '@react-native-firebase/crashlytics';

/**
 * Add additional logs before an error event is record, note that recordError or recordCustomError
 * must be called for these log values to be reported and displayed to crashlytics
 * @param {string} message message to be included in log
 */
export const log = (message) => crashlytics().log(message);

// Forces any unsent logs to be sent to Firebase if auto collection is disabled
export const syncErrorLogs = async () => {
  if (!crashlytics().isCrashlyticsCollectionEnabled) {
    const hasUnsent = await crashlytics().checkForUnsentReports();
    if (hasUnsent) crashlytics().sendUnsentReports();
  }
};

/**
 * Records an error to Firebase crashlytics, allowing a custom message to be passed in
 * Note: this is required to be called if log() has previously been called
 * @param {string} title
 * @param {string} message
 */
export const recordError = (
  title = 'Custom Error',
  message = 'Custom error message not set',
) => {
  // Record the error
  crashlytics().recordError(new Error(message), title);
  // Force the error to be sent to Firebase
  syncErrorLogs();
};

/**
 * Set the user ID to show alongside any subsequent crash reports
 * @param {string} userId user id to be assigned to crash reports
 */
export const setUserId = (userId) => crashlytics().setUserId(userId);

// Forces the application to crash and a report to be sent to Firebase
export const crash = () => crashlytics().crash();

/**
 * Indicates true / false if last app execition encountered a crash
 * @returns {boolean}
 */
export const didCrashOnLastExecution = async () =>
  crashlytics().didCrashOnPreviousExecution();

/**
 * Enable / disable crashlytics reporting
 * @param {boolean} boolean
 */
export const setCrashlyticsCollectionEnabled = (boolean) =>
  crashlytics().setCrashlyticsCollectionEnabled(boolean);

/**
 * Indicates true / false if crashlytics reporting is enabled
 * @returns {boolean}
 */
export const isEnabled = () => crashlytics().isCrashlyticsCollectionEnabled;
