import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ActivityCard from "../components/ActivityCard";
import "../index.css";
import "./ActivityListPage.css";
import WeatherBadge from "../components/WeatherBadge";

function ActivityListPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const indoorOutdoor = searchParams.get("indoor_outdoor");
  const suburb = searchParams.get("suburb");
  const cost = searchParams.get("cost");

  const [activeType, setActiveType] = useState(
    searchParams.get("category") === "eateries" ? "eateries" : "activities"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [venues, setVenues] = useState([]);
  const [suburbMessage, setSuburbMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setSuburbMessage("");
    const params = new URLSearchParams();
    params.append("main_category", activeType === "activities" ? "Activity" : "Eatery");
    if (indoorOutdoor) params.append("indoor_outdoor", indoorOutdoor);
    if (suburb) params.append("suburb", suburb);

    fetch(`${import.meta.env.VITE_API_BASE_URL}/venues/?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setVenues(data);
        } else {
          setVenues([]);
          if (data.status === "no_venues_in_nsw_suburb") {
            setSuburbMessage(`Currently nothing is logged in ${data.suburb}.`);
          } else if (data.status === "unsupported_state") {
            setSuburbMessage("We're currently only built for NSW, but we're excited to support you in the future.");
          } else if (data.status === "unknown_suburb") {
            setSuburbMessage(`We couldn't find "${data.suburb}" — please contact us if you have any feedback.`);
          }
        }
        setLoading(false);
      });
  }, [activeType, indoorOutdoor, suburb]);

  const filteredVenues = venues.filter((v) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (v.name || "").toLowerCase().includes(q) ||
      (v.address || "").toLowerCase().includes(q) ||
      (v.suburb || "").toLowerCase().includes(q)
    );
  });

  return (
    <main className="activity-list-page">
      <div className="results-header">
        <h2>
          View all{" "}
          <span className="heading-accent">
            {activeType === "activities" ? "Activities" : "Eateries"}
          </span>
        </h2>
        <WeatherBadge />
      </div>

      <div className="list-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeType === "activities"}
          className={`list-tab ${activeType === "activities" ? "active" : ""}`}
          onClick={() => setActiveType("activities")}
        >
          Activities
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeType === "eateries"}
          className={`list-tab ${activeType === "eateries" ? "active" : ""}`}
          onClick={() => setActiveType("eateries")}
        >
          Eateries
        </button>
      </div>

      <div className="list-search">
        <input
          className="input-field list-search-input"
          type="search"
          placeholder={`Search ${activeType}…`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredVenues.length === 0 ? (
        <div className="no-results-block">
          <p className="no-results">
            {suburbMessage || `No ${activeType} match your search. Try adjusting your filters.`}
          </p>
          <button className="btn-primary" onClick={() => navigate("/home")}>
            Back to search
          </button>
        </div>
      ) : (
        <div className="results-list">
          {filteredVenues.map((activity) => (
            <div
              key={activity.id}
              className="activity-card-link"
              onClick={() => navigate(`/activities/${activity.id}`)}
            >
              <ActivityCard
                id={activity.id}
                title={activity.name}
                image_url={activity.image_url}
                address={activity.address}
                cost={activity.cost}
                openingHours={activity.opening_times}
                age={activity.min_age && activity.max_age ?
                  `${activity.min_age}–${activity.max_age} yrs` : ""}
                mainCategory={activity.main_category}
              />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default ActivityListPage;