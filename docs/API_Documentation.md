# VNAverse API Documentation

## Version

V2 Production Architecture

---

# Introduction

This document describes the REST APIs used by the VNAverse platform.

The backend follows a production-ready layered architecture:

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

All APIs return standardized JSON responses using the centralized `ApiResponse` utility.

---

# Base URL

Development

```
http://localhost:5000/api
```

Production

```
Coming Soon
```

---

# Authentication

Most APIs require authentication.

Include the JWT token inside the Authorization header.

Example

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# Standard Success Response

Every successful request follows the same structure.

```json
{
    "success": true,
    "message": "Operation completed successfully.",
    "data": {}
}
```

---

# Standard Error Response

```json
{
    "success": false,
    "message": "Something went wrong."
}
```

Validation errors may also include additional details depending on the endpoint.

---

# HTTP Status Codes

| Status Code | Meaning |
|-------------|---------|
|200|Request Successful|
|201|Resource Created|
|400|Bad Request|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|
|409|Conflict|
|500|Internal Server Error|

---

# Authentication APIs

Base Route

```
/api/auth
```

---

## Register User

### Endpoint

```
POST /api/auth/register
```

### Description

Creates a new student account.

---

### Request Body

```json
{
    "name": "Aditya",
    "email": "aditya@gmail.com",
    "password": "Password123"
}
```

---

### Success Response

```json
{
    "success": true,
    "message": "User registered successfully.",
    "data": {
        "_id": "...",
        "name": "Aditya",
        "email": "aditya@gmail.com"
    }
}
```

---

## Login User

### Endpoint

```
POST /api/auth/login
```

### Description

Authenticates a student and returns a JWT token.

---

### Request Body

```json
{
    "email": "aditya@gmail.com",
    "password": "Password123"
}
```

---

### Success Response

```json
{
    "success": true,
    "message": "Login successful.",
    "data": {
        "token": "JWT_TOKEN",
        "user": {
            "_id": "...",
            "name": "Aditya",
            "email": "aditya@gmail.com",
            "role": "student"
        }
    }
}
```

---

## Admin Login

### Endpoint

```
POST /api/auth/admin/login
```

### Description

Authenticates an administrator.

---

### Request Body

```json
{
    "email": "admin@vnaverse.com",
    "password": "Password123"
}
```

---

### Success Response

```json
{
    "success": true,
    "message": "Admin login successful.",
    "data": {
        "token": "JWT_TOKEN",
        "user": {
            "role": "admin"
        }
    }
}
```

---

## Get Current User

### Endpoint

```
GET /api/auth/me
```

### Authentication

Required

---

### Success Response

```json
{
    "success": true,
    "message": "User fetched successfully.",
    "data": {
        "_id": "...",
        "name": "Aditya",
        "email": "aditya@gmail.com",
        "role": "student"
    }
}
```

---

## Update Profile

### Endpoint

```
PUT /api/auth/profile
```

### Authentication

Required

---

### Request Body

```json
{
    "name": "Aditya Thakur",
    "profileImage": "..."
}
```

---

### Success Response

```json
{
    "success": true,
    "message": "Profile updated successfully."
}
```

---# Exam APIs

Base Route

```
/api/exams
```

---

## Get All Exams

### Endpoint

```
GET /api/exams
```

### Authentication

Required

### Description

Returns all active exams available on the platform.

---

### Success Response

```json
{
    "success": true,
    "message": "Exams fetched successfully.",
    "data": [
        {
            "_id": "...",
            "name": "IBPS Clerk",
            "slug": "ibps-clerk",
            "category": "Banking",
            "description": "...",
            "subjects": [],
            "isActive": true
        }
    ]
}
```

---

## Select Preferred Exam

### Endpoint

```
PUT /api/exams/select
```

### Authentication

Required

### Description

Sets the student's preferred exam.

---

### Request Body

```json
{
    "examId": "EXAM_ID"
}
```

---

### Success Response

```json
{
    "success": true,
    "message": "Preferred exam updated successfully.",
    "data": {
        "preferredExam": {
            "_id": "...",
            "name": "IBPS Clerk"
        }
    }
}
```

---

## Get Current Exam

### Endpoint

```
GET /api/exams/current
```

### Authentication

Required

### Description

Returns the student's currently selected exam.

---

### Success Response

