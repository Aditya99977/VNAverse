<p align="center">
  <img src="frontend/public/logo.png" alt="VNAverse Logo" width="220">
</p>

<h1 align="center">VNAverse</h1>

<p align="center">
<strong>Vision Nexus Academy</strong>
</p>

<p align="center">
<i>Where Vision Meets Knowledge</i>
</p>

<p align="center">

An Intelligent Learning Platform Built for the Next Generation of Competitive Exam Preparation.

</p>

<p align="center">

<img src="https://img.shields.io/badge/Status-Beta%20Development-2563EB?style=for-the-badge">

<img src="https://img.shields.io/badge/Version-V2-22C55E?style=for-the-badge">

<img src="https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=for-the-badge">

<img src="https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?style=for-the-badge">

<img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge">

<img src="https://img.shields.io/badge/Architecture-Service%20Layer-orange?style=for-the-badge">

</p>

---

# 🚀 About VNAverse

**VNAverse (Vision Nexus Academy)** is a modern learning ecosystem designed to help students prepare for competitive examinations through personalized learning experiences, structured practice, intelligent analytics, and scalable educational technology.

Unlike traditional exam preparation platforms that simply provide question banks, VNAverse is being built as a **production-ready SaaS platform** where every module is designed with scalability, maintainability, and long-term growth in mind.

The first flagship product focuses on **Government Exam Preparation**, providing students with an organized environment to practice, analyze their progress, and improve consistently.

The long-term vision extends far beyond government examinations, evolving VNAverse into a complete AI-powered learning ecosystem for students, professionals, and lifelong learners.

---

# 🌍 Vision

> **Where Vision Meets Knowledge**

Our mission is to create an education platform where technology empowers every learner to unlock their full potential.

We believe learning should be:

- 🎯 Personalized
- 🧠 Intelligent
- 📈 Data Driven
- 🌍 Accessible
- ⚡ Scalable
- 💙 Affordable

Every feature developed in VNAverse is aligned with this philosophy.

---

# ⭐ Why VNAverse?

Most online learning platforms stop after providing content.

VNAverse aims to become an intelligent ecosystem that understands how students learn and continuously helps them improve.

Instead of only asking:

> "What should I study?"

VNAverse will eventually answer:

- What should I study today?
- Which subject needs improvement?
- Which topic is reducing my score?
- How much progress have I made?
- Which exam should I prioritize?
- What is my probability of clearing the exam?

This shift from **content delivery** to **intelligent learning assistance** is what makes VNAverse different.

---

# 🎯 Current Beta Objectives

The current Beta focuses on building a strong production-ready foundation before introducing AI-powered features.

Current priorities include:

- Secure Authentication
- Personalized Dashboards
- Exam Selection
- Practice System
- Mock Tests
- Previous Year Papers
- Performance Analytics
- Production Admin Panel
- Scalable Backend Architecture

Artificial Intelligence features are planned after the beta foundation is complete.

---

# ✨ Core Principles

VNAverse is being developed around six engineering principles.

### 🔹 Scalability

Every module is designed to support thousands of concurrent users without requiring architectural rewrites.

---

### 🔹 Maintainability

The codebase follows clean architecture principles with modular components and reusable services.

---

### 🔹 Security

Security is treated as a core feature rather than an afterthought.

Current implementation includes:

- JWT Authentication
- Password Hashing
- Protected Routes
- Role-Based Authorization
- Input Validation
- Centralized Error Handling

---

### 🔹 Performance

The platform emphasizes fast APIs, optimized frontend rendering, reusable components, and efficient database operations.

---

### 🔹 User Experience

Every interface is designed with a premium SaaS philosophy inspired by products such as:

- Notion
- Stripe
- Vercel
- Linear
- Framer

The goal is to keep the interface modern, spacious, intuitive, and distraction-free.

---

### 🔹 Long-Term Growth

VNAverse is not being developed as a college project.

It is being built as a long-term startup capable of evolving into a complete education technology platform.

---# ✨ Current Features

## 👨‍🎓 Student Module

VNAverse currently provides a complete learning environment for students preparing for competitive examinations.

### Authentication

- Secure Registration
- Secure Login
- JWT Authentication
- Protected Routes
- Persistent Sessions

---

### Personalized Dashboard

- Personalized Welcome Screen
- Performance Overview
- Recent Activity
- Exam Progress
- Quick Navigation
- Learning Statistics

---

### Practice System

- Subject-wise Practice
- Difficulty-based Questions
- Instant Evaluation
- Performance Tracking
- Detailed Results

---

### Mock Test Module

- Full-Length Mock Tests
- Subject-wise Mock Tests
- Timer Support
- Score Calculation
- Result Summary
- Test History

---

### Previous Year Papers

- Organized Paper Library
- Exam-wise Papers
- Subject-wise Papers
- Quick Access
- Download Support (Planned)

---

### Performance Analytics

- Progress Tracking
- Score Analysis
- Subject Performance
- Overall Statistics
- Improvement Insights

---

## 👨‍💼 Admin Module

The admin panel is currently being migrated to the new production architecture.

Current modules include:

### Dashboard

- Platform Overview
- User Statistics
- Question Statistics
- Recent Activity
- Quick Insights

---

### User Management

- View Users
- Manage User Accounts
- Role Management
- Status Management

---

### Exam Management

- Create Exams
- Update Exams
- Archive Exams
- Subject Assignment

---

### Subject Management

