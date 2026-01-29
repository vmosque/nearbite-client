import { useEffect, useState, useContext } from "react";
import axios from "axios";
import MealCard from "../components/MealCard";
import { AuthContext } from "../context/AuthContext";
import "../css/Meals.css";
import "../css/PageLayout.css";

const API_URL = import.meta.env.VITE_API_URL;

function Meals() {
  const [meals, setMeals] = useState([]);
  const { user, isLoading } = useContext(AuthContext);

  const getMeals = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/meals`);
      setMeals(response.data);
    } catch (error) {
      console.error("Error fetching meals", error);
    }
  };

  useEffect(() => {
    getMeals();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="page-layout">
      <h1>Available Meals</h1>

      <div className="meals-grid">
        {meals.map((meal) => (
          <MealCard
            key={meal._id}
            meal={meal}
            refreshMeals={getMeals}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}

export default Meals;
