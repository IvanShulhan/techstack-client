export const createArray = (num) => Array.from(Array(num).keys());

export const cutString = (str) => str.length > 120 ? str.slice(0, 117) + '...' : str;

export const generateName = (obj, key) => {
  return obj && obj.hasOwnProperty(key) ? obj[key] : ''
};
