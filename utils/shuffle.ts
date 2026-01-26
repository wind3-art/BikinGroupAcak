
/**
 * Fisher-Yates shuffle algorithm
 */
export const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * Split array into chunks of a specific size (per member count)
 */
export const chunkArray = <T,>(array: T[], size: number): T[][] => {
  const results: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    results.push(array.slice(i, i + size));
  }
  return results;
};

/**
 * Split array into a specific number of groups
 */
export const splitIntoGroups = <T,>(array: T[], groupCount: number): T[][] => {
  const results: T[][] = Array.from({ length: groupCount }, () => []);
  array.forEach((item, index) => {
    results[index % groupCount].push(item);
  });
  return results;
};
