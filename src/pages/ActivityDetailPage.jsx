import { useParams, useNavigate } from "react-router-dom";
import Map from "../components/Map";
import { activities } from "../data";
import "../index.css";
import "./ActivityDetailPage.css";

function ActivityDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const activity = activities.find((a) => a.id === parseInt(id));

  if (!activity) {
    return (
      <main className="activity-detail-page">
        <p>Activity not found.</p>
        <button className="btn-primary" onClick={() => navigate("/activities")}>
          Back to results
        </button>
      </main>
    );
  }

  return (
    <main className="activity-detail-page">
      <section className="activity-hero">
        <img
          className="activity-hero-image"
          src={activity.image_url}
          alt={activity.title}
        />
      </section>

      <section className="activity-info-card">
        <div className="activity-card-header">
          <h2>{activity.title}</h2>
        </div>

        <p className="activity-description">{activity.description}</p>

        <div className="activity-details-list">
          <p>{activity.address}</p>
          <p>{activity.opening_times}</p>
          <p>{activity.cost}</p>
          <p>{activity.age_range}</p>
        </div>
      </section>

      <section className="activity-content">
        <h3>Location</h3>
        <p>{activity.address}</p>
        <Map lat={activity.latitude} lng={activity.longitude} />
      </section>

      <section className="activity-content reviews-section">
        <h3>Reviews</h3>

        <div className="review-buttons">
          <button className="review-button" aria-label="Thumbs up">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 10h4v12H2zM22 11a2 2 0 0 0-2-2h-6l1-4V4a2 2 0 0 0-2-2l-1 1-5 7v12h11a2 2 0 0 0 2-1.5l2-7.5z" />
            </svg>
          </button>

          <button className="review-button" aria-label="Thumbs down">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 14h-4V2h4zM2 13a2 2 0 0 0 2 2h6l-1 4v1a2 2 0 0 0 2 2l1-1 5-7V2H6a2 2 0 0 0-2 1.5L2 11z" />
            </svg>
          </button>
        </div>
      </section>
    </main>
  );
}

export default ActivityDetailPage;