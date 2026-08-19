export const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/'/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');