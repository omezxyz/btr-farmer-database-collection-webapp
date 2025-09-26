// utils/caseConverter.ts
export const camelToSnake = (obj: Record<string, any>) => {
  const newObj: Record<string, any> = {};
  for (const key in obj) {
    const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
    newObj[snakeKey] = obj[key];
  }
  return newObj;
};
