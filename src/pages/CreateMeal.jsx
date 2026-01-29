import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/CreateMeal.css";

const API_URL = import.meta.env.VITE_API_URL;
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET;

function CreateMeal() {
  const navigate = useNavigate();
  const [imageUploading, setImageUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    portions: 1,
    expiresAt: "",
    pickupFrom: "",
    pickupTo: "",
    location: "",
    dietary: [],
    allergens: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e, field) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageUploading(true);

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        uploadData,
      );

      setFormData((prev) => ({
        ...prev,
        image: res.data.secure_url,
      }));
    } catch (err) {
      alert("Image upload failed");
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    try {
      await axios.post(`${API_URL}/api/meals`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/meals");
    } catch (err) {
      alert("Could not create meal");
    }
  };

  return (
    <div className="create-meal-page">
      <form className="create-meal-card" onSubmit={handleSubmit}>
        <h1>Post a new meal</h1>
        <p className="subtitle">Share food with people nearby</p>

        <label>Meal title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Meal image</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {imageUploading && <p>Uploading image...</p>}
        {formData.image && <img src={formData.image} className="preview" />}

        <div className="row">
          <div>
            <label>Portions</label>
            <input
              type="number"
              min="1"
              name="portions"
              value={formData.portions}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Expires at</label>
            <input
              type="datetime-local"
              name="expiresAt"
              value={formData.expiresAt}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <label>Pickup time</label>
        <div className="row">
          <input
            placeholder="From"
            name="pickupFrom"
            value={formData.pickupFrom}
            onChange={handleChange}
          />
          <input
            placeholder="To"
            name="pickupTo"
            value={formData.pickupTo}
            onChange={handleChange}
          />
        </div>

        <label>Location</label>
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        {formData.location && (
          <iframe
            title="map"
            className="map-preview"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              formData.location,
            )}&output=embed`}
            loading="lazy"
          />
        )}

        <label>Dietary</label>
        <div className="checkbox-group">
          {["vegetarian", "vegan", "gluten-free"].map((item) => (
            <label key={item}>
              <input
                type="checkbox"
                value={item}
                onChange={(e) => handleCheckbox(e, "dietary")}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>

        <label>Allergens</label>
        <div className="checkbox-group">
          {["nuts", "dairy", "eggs"].map((item) => (
            <label key={item}>
              <input
                type="checkbox"
                value={item}
                onChange={(e) => handleCheckbox(e, "allergens")}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>

        <button className="submit-btn">Create meal</button>
      </form>
    </div>
  );
}

export default CreateMeal;
