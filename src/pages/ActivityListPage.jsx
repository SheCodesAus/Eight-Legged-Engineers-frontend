import { activities } from "../data";
import "../index.css";

function ActivityListPage() {
  return (
    <div>
      <section>
        <h3>Map</h3>
      </section>

      <section>
        <h3>Results</h3>

        {activities.map((activity) => {
          return (
            <div key={activity.id}>
              <p>{activity.title}</p>
              <p>{activity.suburb}</p>
              <p>{activity.address}</p>
              <p>{activity.main_category}</p>
              <p>{activity.indoor_outdoor}</p>
              <p>{activity.cost}</p>
            </div>
          );
        })}
      </section>
    </div>

  );
}

export default ActivityListPage;