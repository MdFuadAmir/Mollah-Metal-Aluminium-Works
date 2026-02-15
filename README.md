# MMAW - MERN Multivendor E-commerce Platform

---

## **Project Overview**

**MMAW** is a full-featured **multivendor e-commerce platform** built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js) and **Firebase Authentication**.  
It supports **user, moderator, and admin roles**, allowing users to browse and purchase products, leave reviews, and admins/moderators to manage the platform.  

Key highlights:

- Real-time authentication with **Firebase**.
- **Role-based access control** for users, moderators, and admins.
- Secure API requests using **JWT tokens**.
- Dynamic product reviews with aggregation of **ratings**.
- Analytics dashboards for admins (orders, revenue, stats).
- Fully responsive frontend using **React** and **Tailwind CSS**.

---

## **Tech Stack**

| Layer         | Technology / Libraries                         |
|---------------|-----------------------------------------------|
| Frontend      | React, Tailwind CSS, React Router, React Query, React Hook Form |
| Backend       | Node.js, Express.js, MongoDB                  |
| Authentication| Firebase Authentication + JWT                 |
| HTTP Client   | Axios, Axios Secure (with Firebase token)    |
| Notifications | react-hot-toast                               |
| Versioning    | Git & GitHub                                  |
| Environment   | dotenv                                        |

---

## **Features**

### User Features
- User registration and login (email/password + Google sign-in)
- Profile management (update name, address, phone, photo)
- Browse products by category/subcategory
- Add to cart and place orders
- Review products (rating + comment)
- Secure endpoints with **JWT authentication**

### Admin Features
- View platform analytics (total users, moderators, products, revenue)
- Recent orders and order stats
- Revenue tracking by month
- Full access to manage products, users, and orders
- Secure admin-only routes using `verifyToken` + `verifyAdmin` middleware

### Moderator Features
- Manage orders assigned to moderators
- Moderate reviews and content
- Limited access to admin dashboards (via `verifyModerator` middleware)

### Backend Features
- Role-based access control middleware (`verifyToken`, `verifyAdmin`, `verifyModerator`)
- Secure product and order APIs
- Aggregated product ratings
- JWT-based secure endpoints for sensitive actions
- MongoDB aggregation pipelines for analytics

---

## **Project Structure**
MMAW-Server/
├─ src/
│ ├─ DB/
│ │ └─ db.js # MongoDB collections
│ ├─ Middlewares/
│ │ ├─ verifyToken.js # Firebase JWT verification
│ │ ├─ verifyAdmin.js # Admin role verification
│ │ └─ verifyModerator.js# Moderator role verification
│ ├─ Models/
│ │ ├─ Profile.js # Profile APIs
│ │ ├─ Users.js # User APIs
│ │ └─ Products.js # Product & review APIs
│ ├─ firebaseAdmin.js # Firebase admin initialization
│ └─ index.js # Server entry
├─ client/
│ ├─ src/
│ │ ├─ Components/
│ │ ├─ Hooks/
│ │ │ ├─ useAxios.js
│ │ │ └─ useAxiosSecure.js
│ │ ├─ Pages/
│ │ └─ AuthProvider.js
├─ .env
├─ package.json
└─ README.md


---



---

If you want, I can also **add extra shields for Firebase, MongoDB, and Node versions** so your README looks very modern and visually appealing.  

Do you want me to do that next?

