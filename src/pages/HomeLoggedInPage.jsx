import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import PopularActivitiesTile from "../components/PopularActivitiesTile";

const INDOOR_OUTDOOR_OPTIONS = ["Indoor", "Outdoor"];

function HomeLoggedInPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("activities");
  const [searchForm, setSearchForm] = useState({
    indoor_outdoor: "",
    suburb: "",
    age: "",
    cost: "",
  });
  const [suburbSuggestions, setSuburbSuggestions] = useState([]);
  const [popularActivities, setPopularActivities] = useState([]);
  const [popularEateries, setPopularEateries] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/venues/?main_category=Activity`)
      .then((res) => res.json())
      .then((data) => setPopularActivities(data.slice(0, 5)));

    fetch(`${import.meta.env.VITE_API_BASE_URL}/venues/?main_category=Eatery`)
      .then((res) => res.json())
      .then((data) => setPopularEateries(data.slice(0, 5)));
  }, []);

  const handleChange = (e) => {
    setSearchForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSuburbChange = (e) => {
    const value = e.target.value;
    setSearchForm((prev) => ({ ...prev, suburb: value }));

    if (value.length > 1) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/suburbs/search/?search=${value}`)
        .then((res) => res.json())
        .then((data) => setSuburbSuggestions(data.suburb_matches || []));
    } else {
      setSuburbSuggestions([]);
    }
  };

  const handleSuburbSelect = (suburb) => {
    setSearchForm((prev) => ({ ...prev, suburb }));
    setSuburbSuggestions([]);
  };

  const handleReset = () => {
    setSearchForm({ indoor_outdoor: "", suburb: "", age: "", cost: "" });
    setSuburbSuggestions([]);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("category", activeTab);
    if (searchForm.indoor_outdoor) params.set("indoor_outdoor",
      searchForm.indoor_outdoor);
    if (searchForm.suburb.trim()) params.set("suburb", searchForm.suburb.trim());
    if (searchForm.age.trim()) params.set("age", searchForm.age.trim());
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
              {INDOOR_OUTDOOR_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className="search-field" style={{ position: "relative" }}>
            <label className="search-label">Where</label>
            <input
              className="input-field"
              name="suburb"
              placeholder="Enter suburb"
              value={searchForm.suburb}
              onChange={handleSuburbChange}
              autoComplete="off"
            />
            {suburbSuggestions.length > 0 && (
              <ul className="suburb-suggestions">
                {suburbSuggestions.map((s) => (
                  <li
                    key={s.suburb}
                    onClick={() => handleSuburbSelect(s.suburb)}
                    className="suburb-suggestion-item"
                  >
                    {s.suburb}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="search-field">
            <label className="search-label">Who</label>
            <input
              className="input-field"
              name="age"
              placeholder="Child's age"
              value={searchForm.age}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="search-actions">
          <button className="btn-secondary" onClick={handleReset}>Reset</button>
          <button className="btn-primary" onClick={handleSearch}>Search</button>
        </div>
      </section>

      {/* ACTIVITIES TAB */}
      {activeTab === "activities" && (
        <section>
          <h3>Popular Activities</h3>
          <div className="popular-activities-container">
            {popularActivities.map((activity) => (
              <PopularActivitiesTile
                key={activity.id}
                title={activity.name}
                image_url={activity.image_url}
              />
            ))}
          </div>
        </section>
      )}

      {/* EATERIES TAB */}
      {activeTab === "eateries" && (
        <section>
          <h3>Popular Eateries</h3>
          <div className="popular-activities-container">
            {popularEateries.map((eatery) => (
              <PopularActivitiesTile
                key={eatery.id}
                title={eatery.name}
                image_url={eatery.image_url}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default HomeLoggedInPage;