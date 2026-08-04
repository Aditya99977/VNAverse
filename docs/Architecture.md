# VNAverse Architecture

## Version

V2 Production Architecture

---

# Introduction

This document describes the overall architecture of the VNAverse platform.

VNAverse is designed using a layered, production-oriented architecture that emphasizes scalability, maintainability, security, and modularity.

Unlike the initial prototype, the V2 architecture separates business logic from controllers through a dedicated service layer, making the application easier to extend and maintain as new features are introduced.

The platform is being developed as a long-term SaaS product rather than a traditional academic project.

---

# Architecture Philosophy

The architecture is designed around the following engineering principles.

- Clean Architecture
- Separation of Concerns
- Reusable Components
- Modular Services
- Centralized Error Handling
- Secure Authentication
- Scalable APIs
- Maintainable Codebase

Each layer of the application has a single responsibility, reducing coupling between modules and improving long-term maintainability.

---

# High-Level Architecture

```text
                    Client Browser
                          │
                          ▼
                   React + Vite
                          │
                    Axios Services
                          │
                    Express Routes
                          │
              Authentication Middleware
                          │
               Authorization Middleware
                          │
                     Controllers
                          │
                    Service Layer
                          │
      ┌───────────────────┼───────────────────┐
      ▼                   ▼                   ▼
 Validators            Utilities          Mongoose Models
                                                  │
                                                  ▼
                                            MongoDB Atlas
```

---

# Request Lifecycle

Every request inside VNAverse follows the same processing pipeline.

```text
Client Request
      │
      ▼
React Component
      │
      ▼
Frontend Service
      │
      ▼
Axios Request
      │
      ▼
Express Route
      │
      ▼
Authentication Middleware
      │
      ▼
Authorization Middleware
      │
      ▼
Controller
      │
      ▼
Business Service
      │
      ▼
Database Model
      │
      ▼
MongoDB
      │
      ▼
ApiResponse
      │
      ▼
Frontend UI
```

This standardized flow ensures consistency across every API endpoint.

---

# Backend Architecture

The backend follows a layered architecture where each layer performs a specific responsibility.

```text
Routes
   │
Controllers
   │
Services
   │
Models
   │
MongoDB
```

### Responsibilities

### Routes

Routes define the application's REST API endpoints and forward requests to the appropriate controllers.

Responsibilities:

- URL Mapping
- Route Protection
- Middleware Registration
- Endpoint Organization

---

### Controllers

Controllers act as the interface between HTTP requests and business logic.

Responsibilities:

- Receive Requests
- Validate Input
- Call Services
- Return Standardized Responses

Controllers never contain complex business logic.

---

### Services

The Service Layer contains all business logic.

Responsibilities:

- Business Rules
- Database Operations
- Data Processing
- Validation Coordination
- Reusable Logic

This layer allows controllers to remain small and focused.

---

### Models

Models define MongoDB schemas using Mongoose.

Responsibilities:

- Database Schema
- Relationships
- Indexes
- Query Methods

Models never contain request-handling logic.

---

### Utilities

Utility modules provide reusable helper functions used throughout the application.

Examples include:

- ApiResponse
- Async Handler
- Error Utilities
- Common Helpers

---

### Validators

Validators ensure incoming data is valid before business logic is executed.

Responsibilities:

- Input Validation
- Request Validation
- Schema Validation
- Error Generation

---

### Middleware

Middleware executes before controllers.

Current middleware includes:

- JWT Authentication
- Admin Authorization
- Upload Middleware
- Global Error Handling
- Request Validation

---

# Backend Project Structure

The backend follows a modular architecture where every directory has a dedicated responsibility.

```text
backend
│
├── controllers
│   ├── AdminController.js
│   ├── AuthController.js
│   ├── ExamController.js
│   ├── MockTestController.js
│   ├── PaperController.js
│   ├── PracticeController.js
│   ├── ProfileController.js
│   ├── QuestionController.js
│   └── SubjectController.js
│
├── middleware
│   ├── adminMiddleware.js
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   └── uploadMiddleware.js
│
├── models
│   ├── Exam.js
│   ├── MockTest.js
│   ├── MockTestAttempt.js
│   ├── Paper.js
│   ├── Question.js
│   ├── Subject.js
│   └── User.js
│
├── routes
│   ├── adminRoutes.js
│   ├── authRoutes.js
│   ├── examRoutes.js
│   ├── mockTestRoutes.js
│   ├── paperRoutes.js
│   ├── practiceRoutes.js
│   ├── profileRoutes.js
│   ├── questionRoutes.js
│   └── subjectRoutes.js
│
├── services
│   ├── adminService.js
│   ├── authService.js
│   ├── examService.js
│   ├── mockTestService.js
│   ├── paperService.js
│   ├── practiceService.js
│   ├── profileService.js
│   ├── questionService.js
│   └── subjectService.js
│
├── utils
│   ├── ApiError.js
│   ├── ApiResponse.js
│   ├── asyncHandler.js
│   └── helpers.js
│
├── validators
│
├── uploads
│
├── seeder
│
├── server.js
│
└── package.json
```

