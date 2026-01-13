# Internship Task – Quiz Application & Course API

## 📌 Overview
This project was built as part of an internship technical task.  
It consists of:

- A **frontend quiz application** built using HTML, CSS, and JavaScript.
- A **backend REST API** built using Node.js and Express to manage courses and track user progress.

The focus of this task was correctness, clarity, edge-case handling, and clean architecture rather than overengineering.

---

## 🧑‍💻 Tech Stack

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript

### Backend
- Node.js
- Express.js
- In-memory data storage
- API key–based authentication

---

## 🎯 Frontend Features

- Multiple-choice quiz (one question at a time)
- Questions stored in a JavaScript array
- Progress bar (Question X / Total)
- Immediate feedback (correct / incorrect highlighting)
- Next & Previous navigation
- Final score summary
- Progress persistence using `localStorage`
- Responsive layout (mobile & desktop)
- Basic accessibility support (`aria-live`, keyboard friendly)

---

## 🚀 Backend Features

- Create and fetch courses
- Lessons included inside courses
- Track user progress per course
- Store completed lessons and quiz scores
- API key authentication middleware
- Input validation
- Proper error handling (400, 401, 404)

---

## 📁 Project Structure
InternshipTask/
│
├── frontend/
│ ├── index.html
│ ├── style.css
│ └── script.js
│
├── backend/
│ ├── index.js
│ ├── data.js
│ ├── middleware/
│ │ └── auth.js
│ ├── package.json
│ └── package-lock.json
│
└── README.md

---

## ▶️ How to Run the Project

### Frontend
Simply open:in your browser.

---

### Backend
Navigate to the backend folder and run:

```bash
npm install
node index.js

The server runs at:

http://localhost:5001
