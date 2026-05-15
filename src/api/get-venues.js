const VENUES_API_URL = import.meta.env.VITE_VENUES_API_URL;

export async function getVenues(filters = {}) {
  const url = new URL(VENUES_API_URL);

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      url.searchParams.append(key, value);
    }
  });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch venues");
  }

  return response.json();
}