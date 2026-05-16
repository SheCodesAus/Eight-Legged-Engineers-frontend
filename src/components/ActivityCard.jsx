import "../index.css";
import "./ActivityCard.css";

function ActivityCard({ title, image_url, address, cost, openingHours, age }) {
    return (
        <div className="activity-card">
        <img
            src={image_url}
            alt={title}
            className="activity-card-image"
        />
        <div className="activity-card-text">
          <h5 className="h5">{title}</h5>
          <p className="body-md">{address}</p>
          <div className="tag-row">
            <span className="tag">{cost}</span>
            <span className="tag">{openingHours}</span>
            <span className="tag">{age}</span>
          </div>
        </div>
      </div>
    );
}

export default ActivityCard;