```json
{
    "success": true,
    "message": "Current exam fetched successfully.",
    "data": {
        "_id": "...",
        "name": "IBPS Clerk",
        "category": "Banking"
    }
}
```

---

## Get My Exams

### Endpoint

```
GET /api/exams/my-exams
```

### Authentication

Required

### Description

Returns all exams associated with the authenticated student.

---

### Success Response

```json
{
    "success": true,
    "message": "Student exams fetched successfully.",
    "data": [
        {
            "_id": "...",
            "name": "IBPS Clerk"
        }
    ]
}
```

---

# Subject APIs

Base Route

```
/api/subjects
```

---

## Get All Subjects

### Endpoint

```
GET /api/subjects
```

### Authentication

Required

### Description

Returns all available subjects.

---

### Success Response

```json
{
    "success": true,
    "message": "Subjects fetched successfully.",
    "data": [
        {
            "_id": "...",
            "name": "Reasoning",
            "slug": "reasoning",
            "exam": {
                "_id": "...",
                "name": "IBPS Clerk"
            },
            "order": 1,
            "isActive": true
        }
    ]
}
```

---

## Get Subjects By Exam

### Endpoint

```
GET /api/subjects/exam/:examId
```

### Authentication

Required

### Description

Returns all subjects belonging to a specific exam.

---

### Success Response

```json
{
    "success": true,
    "message": "Subjects fetched successfully.",
    "data": [
        {
            "_id": "...",
            "name": "Reasoning"
        }
    ]
}
```

---

## Get Subject By ID

### Endpoint

```
GET /api/subjects/:id
```

### Authentication

Required (Admin)

---

### Success Response

```json
{
    "success": true,
    "message": "Subject fetched successfully.",
    "data": {
        "_id": "...",
        "name": "Reasoning",
        "description": "...",
        "icon": "brain",
        "color": "#2563EB"
    }
}
```

---

## Create Subject

### Endpoint

```
POST /api/subjects
```

### Authentication

Required (Admin)

---

### Request Body

```json
{
    "name": "Reasoning",
    "slug": "reasoning",
    "exam": "EXAM_ID",
    "description": "Reasoning Subject",
    "icon": "brain",
    "color": "#2563EB",
    "order": 1
}
```

---

### Success Response

```json
{
    "success": true,
    "message": "Subject created successfully.",
    "data": {
        "_id": "..."
    }
}
```

---

## Update Subject

### Endpoint

```
PUT /api/subjects/:id
```

### Authentication

Required (Admin)

---

### Success Response

```json
{
    "success": true,
    "message": "Subject updated successfully."
}
```

---

## Delete Subject

### Endpoint

```
DELETE /api/subjects/:id
```

### Authentication

Required (Admin)

---

### Success Response

```json
{
    "success": true,
    "message": "Subject deleted successfully."
}
```

---# Question APIs

Base Route

```
/api/questions
```

---

## Get All Questions

### Endpoint

```
GET /api/questions
```

### Authentication

Required (Admin)

### Description

Returns all questions stored in the platform.

---

### Success Response

```json
{
    "success": true,
    "message": "Questions fetched successfully.",
    "data": [
        {
            "_id": "...",
            "question": "What is CPU?",
            "options": [
                "Central Processing Unit",
                "Computer Program Unit",
                "Central Power Unit",
                "Control Processing Unit"
            ],
            "correctAnswer": "Central Processing Unit",
            "exam": {
                "_id": "...",
                "name": "IBPS Clerk"
            },
            "subject": {
                "_id": "...",
                "name": "Computer"
            },
            "difficulty": "Easy"
        }
    ]
}
```

---

## Get Question By ID

### Endpoint

```
GET /api/questions/:id
```

### Authentication

Required (Admin)

---

### Success Response

```json
{
    "success": true,
    "message": "Question fetched successfully.",
    "data": {
        "_id": "...",
        "question": "What is CPU?"
    }
}
```

---

## Create Question

### Endpoint

```
POST /api/questions
```

### Authentication

Required (Admin)

---

### Request Body

```json
{
    "exam": "EXAM_ID",
    "subject": "SUBJECT_ID",
    "question": "What is CPU?",
    "options": [
        "Central Processing Unit",
        "Computer Program Unit",
        "Central Power Unit",
        "Control Processing Unit"
    ],
    "correctAnswer": "Central Processing Unit",
    "difficulty": "Easy"
}
```

