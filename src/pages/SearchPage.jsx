function SearchPage() {
  return (
    <div>
      <section>
        <button>Eateries</button>
        <button>Activities</button>
      </section>

      <section>
        <h3>What</h3>
        <input placeholder="Indoor / Outdoor" />

        <h3>Where</h3>
        <input placeholder="Enter suburb" />

        <h3>Who</h3>
        <input placeholder="Age range" />

        <h3>Cost</h3>
        <input placeholder="Free / $" />
      </section>

      <section>
        <button>Reset</button>
        <button>Search</button>
      </section>
    </div>
  );
}

export default SearchPage;