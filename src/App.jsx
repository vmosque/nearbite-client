import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Meals from "./pages/Meals";
import CreateMeal from "./pages/CreateMeal";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import Footer from "./components/Footer";
import MyReservations from "./pages/MyReservations";
import MyMealReservations from "./pages/MyMealReservations";
import MealDetail from "./pages/MealDetail";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="page">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/meals/:mealId" element={<MealDetail />} />
          <Route
            path="/meals/create"
            element={
              <ProtectedRoute>
                <CreateMeal />
              </ProtectedRoute>
            }
          />
          <Route path="/my-reservations" element={<MyReservations />} />
          <Route
            path="/my-meal-reservations"
            element={<MyMealReservations />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
