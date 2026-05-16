import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ActivityCard from "../components/ActivityCard";
import "../index.css";
import "./ActivityListPage.css";

function ActivityListPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const category = searchParams.get("category");
  const indoorOutdoor = searchParams.get("indoor_outdoor");
  const suburb = searchParams.get("suburb");
  const cost = searchParams.get("cost");
  const hasFilters = category || indoorOutdoor || suburb || cost;

  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (category) params.append("main_category", category === "activities" ? "Activity"
      : "Eatery");
    if (indoorOutdoor) params.append("indoor_outdoor", indoorOutdoor);
    if (suburb) params.append("suburb", suburb);

    fetch(`${import.meta.env.VITE_API_BASE_URL}/venues/?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setVenues(data);
        setLoading(false);
      });
  }, [category, indoorOutdoor, suburb]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="activity-list-page">
      <div className="results-header">
        <h2>Activities</h2>
        {hasFilters && (
          <p className="results-count">
            {venues.length} {venues.length === 1 ? "activity" : "activities"} found
          </p>
        )}
      </div>

      {venues.length === 0 ? (
        <div className="no-results-block">
          <p className="no-results">No activities match your search. Try adjusting your
            filters.</p>
          <button className="btn-primary" onClick={() => navigate("/home")}>
            Back to search
          </button>
        </div>
      ) : (
        <div className="results-list">
          {venues.map((activity) => (
            <div
              key={activity.id}
              className="activity-card-link"
              onClick={() => navigate(`/activities/${activity.id}`)}
            >
              <ActivityCard
                title={activity.name}
                address={activity.address}
                cost={activity.cost}
                openingHours={activity.opening_times}
                age={activity.min_age && activity.max_age ?
                  `${activity.min_age}–${activity.max_age} yrs` : ""}
              />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default ActivityListPage;