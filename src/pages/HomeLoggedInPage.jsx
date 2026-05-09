import "../index.css";
import PopularActivitiesTile from "../components/PopularActivitiesTile";

function HomeLoggedInPage() {
  return (
    <div>
      <section>
        <p>Profile</p>
      </section>

      <section>
        <button className="btn-primary">Eateries</button>
        <button className="btn-secondary">Activities</button>
      </section>

      <section>
        <input 
            className="input-field"
            placeholder="What can I do right now?" />
      </section>

      <section>
        <h3>Popular Activities</h3>
        <div>
          <PopularActivitiesTile title="Swimming" image_url="https://example.com/swimming.jpg" />
          <PopularActivitiesTile title="Art Class" image_url="https://example.com/art-class.jpg" />
          <PopularActivitiesTile title="Cooking Workshop" image_url="https://example.com/cooking-workshop.jpg" />
        </div>
      </section>

      <section>
        <h3>Popular Eateries</h3>
        <div>
          <PopularActivitiesTile title="Burger Joint" image_url="https://example.com/burger-joint.jpg" />
          <PopularActivitiesTile title="Pizza Place" image_url="https://example.com/pizza-place.jpg" />
        </div>
      </section>

    </div>
  );
}

export default HomeLoggedInPage;