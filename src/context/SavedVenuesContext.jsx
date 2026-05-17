import { createContext, useContext, useState } from "react";

const SavedVenuesContext = createContext();

export function SavedVenuesProvider({ children }) {
  const [savedVenues, setSavedVenues] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("savedVenues") || "[]");
    } catch {
      return [];
    }
  });

  const toggleSaved = (venue) => {
    setSavedVenues((prev) => {
      const exists = prev.some((v) => v.id === venue.id);
      const next = exists
        ? prev.filter((v) => v.id !== venue.id)
        : [...prev, venue];
      localStorage.setItem("savedVenues", JSON.stringify(next));
      return next;
    });
  };

  const isSaved = (id) => savedVenues.some((v) => v.id === id);

  return (
    <SavedVenuesContext.Provider value={{ savedVenues, toggleSaved, isSaved }}>
      {children}
    </SavedVenuesContext.Provider>
  );
}

export function useSavedVenues() {
  return useContext(SavedVenuesContext);
}
