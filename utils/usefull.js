export const getFormattedDate = (date) => {
  return date.toISOString().slice(0, 10);
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};
