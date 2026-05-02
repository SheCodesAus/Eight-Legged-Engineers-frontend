export const users = [
  { id: 1, username: "sophie", email: "sophie@email.com" },
  { id: 2, username: "alex", email: "alex@email.com" },
];

export const activities = [
  {
    id: 1,
    title: "Park Picnic",
    description: "Relaxing picnic at the park",
    location: "Sydney Park",
    category: "outdoor",
    is_free: true,
    created_by: 1,
  },
  {
    id: 2,
    title: "Indoor Play Centre",
    description: "Fun for kids indoors",
    location: "PlayZone",
    category: "indoor",
    is_free: false,
    created_by: 2,
  },
  {
    id: 3,
    title: "Beach Day",
    description: "Sunny beach outing",
    location: "Bondi Beach",
    category: "outdoor",
    is_free: true,
    created_by: 1,
  },
];

export const savedLocations = [
  { id: 1, user_id: 1, location: "Sydney Park" },
  { id: 2, user_id: 1, location: "Bondi Beach" },
];

export const profiles = [
  {
    user_id: 1,
    bio: "Love exploring with my dogs 🐶",
    preferred_activity: "outdoor",
  },
];

export const filters = {
  categories: ["indoor", "outdoor"],
  price: ["free", "paid"],
};

export const oneActivity = {
  id: 1,
  title: "Park Picnic",
  description: "Relaxing picnic at the park",
  location: "Sydney Park",
  category: "outdoor",
  is_free: true,
  created_by: 1,
};