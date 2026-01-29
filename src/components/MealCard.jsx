import axios from "axios";
import { Link } from "react-router-dom";
import "../css/MealCard.css";

const API_URL = import.meta.env.VITE_API_URL;

function MealCard({ meal, refreshMeals, user }) {
  const isOwner = user && meal.owner?._id === user._id;

  const handleReserve = async () => {
    try {
      const token = localStorage.getItem("authToken");

      await axios.post(
        `${API_URL}/api/reservations/${meal._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      refreshMeals();
    } catch (error) {
      alert("Could not reserve meal");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this meal?",
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("authToken");

      await axios.delete(`${API_URL}/api/meals/${meal._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      refreshMeals();
    } catch (error) {
      alert("Could not delete meal");
    }
  };

  return (
    <div className="meal-card">
      {isOwner && (
        <button className="delete-btn" onClick={handleDelete}>
          ✕
        </button>
      )}

      <Link to={`/meals/${meal._id}`} className="meal-link">
        <img
          src={
            meal.image ||
            "https://theme-assets.getbento.com/sensei/71bd0c7.sensei/assets/images/catering-item-placeholder-704x520.png"
          }
          alt={meal.title}
          className="meal-image"
        />
      </Link>

      <div className="meal-content">
        <h3>{meal.title}</h3>
        <p>{meal.description}</p>
        <p>🍽 {meal.portions} portions</p>

        {!isOwner && meal.status === "available" && (
          <div className="meal-footer">
            <button onClick={handleReserve}>Reserve</button>
          </div>
        )}

        {meal.status === "reserved" && <p>❌ Reserved</p>}
        {isOwner && <p>👤 Your meal</p>}
      </div>
    </div>
  );
}

export default MealCard;
