export const normalizeGreekString = (str: string) => {
  // Convert to lowercase
  str = str.toLowerCase();

  // Normalize the string to NFD form
  str = str.normalize("NFD");

  // Remove diacritical marks (accents)
  str = str.replace(/[\u0300-\u036f]/g, "");

  return str;
};
