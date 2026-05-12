import "./PopularActivitiesTile.css";

function PopularActivitiesTile({ title, image_url }) {
    return (
        <div className="popular-activities-tile">
            <img src={image_url} alt={title} />
            <p className="body-md popular-activities-title">{title}</p>
        </div>
    );
}

export default PopularActivitiesTile;