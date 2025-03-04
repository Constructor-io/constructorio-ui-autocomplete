import { logger } from './helpers';

// Return storage engine based on scope
export const getStorageEngine = (scope) => {
  if (scope === 'local') {
    return localStorage;
  }

  return sessionStorage;
};

// Retrieves item from storage for key
export const storageGetItem = (key) => {
  try {
    const storageEngine = getStorageEngine(key.scope);

    return storageEngine.getItem(key.key);
  } catch (e) {
    logger(`storageGetItem error: ${e}`);

    return null;
  }
};

// Retrieve array from storage
export const storageGetArray = (key) => {
  const item = storageGetItem(key);

  if (item) {
    try {
      const array = JSON.parse(item);

      return array;
    } catch (e) {
      logger(`storageGetArray error: ${e}`);
    }
  }

  return null;
};

// Set item in storage
export const storageSetItem = (key, value) => {
  try {
    const storageEngine = getStorageEngine(key.scope);
    return storageEngine.setItem(key.key, value);
  } catch (e) {
    logger(`storageSetItem error: ${e}`);

    return null;
  }
};
// Remove item in storage

export const storageRemoveItem = (key) => {
  try {
    const storageEngine = getStorageEngine(key.scope);
    return storageEngine.removeItem(key.key);
  } catch (e) {
    logger(`storageRemoveItem error: ${e}`);

    return null;
  }
};
