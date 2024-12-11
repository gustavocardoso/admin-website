export function posterURL(poster_path: string) {
  return `https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}`
}

export function createSlug(title: string): string {
  return title
    .toLowerCase() // Convert to lowercase
    .trim() // Remove whitespace from both ends
    .replace(/[\s]+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, '') // Trim hyphens from start and end
}
