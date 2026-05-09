import "../index.css";

function SearchPage() {
  return (
    <div>
      <section>
        <button>Eateries</button>
        <button>Activities</button>
      </section>

      <section>
        <h3>What</h3>
        <input className="input-field" placeholder="Indoor / Outdoor" />

        <h3>Where</h3>
        <input className="input-field" placeholder="Enter suburb" />

        <h3>Who</h3>
        <input className="input-field" placeholder="Age range" />

        <h3>Cost</h3>
        <input className="input-field" placeholder="Free / $" />
      </section>

      <section>
        <button className="btn-primary">Reset</button>
        <button className="btn-secondary">Search</button>
      </section>
    </div>
  );
}

export default SearchPage;