import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/MyReservations.css";
import "../css/PageLayout.css";

const API_URL = import.meta.env.VITE_API_URL;

function MyMealReservations() {
  const [reservations, setReservations] = useState([]);

  const getReservations = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const res = await axios.get(`${API_URL}/api/reservations/for-my-meals`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReservations(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getReservations();
  }, []);

  return (
    <div className="page-layout">
      <h1>Reservations on My Meals</h1>

      {reservations.length === 0 && <p>No one reserved your meals yet.</p>}

      <div className="reservations-grid">
        {reservations.map(({ _id, meal, user }) => (
          <Link to={`/meals/${meal._id}`} key={_id} className="meal-card-link">
            <div className="reservation-card">
              <img src={meal.image} alt={meal.title} />

              <div className="reservation-body">
                <h3>{meal.title}</h3>
                <p>{meal.description}</p>

                <div className="divider" />

                <p className="meta">👤 {user.name}</p>
                <p className="meta">✉️ {user.email}</p>

                <span className="status">Reserved</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MyMealReservations;
