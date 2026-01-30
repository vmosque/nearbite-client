🥗 NearBite

NearBite is a full-stack web application designed to reduce food waste by allowing people to share surplus homemade meals with others nearby.

Users can post meals they have cooked, set pickup details, and allow other users to reserve them. The platform encourages sustainability, community support, and responsible food consumption.

🚀 Live Demo

👉 Deployed App:
https://nearbite.netlify.app/

👉 Backend API:
https://nearbite-server-1zjj.onrender.com

📂 Repositories

Frontend (React):
https://github.com/vmosque/nearbite-client

Backend (Node / Express):
https://github.com/vmosque/nearbite-server

🧠 Concept & Motivation

Food waste is a global issue, and many people cook more food than they can consume. At the same time, people nearby could benefit from that food.

NearBite aims to solve this by providing a simple and intuitive platform to:

Share surplus meals

Connect neighbors locally

Reduce unnecessary food waste

Promote community-driven solutions

Features
👤 Authentication

User signup & login

JWT-based authentication

Protected routes

🍽 Meals

Create a new meal

Upload meal images (Cloudinary)

Set pickup time, expiration date, location

Add dietary preferences and allergens

📍 Location

Address-based location

Google Maps preview for meal pickup point

🔎 Browse & Reserve

View available meals

See detailed meal information

Reserve meals (if available)

Prevent owners from reserving their own meals

📦 Reservations

My Reservations: view and cancel reserved meals

Reservations on My Meals: see who reserved your meals

Dynamic updates after actions (no refresh needed)

🛠 Tech Stack
Frontend

React

React Router

Axios

CSS (custom styling)

Netlify (deployment)

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Cloudinary (image upload)

Render (deployment)

📐 Application Structure
Frontend Pages

Home

Meals (available meals)

Meal Detail

Create Meal

My Reservations

Reservations on My Meals

Backend Models

User

Meal

Reservation

🧩 Future Improvements

Pagination & filters for meals

User profile page

Notifications system

Map-based meal discovery

Admin moderation tools

👨‍💻 Author

Víctor Mosqueda
Full Stack Web Developer
Ironhack Web Development Bootcamp

📄 License

This project is for educational purposes as part of the Ironhack Web Development Bootcamp.

⭐ Final Notes

NearBite is a complete MERN-stack application that demonstrates:

Full CRUD operations

Authentication & authorization

Third-party services integration

Real-world use case

Clean UI and structured architecture

Feedback and suggestions are always welcome.
