import { Link } from "react-router-dom";
import "../css/HomePage.css";
import MainImg from "../assets/MainImg.png";

function HomePage() {
  return (
    <div className="home-page">
      <div className="home-wrapper">
        {/* HERO */}
        <section className="hero">
          <div className="hero-container">
            <div className="hero-text">
              <h1>Share home-cooked food with neighbors nearby</h1>
              <p>Reduce food waste and connect with your local community.</p>

              <div className="hero-buttons">
                <Link to="/meals" className="btn primary">
                  See food near me
                </Link>

                <Link to="/meals/create" className="btn secondary">
                  Post some food
                </Link>
              </div>
            </div>

            <div className="hero-image">
              <img src={MainImg} alt="Community sharing food" />
            </div>
          </div>
        </section>

        {/* WHY */}
        <section className="why">
          <h2>Why use NearBite?</h2>

          <div className="why-cards">
            <div className="why-card">
              <h3>🌱 Cut food waste</h3>
              <p>Share extra meals instead of throwing them away.</p>
            </div>

            <div className="why-card">
              <h3>🤝 Build community</h3>
              <p>Meet neighbors and strengthen local connections.</p>
            </div>

            <div className="why-card">
              <h3>❤️ Enjoy homemade food</h3>
              <p>Discover meals cooked with care nearby.</p>
            </div>
          </div>

          <Link to="/meals/create" className="btn primary">
            Post some food
          </Link>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
