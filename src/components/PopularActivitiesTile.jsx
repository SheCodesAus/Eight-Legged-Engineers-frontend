import "./PopularActivitiesTile.css";

function PopularActivitiesTile({ title, image_url, onClick }) {
    return (
        <div className="popular-activities-tile" onClick={onClick} style={onClick ? { cursor: "pointer" } : undefined}>
            <img src={image_url} alt={title} />
            <p className="body-md popular-activities-title">{title}</p>
        </div>
    );
}

export default PopularActivitiesTile;