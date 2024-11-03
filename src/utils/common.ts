import uuid from 'react-native-uuid';

/**
 * Generates a new UUID.
 * @returns {string} A new UUID.
 */
export const generateUUID = (): string => {
    return uuid.v4() as string;
};