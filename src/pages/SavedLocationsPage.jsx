import { savedLocations } from "../data";

function SavedLocationsPage() {
  return (
    <div>
      <h1>Saved Locations</h1>

      {savedLocations.map((savedLocation) => {
        return <div key={savedLocation.id}>{savedLocation.location}</div>;
      })}

      <footer>Footer</footer>
    </div>
  );
}

export default SavedLocationsPage;