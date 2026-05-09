import { oneActivity } from "../data";
import "../index.css";

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
        <p>Map</p>
      </section>

      <section>
        <h3>Reviews</h3>
        <button>👍</button>
        <button>👎</button>
      </section>

      <footer>Footer</footer>
    </div>
  );
}

export default ActivityDetailPage;