---

# Frontend Architecture

The frontend is built using a component-driven architecture.

Every screen is composed of reusable layouts, pages, services, hooks, and UI components.

```text
Pages
   │
Layouts
   │
Reusable Components
   │
Hooks
   │
Services
   │
Axios
   │
Backend APIs
```

This approach improves maintainability while encouraging component reuse across multiple pages.

---

# Frontend Project Structure

```text
frontend
│
├── public
│
├── src
│   │
│   ├── assets
│   │
│   ├── components
│   │   ├── admin
│   │   ├── common
│   │   ├── dashboard
│   │   ├── mocktest
│   │   ├── papers
│   │   ├── practice
│   │   ├── profile
│   │   └── subject
│   │
│   ├── context
│   │
│   ├── hooks
│   │
│   ├── layouts
│   │
│   ├── pages
│   │   ├── admin
│   │   ├── auth
│   │   └── student
│   │
│   ├── services
│   │
│   ├── styles
│   │
│   ├── utils
│   │
│   ├── App.jsx
│   │
│   └── main.jsx
│
└── package.json
```

---

# Backend Modules

The backend is divided into independent feature modules.

## Authentication Module

Responsibilities

- User Registration
- Student Login
- Admin Login
- JWT Generation
- JWT Verification
- Current User
- Profile Management

---

## Exam Module

Responsibilities

- Create Exams
- Update Exams
- Delete Exams
- Get All Exams
- Select Preferred Exam
- Get Current Exam
- Student Exam Mapping

---

## Subject Module

Responsibilities

- Subject CRUD
- Exam Mapping
- Subject Ordering
- Active / Inactive Status
- Subject Lookup

---

## Question Module

Responsibilities

- Question CRUD
- CSV Upload
- Question Validation
- Subject Mapping
- Difficulty Management
- Filtering

---

## Practice Module

Responsibilities

- Practice Sessions
- Question Retrieval
- Practice Submission
- Practice History
- Performance Calculation

---

## Mock Test Module

Responsibilities

- Create Mock Tests
- Update Mock Tests
- Delete Mock Tests
- Publish / Unpublish
- Start Test
- Submit Test
- Attempt History
- Mock Test Statistics

---

## Previous Year Paper Module

Responsibilities

- Upload Papers
- Manage Papers
- Student Access
- File Storage
- Paper Organization

---

## Admin Module

Responsibilities

- Dashboard
- User Management
- Analytics
- Platform Statistics
- Administrative Operations

---

# Frontend Modules

## Authentication

- Login
- Registration
- Protected Routes
- Session Management

---

## Student Dashboard

- Welcome Section
- Statistics Cards
- Progress Overview
- Recent Activity
- Quick Actions

---

## Exam Selection

- Available Exams
- Preferred Exam Selection
- Exam Switching
- Current Exam Display

---

## Subject Management

- Subject List
- Subject Details
- Exam-wise Subjects
- Search & Filtering

---

## Practice

- Practice Filters
- Question Cards
- Answer Submission
- Result Summary

---

## Mock Tests

- Mock Test List
- Test Instructions
- Question Navigation
- Timer
- Submission
- Results
- History

---

## Previous Year Papers

- Paper Listing
- Exam Filters
- Subject Filters
- Paper Details

---

## Performance

- Overall Statistics
- Subject Performance
- Progress Charts
- Learning Trends

---

## Admin Panel

Current modules include:

- Dashboard
- Users
- Exams
- Subjects
- Questions
- Mock Tests
- Previous Year Papers
- Analytics

---  

# Authentication Flow

Authentication in VNAverse is built around JSON Web Tokens (JWT).

Every protected request follows the same authentication flow.

