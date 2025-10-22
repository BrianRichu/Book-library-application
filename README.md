# 📚 Book Library Application

A responsive web application built with **React**, **Vite**, and **Tailwind CSS** that allows users to **search for books**, **view details**, and **explore information** using the **Google Books API**.

---

## 🚀 Project Overview

The **Book Library Application** enables users to:

- Search for books by title, author, or keyword  
- View book details such as cover, title, author, publication date, and description  
- Access links to the full book on Google Books  
- Enjoy a clean, responsive UI accessible on any device  

The app is built as part of a **5-week learning project**, with weekly goals and commits tracked for continuous progress.

---

## 🗂️ Project Structure

```
src/
├── pages/
│   ├── Home.jsx              # Figma-style landing page
│   ├── BookList.jsx          # Existing list of books 
│   └── BookDetails.jsx       # Existing book details page
│
├── components/
│   ├── Navbar.jsx
│   ├── SearchBar.jsx
│   ├── TopBooks.jsx
│   ├── Categories.jsx
│   ├── BookCard.jsx
│
└── services/
    └── bookService.js

│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

---

## 🧩 Core Features

### 🔍 Search Functionality
Users can search for books by title, author, or keywords using the Google Books API.

### 📖 Book List Display
Search results include book covers, titles, and authors in a responsive grid layout.

### 📘 Book Details View
Detailed information is displayed for each book, including:
- Book cover
- Title and author(s)
- Description/summary
- Publication date
- Google Books link

### 🧠 API Integration
Data is fetched using the **Google Books API**:
```
https://www.googleapis.com/books/v1/volumes?q={searchTerm}
```
No authentication required for basic requests.

### 💅 Responsive Design
Styled with **Tailwind CSS** for a modern, mobile-friendly user experience.


## 🧰 Tech Stack

| Technology | Purpose |
|-------------|----------|
| React (Vite) | Frontend Framework |
| Tailwind CSS | Styling & Responsiveness |
| Google Books API | Book Data Source |
| React Router DOM | Navigation between pages |
| Google Chrome| Deployment Platform |

---

## 🏗️ Development Plan

| Week | Milestone | Description |
|------|------------|-------------|
| 1 | **Project Setup** | Initialize React + Tailwind project, structure folders, test API |
| 2 | **Core Search Functionality** | Build `SearchBar` and connect to API |
| 3 | **Book List & UI Enhancements** | Add `BookList` and `BookCard` with responsive layout |
| 4 | **Book Details Page** | Add routing and `BookDetails` component |
| 5 | **Final Touches & Deployment** | Optimize, test, and deploy the app |

---

## 🧑‍💻 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/book-library.git
cd book-library
```

### 2️⃣ Install Dependencies
```bash
npm install

```

### 3️⃣ Run the Development Server
```bash
npm run dev
```

Visit **http://localhost:5173** to view the app.

---

## 🧾 Example API Service

```javascript
// src/services/bookService.js
export const fetchBooks = async (query) => {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}`
  );
  const data = await response.json();
  return data.items || [];
};



## 💡 Author

**Brian Richu**  
💼 FrontEnd Web Developer | 🌍 Nairobi, Kenya  
🎯 Mission: *To become the best in what I do, living with integrity, fostering love and compassion, and holding myself accountable for creating positive change.*

---


