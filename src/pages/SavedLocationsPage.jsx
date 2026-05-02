import { savedLocations } from "../data";

function SavedLocationsPage() {
  return (
    <div>
      <h1>Saved Locations</h1>
      
      {savedLocations.map((savedLocation, key) => {
        return <div key={key}>{savedLocation.location}</div>;
      })}
    </div>
  );
}

export default SavedLocationsPage;