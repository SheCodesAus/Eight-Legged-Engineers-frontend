import "../index.css";

function HomeLoggedInPage() {
  return (
    <div>
      <section>
        <p>Profile</p>
      </section>

      <section>
        <button className="btn-primary">Eateries</button>
        <button className="btn-secondary">Activities</button>
      </section>

      <section>
        <input placeholder="What can I do right now?" />
      </section>

      <section>
        <h3>Popular Activities</h3>
        <div>
          <div>Activity Card</div>
          <div>Activity Card</div>
          <div>Activity Card</div>
        </div>
      </section>

      <section>
        <h3>Places to eat</h3>
        <div>
          <div>Eatery Card</div>
          <div>Eatery Card</div>
        </div>
      </section>

      <footer>Footer</footer>
    </div>
  );
}

export default HomeLoggedInPage;