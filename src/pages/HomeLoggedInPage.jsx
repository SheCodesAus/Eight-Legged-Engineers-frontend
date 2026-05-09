import { useState } from "react";
import "../index.css";
import "./HomeLoggedInPage.css";
import PopularActivitiesTile from "../components/PopularActivitiesTile";
import BottomNav from "../components/BottomNav";
import { savedLocations } from "../data";

function HomeLoggedInPage() {
  const [activeTab, setActiveTab] = useState("activities");

  const savedActivities = savedLocations.filter(
    (location) => location.main_category === "Activity"
  );

  const savedEateries = savedLocations.filter(
    (location) => location.main_category === "Eatery"
  );

  return (
    <main className="home-page">
      <section>
        <p>Profile</p>
      </section>

      <section className="home-tabs" role="tablist">
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
      </section>

      <section>
        <input
          className="input-field"
          placeholder="What can I do right now?"
        />
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

      <BottomNav />
    </main>
  );
}

export default HomeLoggedInPage;