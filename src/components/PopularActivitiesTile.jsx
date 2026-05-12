import "./PopularActivitiesTile.css";

function PopularActivitiesTile({ title, image_url }) {
    return (
        <div className="popular-activities-tile">
        <img src={image_url} />
        <p className="body-md">{title}</p>
        </div>
    );
}

export default PopularActivitiesTile;