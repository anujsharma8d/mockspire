# Mockspire

> AI-powered mock interviews to help you practice, analyze, and improve your interview performance.

Mockspire is an AI-powered interview preparation platform that simulates realistic interviews and delivers personalized feedback on your performance. It helps users practice interview questions, understand their strengths, identify areas for improvement, and build confidence before real interviews.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [How It Works](#how-it-works)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Interview Insights](#interview-insights)
- [Who Is Mockspire For?](#who-is-mockspire-for)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Features

### AI-Powered Interviews
Generate personalized interview questions based on:
- Job role
- Interview type
- Difficulty level

### Realistic Interview Practice
Practice interviews in a structured environment designed to simulate a real interview experience.

### Performance Analysis
Get detailed feedback after completing an interview, including performance scores and insights.

### Core Strengths
Understand the areas where you performed well during your interview.

### Focus Areas
Identify areas that need improvement and understand what to work on next.

### Performance Tracking
Review your previous interview results and track your progress over time.

### User Authentication
Secure account management with:
- Sign up
- Login
- Protected routes
- JWT authentication

### Responsive UI
Mockspire is designed to work seamlessly across:
- Desktop
- Tablet
- Mobile

---

## Tech Stack

**Frontend**
- React
- React Router
- Tailwind CSS
- Lucide React
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

**AI**
- AI-powered question generation
- AI-powered answer evaluation
- Performance analysis
- Personalized interview insights

---

## Architecture

```text
                    ┌───────────────────┐
                    │      React        │
                    │     Frontend      │
                    └─────────┬─────────┘
                              │
                              │ REST API
                              ▼
                    ┌───────────────────┐
                    │     Express.js    │
                    │      Backend      │
                    └───────┬─────┬─────┘
                            │     │
                ┌───────────┘     └───────────┐
                ▼                             ▼
       ┌─────────────────┐          ┌─────────────────┐
       │     MongoDB     │          │       AI        │
       │     Database    │          │     Services    │
       └─────────────────┘          └─────────────────┘
```

---

## How It Works

1. Create an account
2. Choose an interview
3. AI generates questions
4. Take the interview
5. AI analyzes your responses
6. View your results
7. Review Core Strengths & Focus Areas
8. Improve and practice again

---

## Project Structure

```text
Mockspire/
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

Make sure you have installed:
- [Node.js](https://nodejs.org/)
- npm
- [MongoDB](https://www.mongodb.com/)

### Clone the Repository

```bash
git clone https://github.com/anujsharma8d/mockspire
cd mockspire
```

### Installation

**Frontend**
```bash
cd client
npm install
```

**Backend**

Open another terminal:
```bash
cd server
npm install
```

---

## Environment Variables

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000
```

Create a `.env` file inside the `backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

> Add your own values to the environment variables.
> **Do not commit `.env` to GitHub.**

---

## Running the Application

**Start Backend**
```bash
cd server
npm run dev
```
The backend will run on: `http://localhost:5000`

**Start Frontend**

In another terminal:
```bash
cd client
npm run dev
```
The frontend will run on the Vite development server.

---

## Interview Insights

After completing an interview, Mockspire provides a detailed performance breakdown:

| Insight | Description |
|---|---|
| Performance Score | Understand your overall interview performance. |
| Core Strengths | See the areas where you demonstrated strong performance. |
| Focus Areas | Identify specific areas that require more practice. |
| Detailed Feedback | Understand what you did well and what could be improved. |

---

## Who Is Mockspire For?

Mockspire is designed for people preparing for:
- Technical interviews
- HR interviews
- Behavioral interviews
- Software engineering interviews
- Job placements
- Career transitions

---

## Future Improvements

Planned improvements may include:
- Voice-based interviews
- Speech analysis
- Video interview practice
- Resume-based interview generation
- More detailed performance analytics
- Personalized preparation plans
- Multiple interview languages

---

## Contributing

Contributions are welcome.

1. Fork the repository
   ```bash
   git fork https://github.com/anujsharma8d/mockspire
   ```
2. Create a branch
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes
   ```bash
   git add .
   git commit -m "feat: add your feature"
   ```
4. Push the branch
   ```bash
   git push origin feature/your-feature
   ```
5. Open a Pull Request

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Author

Anuj Sharma

Built with MERN Stack.

---

## Support

If you find Mockspire useful, consider giving the repository a ⭐.