---

### Success Response

```json
{
    "success": true,
    "message": "Question created successfully.",
    "data": {
        "_id": "..."
    }
}
```

---

## Update Question

### Endpoint

```
PUT /api/questions/:id
```

### Authentication

Required (Admin)

---

### Success Response

```json
{
    "success": true,
    "message": "Question updated successfully."
}
```

---

## Delete Question

### Endpoint

```
DELETE /api/questions/:id
```

### Authentication

Required (Admin)

---

### Success Response

```json
{
    "success": true,
    "message": "Question deleted successfully."
}
```

---

## Bulk Upload Questions

### Endpoint

```
POST /api/questions/upload
```

### Authentication

Required (Admin)

### Content Type

```
multipart/form-data
```

---

### Form Field

```
file
```

---

### Success Response

```json
{
    "success": true,
    "message": "Questions uploaded successfully."
}
```

---

# Practice APIs

Base Route

```
/api/practice
```

---

## Get Practice Questions

### Endpoint

```
GET /api/practice
```

### Authentication

Required

### Description

Returns questions for practice based on the student's selected filters.

---

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| exam | Exam ID |
| subject | Subject ID |
| difficulty | Easy / Medium / Hard |
| limit | Number of questions |

---

### Success Response

```json
{
    "success": true,
    "message": "Practice questions fetched successfully.",
    "data": [
        {
            "_id": "...",
            "question": "...",
            "options": []
        }
    ]
}
```

---

## Submit Practice Session

### Endpoint

```
POST /api/practice/submit
```

### Authentication

Required

---

### Request Body

```json
{
    "answers": [
        {
            "questionId": "...",
            "selectedOption": "A"
        }
    ]
}
```

---

### Success Response

```json
{
    "success": true,
    "message": "Practice submitted successfully.",
    "data": {
        "score": 18,
        "correct": 18,
        "wrong": 2,
        "accuracy": 90
    }
}
```

---

## Get Practice History

### Endpoint

```
GET /api/practice/history
```

### Authentication

Required

---

### Success Response

```json
{
    "success": true,
    "message": "Practice history fetched successfully.",
    "data": [
        {
            "_id": "...",
            "score": 18,
            "accuracy": 90
        }
    ]
}
```

---

## Get Practice Analytics

### Endpoint

```
GET /api/practice/analytics
```

### Authentication

Required

---

### Success Response

```json
{
    "success": true,
    "message": "Practice analytics fetched successfully.",
    "data": {
        "totalSessions": 24,
        "averageScore": 82,
        "accuracy": 87
    }
}
```

---# Mock Test APIs

Base Route

```
/api/mocktests
```

---

# Student APIs

---

## Start Mock Test

### Endpoint

```
POST /api/mocktests/start
```

### Authentication

Required

---

### Request Body

```json
{
    "mockTestId": "MOCK_TEST_ID"
}
```

---

### Success Response

```json
{
    "success": true,
    "message": "Mock test started successfully.",
    "data": {
        "_id": "...",
        "title": "IBPS Clerk Mock Test 1",
        "duration": 60,
        "questions": []
    }
}
```

---

## Submit Mock Test

### Endpoint

```
POST /api/mocktests/submit
```

### Authentication

Required

---

### Request Body

```json
{
    "mockTestId": "MOCK_TEST_ID",
    "answers": [
        {
            "questionId": "QUESTION_ID",
            "selectedOption": "A"
        }
    ],
    "totalTime": 3120
}
```

---

### Success Response

```json
{
    "success": true,
    "message": "Mock test submitted successfully.",
    "data": {
        "score": 82,
        "correctAnswers": 41,
        "wrongAnswers": 9,
        "accuracy": 82,
        "timeTaken": 3120
    }
}
```

---

## Get Mock Test History

### Endpoint

```
GET /api/mocktests/history
```

### Authentication

Required

---

### Success Response

```json
{
    "success": true,
    "message": "Mock test history fetched successfully.",
    "data": [
        {
            "_id": "...",
            "mockTest": "IBPS Clerk Mock Test 1",
            "score": 82,
            "submittedAt": "2026-08-01T10:30:00Z"
        }
    ]
}
```

---

## Get Mock Test Attempt

### Endpoint

```
GET /api/mocktests/history/:id
```

### Authentication

Required

---

