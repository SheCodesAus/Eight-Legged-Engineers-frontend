import { useSearchParams, useNavigate } from "react-router-dom";
import { activities } from "../data";
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

  const categoryLabel = { activities: "Activity", eateries: "Eatery" }[category];

  const results = activities.filter((activity) => {
    if (categoryLabel && activity.main_category !== categoryLabel) return false;
    if (indoorOutdoor && activity.indoor_outdoor !== indoorOutdoor) return false;
    if (suburb && !activity.suburb.toLowerCase().includes(suburb.toLowerCase())) return false;
    if (cost && activity.cost !== cost) return false;
    return true;
  });

  return (
    <main className="activity-list-page">
      <div className="results-header">
        <h2>Results</h2>
        {hasFilters && (
          <p className="results-count">
            {results.length} {results.length === 1 ? "activity" : "activities"} found
          </p>
        )}
      </div>

      {results.length === 0 ? (
        <div className="no-results-block">
          <p className="no-results">No activities match your search. Try adjusting your filters.</p>
          <button className="btn-primary" onClick={() => navigate("/home")}>
            Back to search
          </button>
        </div>
      ) : (
        <div className="results-list">
          {results.map((activity) => (
            <div
              key={activity.id}
              className="activity-card-link"
              onClick={() => navigate(`/activities/${activity.id}`)}
            >
              <ActivityCard
                title={activity.title}
                address={activity.address}
                cost={activity.cost}
                openingHours={activity.opening_times}
                age={activity.age_range}
              />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default ActivityListPage;
