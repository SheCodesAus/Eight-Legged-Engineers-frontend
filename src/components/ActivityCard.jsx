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
        <h5 className="h5">{title}</h5>
        <p className="body-md">{address}</p>
        <p className="tag">{cost}</p>
        <p className="tag">{openingHours}</p>
        <p className="tag">{age}</p>
      </div>
    );
}

export default ActivityCard;