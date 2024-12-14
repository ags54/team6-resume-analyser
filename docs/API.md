# API Documentation

## Introduction
This document outlines the API endpoints for the Resume and Job Description Analysis project. Each section provides details on the endpoint URL, request/response format, validation rules, and example usage. All endpoints adhere to RESTful principles and return JSON responses.

---

## Table of Contents

1. [Authentication](#authentication)
   - [User Registration](#user-registration)
   - [User Login](#user-login)
2. [Resume and Job Description Input Handling](#resume-and-job-description-input-handling)
   - [Resume Upload](#resume-upload)
   - [Job Description Submission](#job-description-submission)
3. [AI Integration and Analysis](#ai-integration-and-analysis)
   - [Analyze Resume and Job Description](#analyze-resume-and-job-description)
4. [Feedback and Reporting](#feedback-and-reporting)
   - [Fit Score and Feedback Retrieval](#fit-score-and-feedback-retrieval)

---

## Authentication

### User Registration (Task 4)
**Endpoint:** `POST /api/register`

**Description:** Allows users to register by providing their email, username, and password.

**Request:**
```json
{
  "email": "user@example.com",
  "username": "user123",
  "password": "securePassword"
}
```

**Response:**
- **Success (`201 Created`):**
  ```json
  { "message": "User registered successfully." }
  ```
- **Error (`400 Bad Request`):**
  ```json
  { "error": "Invalid input or email already exists." }
  ```

---

### User Login (Task 5)
**Endpoint:** `POST /api/login`

**Description:** Authenticates users and returns a JWT for session management.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword"
}
```

**Response:**
- **Success (`200 OK`):**
  ```json
  { "token": "jwt-token" }
  ```
- **Error (`401 Unauthorized`):**
  ```json
  { "error": "Invalid email or password." }
  ```

---

## Resume and Job Description Input Handling

### Resume Upload (Task 8)
**Endpoint:** `POST /api/resume-upload`

**Description:** Allows users to upload a resume in PDF or docx format.

**Request:**
- **Content-Type:** `multipart/form-data`
- **Form Data:**
  - `resume_file`: The uploaded file.
- **Backend Logic:**
  - Check the file type to confirm it’s a PDF (e.g., MIME type application/pdf) or docx.
  - Validate the file size (should not exceed 2MB).
  - Temporarily store the file in memory or process it directly (no persistence required).


**Response:**
- **Success (`200 OK`):**
  ```json
  {
    "message": "Resume uploaded successfully.",
    "status": "success"
  }
  ```
- **Error (`400 Bad Request`):**
  ```json
  {
    "error": "Invalid file type. Only PDF files are allowed.",
    "status": "error"
  }
  ```

---

### Job Description Submission (Task 8)
**Endpoint:** `POST /api/job-description`

**Description:** Accepts a job description in text format.

**Request:**
- **Content-Type:** `application/json`
- **Backend Logic**
  - Ensure the text input does not exceed 5,000 characters.
  - Clean the text by removing extraneous whitespace.

**Response:**
- **Success (`200 OK`):**
  ```json
  {
    "message": "Job description submitted successfully.",
    "status": "success"
  }
  ```
- **Error (`400 Bad Request`):**
  ```json
  {
    "error": "Job description exceeds character limit.",
    "status": "error"
  }
  ```

---

## AI Integration and Analysis

### Analyze Resume and Job Description (Task 18)
**Endpoint:** `POST /api/analyze`

**Description:** Connect with the NLP API and facilitate communication between the frontend and AI service.

**Backend Logic**
  - Parse the incoming request and validate the payload.
  - Construct a request to the chosen NLP API.

**Request:**
```json
{
  "resume_text": "Resume content...",
  "job_description": "Job description..."
}
```

**Response:**
- **Success (`200 OK`):**
  ```json
  {
    "fit_score": 85,
    "feedback": [
      "Add experience with AWS services.",
      "Improve the summary section."
    ]
  }
  ```
- **Error (`400 Bad Request or 500 Internal Server Error`):**
  ```json
  {
    "error": "Unable to process the request. Please try again later"
  }
  ```

---

### Fit Score and Feedback Retrieval (Task 24)
**Endpoint:** `POST /api/fit-score`

**Description:** Retrieves the fit score and feedback for the authenticated user.

**Request:**
```json
{
  "resume_text": "Resume content...",
  "job_description": "Job description..."
}
```

**Response:**
- **Success (`200 OK`):**
  ```json
  {
    "fit_score": 85,
    "feedback": [
      "Add experience with project management.",
      "Highlight achievements in team leadership."
    ]
  }
  ```
- **Error (`400 Bad Request`):**
  ```json
  {
    "error": "Invalid input data. Both resume_text and job_description are required."
  }
  ```

---