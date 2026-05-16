import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import Map from "../components/Map";
import "../index.css";
import "./ActivityDetailPage.css";
import WeatherBadge from "../components/WeatherBadge";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

async function getToken() {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? "";
}

function ActivityDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState([]);
  const [userRating, setUserRating] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/venues/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setActivity(data);
        setRatings(data.ratings ?? []);
        setLoading(false);
      });
  }, [id]);

  async function handleRate(ratingType) {
    const token = await getToken();
    if (!token) {
      navigate("/login");
      return;
    }

    setSubmitting(true);
    const res = await fetch(`${API_BASE}/venues/${id}/ratings/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ rating_type: ratingType }),
    });

    if (res.ok) {
      const newRating = await res.json();
      setRatings((prev) => [...prev, newRating]);
      setUserRating(ratingType);
    }
    setSubmitting(false);
  }

  if (loading) return <p>Loading...</p>;

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

  const thumbsUp = ratings.filter((r) => r.rating_type === "yes").length;
  const thumbsDown = ratings.filter((r) => r.rating_type === "no").length;
  const hasRated = userRating !== null;

  return (
    <main className="activity-detail-page">
      <section className="activity-hero">
        <img
          className="activity-hero-image"
          src={activity.image_url}
          alt={activity.name}
        />
      </section>

      <section className="activity-info-card">
        <div className="activity-card-header">
          <h2>{activity.name}</h2>
          <WeatherBadge />
        </div>

        <p className="activity-description">{activity.sub_category}</p>

        <div className="activity-details-list">
          <p>{activity.address}</p>
          <p>{activity.opening_times}</p>
          <p>{activity.cost}</p>
          <p>
            {activity.min_age && activity.max_age
              ? `${activity.min_age}–${activity.max_age} yrs`
              : ""}
          </p>
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
          <div className="review-button-group">
            <button
              className={`review-button ${userRating === "yes" ? "active" : ""}`}
              aria-label="Thumbs up"
              onClick={() => handleRate("yes")}
              disabled={hasRated || submitting}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 10h4v12H2zM22 11a2 2 0 0 0-2-2h-6l1-4V4a2 2 0 0 0-2-2l-1 1-5 
      7v12h11a2 2 0 0 0 2-1.5l2-7.5z" />
              </svg>
            </button>
            <p className="review-count">
              <span className="review-count-number">{thumbsUp}</span> parents voted good
            </p>
          </div>

          <div className="review-button-group">
            <button
              className={`review-button ${userRating === "no" ? "active" : ""}`}
              aria-label="Thumbs down"
              onClick={() => handleRate("no")}
              disabled={hasRated || submitting}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 14h-4V2h4zM2 13a2 2 0 0 0 2 2h6l-1 4v1a2 2 0 0 0 2 2l1-1 
      5-7V2H6a2 2 0 0 0-2 1.5L2 11z" />
              </svg>
            </button>
            <p className="review-count">
              <span className="review-count-number">{thumbsDown}</span> parents voted lame
            </p>
          </div>
        </div>

        {hasRated && (
          <p className="rating-thankyou">Thanks for your review!</p>
        )}
      </section>
    </main>
  );
}

export default ActivityDetailPage;