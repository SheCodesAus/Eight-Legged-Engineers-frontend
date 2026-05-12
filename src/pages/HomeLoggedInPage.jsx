import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import PopularActivitiesTile from "../components/PopularActivitiesTile";
import WeatherBadge from "../components/WeatherBadge";
import "./HomeLoggedInPage.css";

function HomeLoggedInPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("activities");
  const [searchForm, setSearchForm] = useState({
    indoor_outdoor: "",
    suburb: "",
    age_range: "",
    cost: "",
  });

  const savedActivities = savedLocations.filter(
    (location) => location.main_category === "Activity"
  );

  const savedEateries = savedLocations.filter(
    (location) => location.main_category === "Eatery"
  );

  const handleChange = (e) => {
    setSearchForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleReset = () => {
    setSearchForm({ indoor_outdoor: "", suburb: "", age_range: "", cost: "" });
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("category", activeTab);
    if (searchForm.indoor_outdoor) params.set("indoor_outdoor", searchForm.indoor_outdoor);
    if (searchForm.suburb.trim()) params.set("suburb", searchForm.suburb.trim());
    if (searchForm.age_range.trim()) params.set("age_range", searchForm.age_range.trim());
    if (searchForm.cost) params.set("cost", searchForm.cost);
    navigate(`/activities?${params.toString()}`);
  };

  return (
    <main className="home-page">
      <section>
        <p>Profile</p>
      </section>

      {/* ── Search ─────────────────────────────────────────────────────────── */}
      <section className="search-section">
        <h3 className="search-heading">Find something to do</h3>

        <div className="home-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "activities"}
            className={`home-tab ${activeTab === "activities" ? "active" : ""}`}
            onClick={() => setActiveTab("activities")}
          >
            Activities
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "eateries"}
            className={`home-tab ${activeTab === "eateries" ? "active" : ""}`}
            onClick={() => setActiveTab("eateries")}
          >
            Eateries
          </button>
        </div>

        <div className="search-form">
          <div className="search-field">
            <label className="search-label">What</label>
            <select
              className="input-field search-select"
              name="indoor_outdoor"
              value={searchForm.indoor_outdoor}
              onChange={handleChange}
            >
              <option value="">Indoor or Outdoor?</option>
              {filters.indoor_outdoor.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className="search-field">
            <label className="search-label">Where</label>
            <input
              className="input-field"
              name="suburb"
              placeholder="Enter suburb"
              value={searchForm.suburb}
              onChange={handleChange}
            />
          </div>

          <div className="search-field">
            <label className="search-label">Who</label>
            <input
              className="input-field"
              name="age_range"
              placeholder="Age range"
              value={searchForm.age_range}
              onChange={handleChange}
            />
          </div>

          <div className="search-field">
            <label className="search-label">Cost</label>
            <select
              className="input-field search-select"
              name="cost"
              value={searchForm.cost}
              onChange={handleChange}
            >
              <option value="">Any cost</option>
              {filters.cost.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="search-actions">
          <button className="btn-secondary" onClick={handleReset}>Reset</button>
          <button className="btn-primary" onClick={handleSearch}>Search</button>
        </div>
      </section>

      {/* ACTIVITIES TAB */}
      {activeTab === "activities" && (
        <>
          <section>
            <h3>Popular Activities</h3>
            <div className="popular-activities-container">
              <PopularActivitiesTile title="Swimming" image_url="https://example.com/swimming.jpg" />
              <PopularActivitiesTile title="Art Class" image_url="https://example.com/art-class.jpg" />
              <PopularActivitiesTile title="Cooking Workshop" image_url="https://example.com/cooking-workshop.jpg" />
              <PopularActivitiesTile title="Yoga" image_url="https://example.com/yoga.jpg" />
              <PopularActivitiesTile title="Pottery" image_url="https://example.com/pottery.jpg" />
            </div>
          </section>

          <section>
            <h3>Saved Activities</h3>
            <div className="popular-activities-container">
              {savedActivities.map((location) => (
                <PopularActivitiesTile
                  key={location.id}
                  title={location.title}
                  image_url={location.image_url}
                />
              ))}
            </div>
          </section>
        </>
      )}

      {/* EATERIES TAB */}
      {activeTab === "eateries" && (
        <>
          <section>
            <h3>Popular Eateries</h3>
            <div className="popular-activities-container">
              <PopularActivitiesTile title="Burger Joint" image_url="https://example.com/burger-joint.jpg" />
              <PopularActivitiesTile title="Pizza Place" image_url="https://example.com/pizza-place.jpg" />
            </div>
          </section>

          <section>
            <h3>Saved Eateries</h3>
            <div className="popular-activities-container">
              {savedEateries.map((location) => (
                <PopularActivitiesTile
                  key={location.id}
                  title={location.title}
                  image_url={location.image_url}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default HomeLoggedInPage;
