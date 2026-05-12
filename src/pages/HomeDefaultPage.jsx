import { useNavigate } from "react-router-dom";
import "../index.css";
import "./HomeDefaultPage.css";

function HomeDefaultPage() {
  const navigate = useNavigate();

  return (
    <main className="home-landing">
      <section className="home-hero">
        <div className="brand-block">
          <h1 className="home-brand">
            <span>Play</span><span>Pal</span>
          </h1>
        </div>

        <p className="home-tagline">
          Family-friendly ideas without the endless searching.
        </p>

        <div className="home-cvps">
          <div className="cvp-block cvp-yellow">
            <span className="cvp-kicker">FAST</span>
            <p>Find something to do right now</p>
          </div>

          <div className="cvp-block cvp-tomato">
            <span className="cvp-kicker">LOCAL</span>
            <p>See nearby places that work for kids</p>
          </div>

          <div className="cvp-block cvp-blue">
            <span className="cvp-kicker">EASY</span>
            <p>Save favourites for next time</p>
          </div>
        </div>
      </section>

      <section className="home-cta">
        <button
          className="btn-primary home-button"
          onClick={() => navigate("/login")}
        >
          Get started
        </button>
      </section>
    </main>
  );
}

export default HomeDefaultPage;