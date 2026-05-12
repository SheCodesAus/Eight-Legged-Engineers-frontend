import "../index.css";

import { savedLocations } from "../data";

function SavedLocationsPage() {
  return (
    <div>
      <h2>Saved Locations</h2>

      {savedLocations.map((savedLocation) => {
        return <div key={savedLocation.id}>{savedLocation.location}</div>;
      })}

    </div>
  );
}

export default SavedLocationsPage;