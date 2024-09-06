# Nagrik Aur Samvidhan

**Nagrik Aur Samvidhan** is an interactive platform for learning about the **Indian Constitution**. It offers engaging lessons, quizzes, and gamified experiences to help citizens, especially students, understand the Constitution in a fun and accessible way.

## Features

- **User Authentication**: Users can sign in using Google authentication (Firebase).
- **Interactive Lessons**: Detailed lessons on key sections of the Indian Constitution, including the Preamble, Fundamental Rights, and more.
- **Learning Progress Tracking**: Track users' learning progress with visually appealing progress bars.
- **Gamification**: Quizzes and interactive modules that make learning the Constitution enjoyable.
- **User Profile**: Allows users to view and manage their profile, check their progress, bookmarks, and settings.
- **Responsive Design**: Optimized for both desktop and mobile use.

## Tech Stack

- **Frontend**: 
  - React.js with Hooks for state management
  - Tailwind CSS for styling
  - React Router for navigation
  - `lucide-react` and `react-icons` for icons
- **Backend**:
  - Firebase for authentication and analytics
- **Additional Libraries**:
  - React Router for routing
  - Firebase Authentication and Firestore for database management
  
## Prerequisites

Before setting up the project, make sure you have:

- Node.js v14 or higher
- npm (or yarn) for package management

## Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Enable Firebase Authentication and Firestore Database.
3. Add the Firebase configuration to your `.env` file as shown below.

```bash
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