### Success Response

```json
{
    "success": true,
    "message": "Mock test attempt fetched successfully.",
    "data": {
        "_id": "...",
        "score": 82,
        "answers": []
    }
}
```

---

## Delete Mock Test Attempt

### Endpoint

```
DELETE /api/mocktests/history/:id
```

### Authentication

Required

---

### Success Response

```json
{
    "success": true,
    "message": "Mock test attempt deleted successfully."
}
```

---

# Admin APIs

---

## Get All Mock Tests

### Endpoint

```
GET /api/mocktests
```

### Authentication

Required (Admin)

---

### Success Response

```json
{
    "success": true,
    "message": "Mock tests fetched successfully.",
    "data": [
        {
            "_id": "...",
            "title": "IBPS Clerk Mock Test 1",
            "exam": {
                "_id": "...",
                "name": "IBPS Clerk"
            },
            "subject": {
                "_id": "...",
                "name": "Reasoning"
            },
            "duration": 60,
            "status": "Published"
        }
    ]
}
```

---

## Get Mock Test By ID

### Endpoint

```
GET /api/mocktests/:id
```

### Authentication

Required (Admin)

---

### Success Response

```json
{
    "success": true,
    "message": "Mock test fetched successfully.",
    "data": {
        "_id": "...",
        "title": "IBPS Clerk Mock Test 1"
    }
}
```

---

## Create Mock Test

### Endpoint

```
POST /api/mocktests
```

### Authentication

Required (Admin)

---

### Request Body

```json
{
    "title": "IBPS Clerk Mock Test 1",
    "description": "Full Length Practice Test",
    "exam": "EXAM_ID",
    "subject": "SUBJECT_ID",
    "duration": 60,
    "totalMarks": 100,
    "passingMarks": 35,
    "negativeMarking": 0.25,
    "status": "Draft"
}
```

---

### Success Response

```json
{
    "success": true,
    "message": "Mock test created successfully.",
    "data": {
        "_id": "..."
    }
}
```

---

## Update Mock Test

### Endpoint

```
PUT /api/mocktests/:id
```

### Authentication

Required (Admin)

---

### Success Response

```json
{
    "success": true,
    "message": "Mock test updated successfully."
}
```

---

## Publish / Unpublish Mock Test

### Endpoint

```
PATCH /api/mocktests/:id/status
```

### Authentication

Required (Admin)

---

### Success Response

```json
{
    "success": true,
    "message": "Mock test status updated successfully."
}
```

---

## Delete Mock Test

### Endpoint

```
DELETE /api/mocktests/:id
```

### Authentication

Required (Admin)

---

### Success Response

```json
{
    "success": true,
    "message": "Mock test deleted successfully."
}
```

---

## Get Mock Test Statistics

### Endpoint

```
GET /api/mocktests/statistics
```

### Authentication

Required (Admin)

---

### Success Response

```json
{
    "success": true,
    "message": "Mock test statistics fetched successfully.",
    "data": {
        "total": 25,
        "published": 18,
        "draft": 7,
        "averageQuestions": 100
    }
}
```

---

# Previous Year Paper APIs

Base Route

```
/api/papers
```

---

## Get All Previous Year Papers

### Endpoint

```
GET /api/papers
```

### Authentication

Required

---

### Success Response

```json
{
    "success": true,
    "message": "Previous year papers fetched successfully.",
    "data": [
        {
            "_id": "...",
            "title": "IBPS Clerk 2025",
            "exam": "IBPS Clerk",
            "year": 2025
        }
    ]
}
```

---

## Upload Previous Year Paper

### Endpoint

```
POST /api/papers
```

### Authentication

Required (Admin)

### Content Type

```
multipart/form-data
```

---

### Form Fields

```
title
exam
year
file
```

---

### Success Response

```json
{
    "success": true,
    "message": "Previous year paper uploaded successfully."
}
```

---

## Delete Previous Year Paper

### Endpoint

```
DELETE /api/papers/:id
```

### Authentication

Required (Admin)

---

### Success Response

```json
{
    "success": true,
    "message": "Previous year paper deleted successfully."
}
```

---# Admin APIs

Base Route

```
/api/admin
```

---

## Admin Dashboard

### Endpoint

```
GET /api/admin/dashboard
```

### Authentication

Required (Admin)

### Description

Returns platform statistics for the Admin Dashboard.

