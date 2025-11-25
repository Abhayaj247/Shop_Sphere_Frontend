# 🛍️ ShopSphere Frontend

This repository contains the frontend application for **ShopSphere**, a full-featured e-commerce platform. It provides an intuitive, responsive, and role-based user interface for both customers and administrators.

---

## ✨ Features

The ShopSphere frontend is structured to provide distinct experiences for different user roles:

### Customer Features
* **Authentication & Authorization:** Secure Login and Registration for `CUSTOMER` users.
* **Product Discovery:** View a catalog of products.
* **Advanced Filtering:** Search, filter by category (e.g., Shirts, Mobiles), sort (price/name), and filter by price range.
* **Shopping Cart:** Dedicated cart sidebar to view, update quantity, and delete cart items.
* **Secure Checkout:** Integrated Razorpay for secure payment processing.
* **Order History:** View past orders including product details, quantity, and total price.
* **UI/UX:** Dark Mode functionality and a visually appealing, responsive layout.

### Admin Features
* **Admin Login:** Separate protected login route for `ADMIN` users.
* **Product Management:** Add new products and delete existing products from the catalog.
* **User Management:** Modify user details (username, email, role) and view user profiles by ID.
* **Business Intelligence:** Fetch detailed business reports:
    * Monthly Business (by month/year).
    * Daily Business (by date).
    * Yearly Business (by year).
    * Overall Business (total revenue).

---

## 💻 Tech Stack

The ShopSphere Frontend is built with the following technologies:

* **Framework:** React 19.
* **Language:** TypeScript.
* **Tooling:** Vite.
* **Styling:** Tailwind CSS (configured with a custom dark mode variant).
* **Routing:** React Router DOM (v7).
* **HTTP Client:** Axios.
* **Icons:** Lucide React.

---

## ⚙️ Prerequisites

Before running the application, ensure you have the following installed:

* Node.js (LTS recommended)
* The **ShopSphere Backend** API running at `http://localhost:8080`.

---

## 🛠️ Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Abhayaj247/Shop_Sphere_Frontend.git]
    cd shop-sphere-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables:**

    Create a file named **`.env.local`** in the root directory (or simply **`.env`** if you don't mind committing it, noting it is ignored by `.gitignore`).

    Copy the content from `.env.example` and replace the placeholder with your **Razorpay Key ID**.

    **`.env.local`**
    ```
    VITE_RAZORPAY_KEY_ID=your_razorpay_key_id_here
    ```

---

## 🚀 Running the Project

Use the development script defined in `package.json`:

```bash
npm run dev
# or
yarn dev