export const formatString = (str: string): string => {
  const formattedString = str.replace(/([A-Z])/g, ' $1').trim();
  return formattedString.toLowerCase();
};
