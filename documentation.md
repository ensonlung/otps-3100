# Online Tutorial Pairing System

## Overview
A tutoring platform built with React, React Bootstrap, Node.js, Express, and Firebase Firestore. 
Features include tutor post creation, search, filter, feedback, and reporting.

## Project Structure
- **Frontend** (React):
  - `Content/AdminPanel/`: All related UIs in admin's page
  - `Content/StudentPanels/`: All related UIs in student's page
  - `Content/TutorPanels/`: All related UI in tutor's page
  - `Content/Widget/`: All related UI of the format of a post.
  - `Login`: All related UI of login page and register page.
- **Backend** (Node.js/Express):'
  - `adminController.cjs`: Handles all admin features.
  - `commentController.cjs`: Handles all comments feature.
  - `filterController.cjs`: Handles filter post feature.
  - `firebase.cjs`: Initializes Firebase Admin SDK.
  - `licenseController.cjs`: Handles all license feature.
  - `loginController.cjs`: Handles login feature.
  - `postController.cjs`: Handles all post feature.
  - `registerController.cjs`: Handles register account feature.
  - `reportController.cjs`: Handles report post/feedback feature..
  - `searchController.cjs`: Handles search post feature..
  - `server.cjs`: Initialize server.
  - `updateController.cjs`: Handles database updates from user's edit.

## Frontend Main Components
- **TutorPostForm.tsx**:
  - Features: Displays all posts when any filter/search is applied.
- **CommentPage.tsx**:
  - Features: Displays all posts of certain tutor with its feedback.
- **AdminPost.tsx**:
  - Features: Displays all report issues from the users.

## Backend Endpoints
- **routes.cjs**: stored all used endpoints

## Database (Firestore)
- **Collections**:
  - `account`: Stores user info (`username`, `first name`, `last name`, `gender`, `phone number`, `bday`, `password`, `user type`, `email`).
  - `post`: Stores tutor posts (`createdAt`, `district`, `day`, `subject`, `startTime`, `endTime`, `fee`, `selfIntro`, `isHide`, `id`).
  - `comment`: Stores feedback (`tutorName`, `commentor`, `comment`, `rating`, `createdAt`, `id`).

## Setup
1. Clone: `git clone https://github.com/ensonlung/otps-3100.git && cd otps-3100/otps-test`
2. Install: `npm install`
4. Run Backend: `node src/Backend/server.js`
5. Run Frontend: `npm run dev`


## Future Improvements
- Add Match Function with Chat System
- Add SortBy Function.