```text
User Login
      │
      ▼
Authentication Controller
      │
      ▼
Authentication Service
      │
      ▼
Verify Credentials
      │
      ▼
Generate JWT Token
      │
      ▼
Return Token
      │
      ▼
Frontend Stores Token
      │
      ▼
Axios Sends Authorization Header
      │
      ▼
Protected Backend APIs
```

---

## Authentication Process

### Registration

Responsibilities

- Validate Request
- Hash Password
- Create User
- Save User
- Return Success Response

---

### Login

Responsibilities

- Verify Email
- Verify Password
- Generate JWT
- Return User Details
- Return Access Token

---

### Protected Routes

Every protected endpoint passes through:

- JWT Authentication
- User Validation
- Role Authorization (if required)
- Controller
- Service

---

# Data Flow

The platform follows a consistent request lifecycle.

```text
Student/Admin
      │
      ▼
React Component
      │
      ▼
Custom Hook (Optional)
      │
      ▼
Frontend Service
      │
      ▼
Axios Instance
      │
      ▼
Backend Route
      │
      ▼
Middleware
      │
      ▼
Controller
      │
      ▼
Business Service
      │
      ▼
MongoDB Model
      │
      ▼
MongoDB Atlas
      │
      ▼
ApiResponse
      │
      ▼
Frontend UI Update
```

Every feature in the platform follows this flow.

---

# Database Architecture

VNAverse uses MongoDB Atlas as its primary database.

Each feature has its own dedicated collection.

```text
MongoDB Atlas

│

├── users

├── exams

├── subjects

├── questions

├── mocktests

├── mocktestattempts

├── papers

└── practicehistory
```

---

## Entity Relationships

```text
User
 │
 ├──────────────► Preferred Exam
 │
 ├──────────────► Practice History
 │
 └──────────────► Mock Test Attempts

Exam
 │
 ├──────────────► Subjects
 │
 ├──────────────► Questions
 │
 ├──────────────► Mock Tests
 │
 └──────────────► Previous Year Papers

Subject
 │
 ├──────────────► Questions
 │
 └──────────────► Mock Tests
```

---

# Service Layer Architecture

The Service Layer is the core of the backend.

Controllers remain lightweight by delegating all business logic to services.

```text
Controller

      │

      ▼

Business Service

      │

      ├────────────► Validation

      ├────────────► Business Rules

      ├────────────► Database Queries

      ├────────────► Data Processing

      └────────────► Response Generation
```

---

## Why Service Layer?

Benefits include:

- Cleaner Controllers
- Better Code Reuse
- Easier Testing
- Better Maintainability
- Improved Scalability
- Consistent Business Logic
- Reduced Code Duplication

---

# API Response Architecture

All APIs return standardized responses.

## Success Response

```json
{
    "success": true,
    "message": "Operation completed successfully.",
    "data": {}
}
```

---

## Error Response

```json
{
    "success": false,
    "message": "Something went wrong."
}
```

---

# Security Architecture

Security is implemented throughout the application.

Current implementation includes:

## Authentication

- JWT Authentication
- Secure Token Verification
- Protected Routes

---

## Authorization

- Role-Based Access Control
- Admin Middleware
- Student Access Validation

---

## Password Security

- bcrypt Password Hashing
- Secure Password Storage
- No Plain Text Passwords

---

## Request Validation

Incoming requests are validated before reaching the business layer.

Validation includes:

- Required Fields
- Data Types
- Object IDs
- File Validation
- Business Rules

---

## File Upload Security

Uploaded files are validated before storage.

Current validation includes:

- File Type Validation
- Allowed MIME Types
- Secure File Names
- Upload Restrictions

---

## Error Handling

The backend uses centralized error handling.

Benefits include:

- Consistent Error Responses
- Better Debugging
- Cleaner Controllers
- Easier Maintenance

---

# Utility Layer

Reusable utilities reduce duplication across the application.

Current utilities include:

- ApiResponse
- ApiError
- asyncHandler
- Helper Functions

Future utilities may include:

- Email Services
- Notification Services
- Cache Helpers
- Logger
- Audit Trail

---

# Performance & Scalability

VNAverse is designed to scale from a small beta platform to a production SaaS capable of supporting thousands of concurrent users.

The architecture prioritizes long-term maintainability over short-term development speed.

---

## Scalability Principles

### Modular Architecture

Every feature is isolated into its own module.

Benefits:

- Easier Maintenance
- Independent Development
- Better Testing
- Cleaner Codebase

---

### Service Layer

Business logic is centralized inside services.

Benefits:

- Reusable Logic
- Cleaner Controllers
- Easier Refactoring
- Better Unit Testing

---

### Reusable Frontend Components

The frontend follows a reusable component architecture.

Benefits:

- Faster Development
- Consistent UI
- Reduced Duplication
- Better Maintainability

---

### API-Driven Design

Every frontend feature communicates with the backend through dedicated service files.

```text
React Component

      │

      ▼

Frontend Service

      │

      ▼

Axios

      │

      ▼

REST API
```

This keeps networking logic separate from UI logic.

---

# Development Standards

VNAverse follows industry-standard software engineering practices.

## Backend Standards

- RESTful API Design
- Service Layer Architecture
- Centralized Error Handling
- Async/Await
- Modular Routes
- Input Validation
- Reusable Utilities
- Standard API Responses

---

## Frontend Standards

- Component-Based Architecture
- Reusable Components
- Layout Separation
- Service-Based API Communication
- Responsive Design
- Loading States
- Error States
- Clean UI

---

## Code Quality

The project follows the following principles:

- Meaningful Naming
- Single Responsibility Principle
- Reusable Functions
- Modular Structure
- Consistent Formatting
- Minimal Code Duplication

---

# Technology Stack

## Frontend

- React
- Vite
- React Router
- Axios
- Bootstrap 5
- Lucide React
- React Toastify
- Chart.js

---

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- Multer
- Helmet
- Morgan
- Express Rate Limit

---

## Development Tools

- Git
- GitHub
- VS Code
- MongoDB Compass
- Thunder Client
- Postman
- ESLint

---

# Future Architecture

The current architecture is designed to support future expansion without major structural changes.

Planned additions include:

## AI Layer

```text
Frontend

     │

     ▼

AI Gateway

     │

     ▼

AI Services

     │

     ▼

LLM Provider
```

Future AI capabilities:

- AI Tutor
- AI Study Planner
- AI Performance Analysis
- AI Question Generation
- Personalized Learning

---

## Notification System

Future support for:

- Email Notifications
- Push Notifications
- In-App Notifications
- Reminder System

---

## Payment System

Future architecture will include:

```text
Frontend

     │

     ▼

Payment Service

     │

     ▼

Payment Gateway

     │

     ▼

Subscription Database
```

---

## Mobile Application

The REST APIs are designed to be platform-independent.

Future clients can include:

- Android Application
- iOS Application
- Progressive Web App (PWA)

without changing the backend architecture.

---

# Current Development Status

| Module | Status |
|---------|--------|
| Authentication | ✅ Complete |
| Student Dashboard | ✅ Complete |
| Exam Management | ✅ Complete |
| Subject Management | ✅ Complete |
| Practice Module | ✅ Complete |
| Performance Module | ✅ Complete |
| Previous Year Papers | 🚧 Refactoring |
| Question Management | 🚧 Refactoring |
| Mock Test Management | 🚧 Refactoring |
| Admin Dashboard | 🚧 Refactoring |
| Backend Architecture | ✅ Production Ready |
| Frontend Architecture | 🚧 Production Migration |
| Beta Stabilization | 🚧 In Progress |

---

# Design Goals

The primary objectives of the VNAverse architecture are:

- Scalability
- Maintainability
- Security
- Performance
- Reusability
- Extensibility
- Clean Code
- Production Readiness

Every architectural decision is evaluated against these goals before implementation.

---

# Long-Term Vision

VNAverse is being developed as a long-term education technology platform.

The current Government Exam Preparation platform is the first product within the VNAverse ecosystem.

Future expansion includes:

- Competitive Exam Preparation
- Placement Preparation
- Coding Assessments
- Aptitude Training
- AI Learning Assistant
- Career Development Tools
- Professional Certification Programs
- Enterprise Learning Solutions

The architecture has been designed to support this growth without requiring major rewrites.

---

# Conclusion

The VNAverse V2 architecture represents a transition from a prototype application to a production-focused SaaS platform.

By adopting a layered backend architecture, modular frontend design, centralized business logic, and standardized APIs, the project is well-positioned for future growth, feature expansion, and large-scale deployment.

As the platform evolves, this architecture will continue to serve as the foundation for building intelligent, secure, and scalable learning experiences.

---

<p align="center">

# VNAverse Architecture

**Version 2**

**Production-Oriented Architecture**

**Vision Nexus Academy**

*Where Vision Meets Knowledge*

Building a scalable learning platform for the future of education.

</p>