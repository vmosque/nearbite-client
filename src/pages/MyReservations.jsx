import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/MyReservations.css";
import "../css/PageLayout.css";

const API_URL = import.meta.env.VITE_API_URL;

function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const getReservations = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const res = await axios.get(`${API_URL}/api/reservations/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReservations(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    try {
      const token = localStorage.getItem("authToken");

      await axios.delete(`${API_URL}/api/reservations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReservations((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      alert("Could not cancel reservation");
    }
  };

  useEffect(() => {
    getReservations();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="page-layout">
      <h1>My Reservations</h1>

      <div className="reservations-grid">
        {reservations
          .filter((r) => r.meal)
          .map(({ _id, meal }) => (
            <Link
              to={`/meals/${meal._id}`}
              key={_id}
              className="meal-card-link"
            >
              <div className="reservation-card">
                <img src={meal.image} alt={meal.title} />

                <div className="reservation-body">
                  <h3>{meal.title}</h3>
                  <p>{meal.description}</p>
                  <p className="meta">Owner: {meal.owner.email}</p>

                  <span className="status">Reserved</span>

                  <div className="reservation-footer">
                    <button
                      className="cancel-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCancel(_id);
                      }}
                    >
                      Cancel reservation
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default MyReservations;
