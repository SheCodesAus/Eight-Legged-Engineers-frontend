import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "../index.css";
import "./HomeLoggedInPage.css";
import PopularActivitiesTile from "../components/PopularActivitiesTile";
import WeatherBadge from "../components/WeatherBadge";
import { useSavedVenues } from "../context/SavedVenuesContext.jsx";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const INDOOR_OUTDOOR_OPTIONS = ["Indoor", "Outdoor"];

function calculateAge(birthMonth, birthYear) {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  let age = currentYear - birthYear;
  if (currentMonth < birthMonth) age -= 1;
  return age;
}

function HomeLoggedInPage() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("activities");
  const [searchForm, setSearchForm] = useState({
    indoor_outdoor: "",
    suburb: "",
    age: "",
    cost: "",
  });
  const [kids, setKids] = useState([]);
  const [suburbSuggestions, setSuburbSuggestions] = useState([]);
  const [popularActivities, setPopularActivities] = useState([]);
  const [popularEateries, setPopularEateries] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/venues/?main_category=Activity`)
      .then((res) => res.json())
      .then((data) => setPopularActivities(data.slice(0, 5)));

    fetch(`${API_BASE}/venues/?main_category=Eatery`)
      .then((res) => res.json())
      .then((data) => setPopularEateries(data.slice(0, 5)));

    // Fetch the user's kids for the Who dropdown
    supabase.auth.getSession().then(({ data }) => {
      const token = data.session?.access_token;
      if (!token) return;
      fetch(`${API_BASE}/users/me/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setKids(data.kids ?? []));
    });
  }, []);

  const handleChange = (e) => {
    setSearchForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSuburbChange = (e) => {
    const value = e.target.value;
    setSearchForm((prev) => ({ ...prev, suburb: value }));

    if (value.length > 1) {
      fetch(`${API_BASE}/suburbs/search/?search=${value}`)
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
    if (searchForm.indoor_outdoor) params.set("indoor_outdoor", searchForm.indoor_outdoor);
    if (searchForm.suburb.trim()) params.set("suburb", searchForm.suburb.trim());
    if (searchForm.age) params.set("age", searchForm.age);
    if (searchForm.cost) params.set("cost", searchForm.cost);
    navigate(`/activities?${params.toString()}`);
  };

  const { savedVenues } = useSavedVenues();

  const popularVenues =
    activeTab === "activities" ? popularActivities : popularEateries;

  const savedForTab = savedVenues.filter((v) =>
    activeTab === "activities"
      ? v.main_category === "Activity"
      : v.main_category === "Eatery"
  );

  return (
    <main className="home-page">
      <section className="search-section">
        <div className="search-header">
          <h3 className="search-heading">Find <span className="heading-accent">something to do</span></h3>
          <WeatherBadge />
        </div>

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

          <div className="search-field suburb-field">
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
            {kids.length > 0 ? (
              <select
                className="input-field search-select"
                name="age"
                value={searchForm.age}
                onChange={handleChange}
              >
                <option value="">Select a child</option>
                {kids.map((kid) => {
                  const age = calculateAge(kid.birth_month, kid.birth_year);
                  return (
                    <option key={kid.id} value={age}>
                      Age {age}
                    </option>
                  );
                })}
              </select>
            ) : (
              <input
                className="input-field"
                name="age"
                placeholder="Child's age"
                value={searchForm.age}
                onChange={handleChange}
              />
            )}
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
              <option value="Free">Free</option>
              <option value="$">$</option>
              <option value="$$">$$</option>
              <option value="$$$">$$$</option>
              <option value="$$$$">$$$$</option>
            </select>
          </div>
        </div>

        <div className="search-actions">
          <button className="btn-secondary" onClick={handleReset}>Reset</button>
          <button className="btn-primary" onClick={handleSearch}>Search</button>
        </div>
      </section>

      <section>
        <h3>
          {activeTab === "activities" ? <>Popular <span className="heading-accent">Activities</span></> : <>Popular <span className="heading-accent">Eateries</span></>}
        </h3>
        <div className="popular-activities-container">
          {popularVenues.map((venue) => (
            <PopularActivitiesTile
              key={venue.id}
              title={venue.title || venue.name}
              image_url={venue.image_url}
              onClick={() => navigate(`/activities/${venue.id}`)}
            />
          ))}
        </div>
      </section>

      <section>
        <h3>
          {activeTab === "activities" ? <>Saved <span className="heading-accent">Activities</span></> : <>Saved <span className="heading-accent">Eateries</span></>}
        </h3>
        {savedForTab.length === 0 ? (
          <p className="no-saved-message">
            No saved {activeTab} yet. Star an activity to save it here.
          </p>
        ) : (
          <div className="popular-activities-container">
            {savedForTab.map((venue) => (
              <PopularActivitiesTile
                key={venue.id}
                title={venue.name}
                image_url={venue.image_url}
                onClick={() => navigate(`/activities/${venue.id}`)}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default HomeLoggedInPage;