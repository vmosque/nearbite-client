import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "../css/MealDetail.css";

const API_URL = import.meta.env.VITE_API_URL;

function MealDetail() {
  const { mealId } = useParams();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useContext(AuthContext);

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMeal = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/meals/${mealId}`);
      setMeal(res.data);
    } catch (error) {
      console.error("Failed to fetch meal", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReserve = async () => {
    try {
      const token = localStorage.getItem("authToken");

      await axios.post(
        `${API_URL}/api/reservations/${meal._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      navigate("/my-reservations");
    } catch (error) {
      alert("Could not reserve meal");
    }
  };

  useEffect(() => {
    getMeal();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!meal) return <p>Meal not found</p>;

  const isOwner = user?._id === meal.owner._id;
  const isReserved = meal.status === "reserved";

  return (
    <div className="meal-detail-page">
      <div className="meal-detail-card">
        <img src={meal.image} alt={meal.title} className="meal-image" />

        <div className="meal-info">
          <h1>{meal.title}</h1>
          <p className="description">{meal.description}</p>

          <div className="info-grid">
            <div>
              <strong>📍 Location</strong>
              <p>{meal.location}</p>
            </div>

            <div>
              <strong>⏰ Pickup</strong>
              <p>
                {meal.pickupFrom} – {meal.pickupTo}
              </p>
            </div>

            <div>
              <strong>⌛ Expires</strong>
              <p>{new Date(meal.expiresAt).toLocaleString()}</p>
            </div>

            <div>
              <strong>🍽 Portions</strong>
              <p>{meal.portions}</p>
            </div>
          </div>

          <div className="tags">
            {meal.dietary.map((item) => (
              <span key={item} className="tag green">
                {item}
              </span>
            ))}

            {meal.allergens.map((item) => (
              <span key={item} className="tag red">
                {item}
              </span>
            ))}
          </div>

          {isLoggedIn && !isOwner && !isReserved && (
            <button className="reserve-btn" onClick={handleReserve}>
              Reserve meal
            </button>
          )}

          {isReserved && <p className="reserved-msg">Already reserved</p>}
          {isOwner && <p className="owner-msg">This is your meal</p>}
        </div>
      </div>
    </div>
  );
}

export default MealDetail;
