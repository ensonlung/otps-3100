# Tutoring Platform Web App

## Overview
A tutoring platform built with React, React Bootstrap, Node.js, Express, and Firebase Firestore. Features include tutor post creation, search, feedback, and reporting.

## Project Structure
- **Frontend** (React):
  - `TutorPost.tsx`: Displays tutor post with clickable name to view feedback.
  - `TutorPostSelf.tsx`: Displays tutor post for owner with edit/delete/hide options.
  - `TutorPostNoComment.tsx`: Displays tutor post with report option (three-dot menu).
  - `TutorFeedback.tsx`: Displays tutor feedback with average rating and report option.
  - `TutorPost.module.css`: Styles for tutor post components.
- **Backend** (Node.js/Express):
  - `filterController.cjs`: Handles post filtering and feedback retrieval.
  - `searchController.cjs`: Handles search by name.
  - `firebase.cjs`: Initializes Firebase Admin SDK.
  - `TutorPostInfo.cjs`: Static data (subjects, districts, etc.).

## Frontend Components
- **TutorPost.tsx**:
  - Features: Displays tutor details; name links to feedback; rating right-aligned.
- **TutorPostSelf.tsx**:
  - Features: Edit/delete/hide post; edit modal with multi-select and radio buttons.
- **TutorPostNoComment.tsx**:
  - Features: Displays post with report option in three-dot menu.
- **TutorFeedback.tsx**:
  - Features: Shows feedback with average rating; report option in three-dot menu.

## Backend Endpoints
- **filterController.cjs**:
  - `/api/filter-post`: Filters posts by criteria; sorts by `createdAt`.
  - `/api/get-comment`: Fetches feedback and average rating for a tutor.
- **searchController.cjs**:
  - `/api/searchRelevantName`: Searches posts by name; sorts by `createdAt` in application code.

## Database (Firestore)
- **Collections**:
  - `account`: Stores user info (`username`, `first name`, `last name`, `gender`, `phone number`).
  - `post`: Stores tutor posts (`username`, `subject`, `district`, `day`, `startTime`, `endTime`, `fee`, `selfIntro`, `isHide`, `createdAt`).
  - `comment`: Stores feedback (`tutorName`, `username`, `comment`, `rating`, `createdAt`).

## Setup
1. Clone: `git clone https://github.com/ensonlung/otps-3100.git && cd otps-3100/otps-test`
2. Install: `npm install`
4. Run Backend: `node src/Backend/server.js`
5. Run Frontend: `npm run dev`


## Future Improvements
- Add Match Function with Chat System
- Add SortBy Function.