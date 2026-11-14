
const BASE_PATH =
  process.env.NODE_ENV === "production"
    ? "/junaid-khan-portfolio"
    : "";

export function assetPath(path: string): string {
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}
