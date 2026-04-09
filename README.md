# 🛒 E-Commerce Web Application

A full-stack E-Commerce web application built using **React (Vite)** for the frontend and **Django REST Framework** for the backend, with **MySQL** as the database.

This project demonstrates a real-world scalable architecture with API integration, authentication-ready structure, and modern UI design.

---

## 🚀 Tech Stack

### 🔹 Frontend

* React (Vite)   
* React Router DOM
* Tailwind CSS
* Fetch API (for backend communication)

### 🔹 Backend

* Django
* Django REST Framework (DRF)
* MySQL Database
* Django Admin Panel

---

## ✨ Features

* 📦 Product listing with image, description, and price
* 🗂️ Category-based product organization
* 🛒 Add to Cart functionality (API synced)
* 🔄 Real-time cart updates using Fetch API
* 👤 User Profile structure
* 📑 Order & Order Items management
* 🔗 REST API integration between frontend and backend
* 🌐 CORS enabled for cross-origin communication
* ⚙️ Admin panel to manage products, categories, and orders

---

## 🧠 Backend Structure

### Models Used:

* Category
* Product
* User Profile
* Order
* Order Item

### Key Features:

* DRF Serializers for all models
* RESTful API endpoints
* MySQL database integration
* Django Admin used to add and manage sample data

---

## 🎨 Frontend Features

* Responsive UI using Tailwind CSS
* React Router for navigation
* Organized folder structure:

  * `components/`
  * `pages/`
  * `context/`
  * `assets/`
* API integration using Fetch
* Dynamic rendering of products

---

## 🔗 API Integration

* Backend APIs are consumed using Fetch API
* Cart operations (Add/Update/Remove) synced with backend
* CORS enabled to allow communication between React and Django

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/ecommerce-project.git
cd ecommerce-project
```

---

### 2️⃣ Backend Setup (Django)

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # On Windows

pip install -r requirements.txt
```

#### Configure MySQL in `settings.py`

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'your_db_name',
        'USER': 'your_username',
        'PASSWORD': 'your_password',
    }
}
```

#### Run migrations & server

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

---

### 3️⃣ Frontend Setup (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create `.env` files in both frontend and backend if needed:

### Example:

```
API_URL=http://127.0.0.1:8000/api/
```

## 📌 Future Improvements

* 🔐 User Authentication (JWT)
* 💳 Payment Gateway Integration
* 📦 Order Tracking System
* ❤️ Wishlist Feature
* 🔍 Search & Filters
* 📊 Admin Dashboard Analytics

---

## 🤝 Contributing

Feel free to fork this repository and improve the project. Contributions are welcome!

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 👩‍💻 Author

**Riya Priyadarsani Sahu**

---

## ⭐ Support

If you like this project, please ⭐ the repository and share it!
