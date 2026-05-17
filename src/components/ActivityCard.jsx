import "../index.css";
import "./ActivityCard.css";
import starOutline from "../../img/StarOutlineFilled.svg";
import starFilled from "../../img/StarSharp.png";
import { useSavedVenues } from "../context/SavedVenuesContext.jsx";

function ActivityCard({ id, title, image_url, address, cost, openingHours, age, mainCategory }) {
    const { isSaved, toggleSaved } = useSavedVenues();
    const starred = isSaved(id);

    const handleStar = (e) => {
        e.stopPropagation();
        toggleSaved({ id, name: title, image_url, main_category: mainCategory });
    };

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
            <button
                className="star-btn"
                aria-label={starred ? "Unstar" : "Star"}
                onClick={handleStar}
            >
                <img src={starred ? starFilled : starOutline} alt="" className="star-icon" />
            </button>
        </div>
    );
}

export default ActivityCard;