import Map from "../components/Map";
import { oneActivity } from "../data";
import "../index.css";
import "../components/BottomNav.css";

function ActivityDetailPage() {
  return (
    <div>
      <section>
        <p>Image</p>
      </section>

      <h2>{oneActivity.title}</h2>

      <section>
        <p>{oneActivity.description}</p>
        <p>{oneActivity.address}</p>
        <p>{oneActivity.opening_times}</p>
        <p>{oneActivity.cost}</p>
        <p>{oneActivity.age_range}</p>
      </section>

      <section>
        <h3>Location</h3>
        <p>{oneActivity.suburb}</p>
        <Map lat={-33.8688} lng={151.2093} />
      </section>

      <section>
      <h3>Reviews</h3>

      <div className="review-buttons">
      <button className="review-button" aria-label="Thumbs up">
      {/* Thumbs up */}
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M2 10h4v12H2zM22 11a2 2 0 0 0-2-2h-6l1-4V4a2 2 0 0 0-2-2l-1 1-5 7v12h11a2 2 0 0 0 2-1.5l2-7.5z" />
      </svg>
    </button>

      <button className="review-button" aria-label="Thumbs down">
      {/* Thumbs down */}
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 14h-4V2h4zM2 13a2 2 0 0 0 2 2h6l-1 4v1a2 2 0 0 0 2 2l1-1 5-7V2H6a2 2 0 0 0-2 1.5L2 11z" />
      </svg>
      </button>
      </div>
      </section>
    </div>
  );
}

export default ActivityDetailPage;