---

### Success Response

```json
{
    "success": true,
    "message": "Dashboard statistics fetched successfully.",
    "data": {
        "totalUsers": 120,
        "totalQuestions": 4500,
        "totalMockTests": 85,
        "totalSubjects": 12,
        "totalExams": 8
    }
}
```

---

## Get All Users

### Endpoint

```
GET /api/admin/users
```

### Authentication

Required (Admin)

---

### Success Response

```json
{
    "success": true,
    "message": "Users fetched successfully.",
    "data": [
        {
            "_id": "...",
            "name": "Aditya",
            "email": "aditya@gmail.com",
            "role": "student",
            "status": "active"
        }
    ]
}
```

---

## Get Platform Analytics

### Endpoint

```
GET /api/admin/analytics
```

### Authentication

Required (Admin)

---

### Success Response

```json
{
    "success": true,
    "message": "Analytics fetched successfully.",
    "data": {
        "dailyActiveUsers": 150,
        "weeklyActiveUsers": 520,
        "monthlyActiveUsers": 1850
    }
}
```

---

# CSV Upload APIs

CSV upload endpoints are used to bulk import platform data.

Supported modules include:

- Questions
- Mock Test Questions
- Previous Year Papers (Future)

---

## Upload Questions CSV

### Endpoint

```
POST /api/questions/upload
```

### Authentication

Required (Admin)

---

### Content Type

```
multipart/form-data
```

---

### Form Data

| Field | Type |
|--------|------|
| file | CSV File |

---

### Success Response

```json
{
    "success": true,
    "message": "Questions uploaded successfully."
}
```

---

# File Upload Standards

Supported upload types:

- CSV
- JPG
- JPEG
- PNG
- PDF

Future support:

- DOCX
- XLSX
- ZIP

---

# Common Error Responses

## 400 Bad Request

```json
{
    "success": false,
    "message": "Validation failed."
}
```

---

## 401 Unauthorized

```json
{
    "success": false,
    "message": "Unauthorized."
}
```

---

## 403 Forbidden

```json
{
    "success": false,
    "message": "Access denied."
}
```

---

## 404 Not Found

```json
{
    "success": false,
    "message": "Resource not found."
}
```

---

## 409 Conflict

```json
{
    "success": false,
    "message": "Resource already exists."
}
```

---

## 500 Internal Server Error

```json
{
    "success": false,
    "message": "Internal server error."
}
```

---

# API Design Principles

The VNAverse backend follows a production-oriented API design.

### Consistent Responses

Every endpoint returns a standardized JSON structure using the centralized `ApiResponse` utility.

---

### Layered Architecture

Each request follows the same flow:

```text
Client
   │
Routes
   │
Authentication Middleware
   │
Authorization Middleware
   │
Controllers
   │
Services
   │
Models
   │
MongoDB
```

---

### Security

Current security implementation includes:

- JWT Authentication
- Password Hashing
- Role-Based Authorization
- Protected Routes
- Input Validation
- Centralized Error Handling

---

### Scalability

Business logic is separated from controllers using a dedicated service layer, making the backend easier to maintain, test, and extend.

---

# API Version

Current Version

```
V2
```

Architecture

```
Production Ready
```

Response Format

```
Standardized ApiResponse
```

Authentication

```
JWT Bearer Token
```

---

# Upcoming APIs

The following modules are planned for future releases:

- AI Tutor APIs
- AI Study Planner
- Notification APIs
- Leaderboard APIs
- Subscription APIs
- Payment APIs
- Resume Builder APIs
- Interview Preparation APIs
- Mobile APIs

---

# Notes

- All protected endpoints require a valid JWT token.
- Admin routes require both authentication and administrator privileges.
- All API responses follow a standardized success/error format.
- Uploaded files are validated before processing.
- Future API versions will remain backward compatible whenever possible.

---

# Support

Project

**VNAverse**

Vision Nexus Academy

Repository

```
https://github.com/Aditya99977/VNAverse
```

Developer

**Aditya Thakur**

GitHub

```
https://github.com/Aditya99977
```

LinkedIn

```
https://www.linkedin.com/in/aditya-thakur-67745141a/
```

---

<p align="center">

## VNAverse API Documentation

Version 2

Production Backend Architecture

Built with ❤️ using Node.js, Express.js & MongoDB

</p>