- Create Subjects
- Edit Subjects
- Delete Subjects
- Exam Mapping

---

### Question Management

- CRUD Operations
- Bulk Upload
- Difficulty Levels
- Subject Mapping
- Validation

---

### Mock Test Management

- Create Mock Tests
- Edit Mock Tests
- Publish / Unpublish
- Delete Mock Tests
- CSV Question Upload

---

### Previous Year Paper Management

- Upload Papers
- Manage Papers
- Organize by Exam
- Archive Papers

---

# 🏗 System Architecture

VNAverse follows a layered architecture to improve scalability, maintainability, and long-term growth.

```text
                 React + Vite
                       │
                 Axios Services
                       │
                Express Routes
                       │
                  Controllers
                       │
                 Service Layer
                       │
       ┌───────────────┼───────────────┐
       ▼               ▼               ▼
   Mongoose        Utilities      Validation
       │
       ▼
  MongoDB Atlas
  # 📂 Project Structure

The project follows a scalable folder structure to keep business logic, UI components, and services modular.

```text
VNAverse
│
├── backend
│   │
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   ├── validators
│   ├── uploads
│   ├── seeder
│   ├── server.js
│   └── package.json
│
├── frontend
│   │
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── layouts
│   │   ├── pages
│   │   ├── services
│   │   ├── styles
│   │   ├── utils
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── docs
│
├── README.md
│
└── .gitignore
# 🚀 Future Roadmap

VNAverse is designed as a long-term education platform. The current Beta focuses on building a strong technical foundation before expanding into AI-powered learning experiences.

## 📅 Phase 1 — Beta Foundation

- ✅ Authentication System
- ✅ Role-Based Access Control
- ✅ Student Dashboard
- ✅ Admin Dashboard
- ✅ Exam Management
- ✅ Subject Management
- ✅ Question Bank
- ✅ Practice Module
- ✅ Mock Test Module
- ✅ Previous Year Papers
- ✅ Performance Analytics
- 🚧 Admin Panel Refactor
- 🚧 Production UI Refinement

---

## 📅 Phase 2 — Smart Learning

- Personalized Dashboard
- AI Study Recommendations
- Adaptive Practice Sessions
- Weak Topic Identification
- Smart Subject Suggestions
- Intelligent Progress Tracking
- Exam Readiness Score
- Learning Streaks

---

## 📅 Phase 3 — AI Ecosystem

- AI Tutor
- AI Doubt Resolution
- AI Performance Analysis
- AI Study Planner
- AI Question Generation
- AI Revision Plans
- AI Interview Preparation

---

## 📅 Phase 4 — Platform Expansion

- Resume Builder
- Career Guidance
- Coding Preparation
- Aptitude Practice
- Placement Preparation
- Multi-language Support
- Mobile Applications
- Subscription Platform

---

# 📖 Documentation

Project documentation is maintained inside the **docs/** directory.

Documentation includes:

- Daily Development Logs
- Architecture Notes
- API Planning
- Feature Documentation
- UI Planning
- Roadmaps
- Development Decisions

---

# 🧪 Development Philosophy

VNAverse follows a production-first development approach.

Every feature is designed with the following priorities:

- Clean Architecture
- Scalability
- Maintainability
- Security
- Reusability
- Performance
- User Experience

The goal is to build software that can evolve over time without major architectural rewrites.

---

# 🤝 Contributing

Contributions are always welcome.

If you'd like to contribute:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push your branch.
5. Open a Pull Request.

Please ensure that all contributions follow the existing project architecture and coding standards.

---

# 👨‍💻 Developer

## Aditya Thakur

Founder & Developer of **VNAverse**

Building an intelligent education platform focused on creating better learning experiences through modern software engineering.

### Connect

**GitHub**

https://github.com/Aditya99977

**LinkedIn**

https://www.linkedin.com/in/aditya-thakur-67745141a/

---

# 📊 Project Status

| Module | Status |
|---------|--------|
| Authentication | ✅ Complete |
| Student Module | ✅ Complete |
| Admin Module | 🚧 Refactoring |
| Practice System | ✅ Complete |
| Mock Test Module | 🚧 Production Migration |
| Previous Year Papers | ✅ Complete |
| Performance Analytics | ✅ Complete |
| Backend Refactor | ✅ Complete |
| Frontend Refactor | 🚧 In Progress |
| Beta Stabilization | 🚧 In Progress |

---

# 🎯 Current Goal

The immediate goal is to complete the production refactor of the Admin Panel while keeping the backend architecture stable.

Once the Beta reaches feature parity with the production backend, development will shift toward intelligent learning capabilities and public beta preparation.

---

# 💙 Built With

- React
- Vite
- Node.js
- Express.js
- MongoDB
- JavaScript
- Bootstrap
- Lucide React

Built with passion, curiosity, and a commitment to creating a better learning experience.

---

# 📄 License

Copyright © 2026 Aditya Thakur.

This project is currently under active development.

The source code is intended for learning, portfolio demonstration, and the ongoing development of the VNAverse platform. Licensing terms may be updated as the project evolves toward public release.

---

# ⭐ Support the Project

If you found this project interesting, consider giving the repository a **Star**.

Your support helps motivate continued development and future improvements.

---

<p align="center">

### **VNAverse**

**Vision Nexus Academy**

**Where Vision Meets Knowledge**

Learn • Practice • Analyze • Improve

🚀 Building the Future of Intelligent Learning

</p>