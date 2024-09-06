import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { LogOut, User, ArrowRight } from 'lucide-react';
import { FaHouse, FaTrophy, FaBullseye, FaShop } from 'react-icons/fa6';
import { FaTimes, FaBars } from 'react-icons/fa'; // Import from 'fa', not 'fa6'

import { FaBook, FaBalanceScale, FaFlagCheckered, FaUsers, FaGavel, FaLandmark, FaVoteYea, FaUniversity, FaHandshake, FaGlobeAsia } from 'react-icons/fa';
import './App.css';

// Assume these image imports are correct
import constiImage from './1.jpeg';
import logoImage from './logo.png';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const Header = ({ user, onSignOut, onSignIn }) => (
  <header className="bg-gray-700 p-4 shadow-md w-full">
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center">
        <img src={logoImage} alt="Logo" className="h-10 w-10 mr-3" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-100 tracking-wide">Nagrik Aur Samvidhan</h1>
      </div>
      {user ? (
        <button onClick={onSignOut} className="flex items-center text-gray-300 hover:text-white transition-colors duration-300">
          <LogOut className="mr-2" /> Sign Out
        </button>
      ) : (
        <button onClick={onSignIn} className="flex items-center text-gray-300 hover:text-white transition-colors duration-300">
          <User className="mr-2" /> Sign In
        </button>
      )}
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-gray-800 text-gray-300 p-4 w-full">
    <div className="container mx-auto text-center">
      <p>&copy; 2024 Nagrik Aur Samvidhan. All rights reserved.</p>
    </div>
  </footer>
);
// Add appropriate import for the icon

const LandingPage = ({ onSignIn }) => (
  <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
    <Header onSignIn={onSignIn} />
    <main className="flex-grow flex items-center justify-center px-4 py-8 sm:py-16 bg-gray-800">
      <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
          <h2 className="text-sm uppercase text-gray-400 mb-4 tracking-wide">Say Hello to the Constitution</h2>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-white leading-tight">
            The Ultimate Indian Constitution Learning Platform
          </h1>
          <div className="bg-green-500 text-sm font-semibold py-1 px-3 inline-block rounded-full mb-6 text-gray-900 shadow-md">
            New: Interactive learning modules available!
          </div>
          <button onClick={onSignIn} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition-transform duration-200 ease-in-out transform hover:scale-105 shadow-lg">
            <span>Start Learning</span>
            <ArrowRight className="ml-2" />
          </button>
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <img src={constiImage} alt="Constitution of India" className="rounded-lg shadow-lg w-full max-w-md mx-auto lg:max-w-lg xl:max-w-xl" />
        </div>
      </div>
    </main>
    <Footer />
  </div>
);


const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    auth.signOut();
    setDropdownOpen(false); // Close the dropdown after signing out
  };

  return (
    <div className="relative">
      <div className="w-8 h-8 cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
        {user && user.photoURL ? (
          <img
            src={user.photoURL}
            alt="User Avatar"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gray-400 flex items-center justify-center">
            <span className="text-white">U</span>
          </div>
        )}
      </div>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-gray-200 rounded-lg shadow-lg z-20">
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Profile</li>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Leaderboard</li>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Bookmarks</li>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Settings</li>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={handleSignOut}>Sign Out</li>
          </ul>
        </div>
      )}
    </div>
  );
};


const LearnPage = ({ onSignOut }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const lessons = [
    { icon: <FaBook size={24} />, title: "Preamble", completed: true, subtopics: ['Objectives', 'Key phrases'] },
    { icon: <FaBalanceScale size={24} />, title: "Fundamental Rights", completed: true, subtopics: ['Right to Equality', 'Right to Freedom'] },
    { icon: <FaFlagCheckered size={24} />, title: "Directive Principles", completed: false, subtopics: ['Social Justice', 'Economic Welfare'] },
    { icon: <FaUsers size={24} />, title: "Citizenship", completed: false, subtopics: ['Acquisition', 'Termination'] },
    { icon: <FaGavel size={24} />, title: "Judiciary", completed: false, subtopics: ['Supreme Court', 'High Courts'] },
    { icon: <FaLandmark size={24} />, title: "Parliament", completed: false, subtopics: ['Lok Sabha', 'Rajya Sabha'] },
    { icon: <FaVoteYea size={24} />, title: "Elections", completed: false, subtopics: ['Election Commission', 'Voting Process'] },
    { icon: <FaUniversity size={24} />, title: "State Governments", completed: false, subtopics: ['Governor', 'State Legislature'] },
    { icon: <FaHandshake size={24} />, title: "Centre-State Relations", completed: false, subtopics: ['Legislative', 'Administrative'] },
    { icon: <FaGlobeAsia size={24} />, title: "International Relations", completed: false, subtopics: ['Treaties', 'Foreign Policy'] },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      {/* Mobile Header */}
      <header className="lg:hidden flex justify-between items-center p-4 bg-gray-800">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-300">
          {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        <h1 className="text-xl font-bold">Nagrik Aur Samvidhan</h1>
        <img src={logoImage} alt="Logo" className="w-8 h-8" />
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Now responsive */}
        <aside className={`${sidebarOpen ? 'block' : 'hidden'} lg:block w-full lg:w-64 bg-gray-800 shadow-md overflow-y-auto`}>
          <div className="p-4 hidden lg:flex items-center">
            <img src={logoImage} alt="Logo" className="w-10 h-10 mr-2" />
            <h1 className="text-2xl font-bold text-gray-100">Nagrik Aur Samvidhan</h1>
          </div>
          <nav className="mt-8">
            <NavItem icon={<FaHouse />} text="LEARN" active />
            <NavItem icon={<FaTrophy />} text="PUZZLES/GAMES" />
            <NavItem icon={<FaBullseye />} text="QUIZ" />
            <NavItem icon={<FaShop />} text="ON THIS DAY" />
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
    <button className="text-gray-400 hover:text-gray-200 transition-colors duration-300">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <h2 className="text-xl lg:text-3xl font-extrabold text-gray-100 tracking-wide font-serif shadow-md">
      Constitution Of India
    </h2>
    <div className="w-8 h-8">
      <UserProfile/>
    </div>
  </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Unit card */}
              <div className="bg-blue-600 rounded-lg p-4 text-white mb-8 w-full lg:w-3/4">
                <h3 className="text-xl font-bold mb-2">Learning Path</h3>
                <p>Master the Indian Constitution</p>
              </div>

              {/* Vertical Learning path */}
              <div className="space-y-8">
                {lessons.map((lesson, index) => (
                  <LessonNode
                    key={index}
                    icon={lesson.icon}
                    title={lesson.title}
                    completed={lesson.completed}
                    subtopics={lesson.subtopics}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-6 mt-8 lg:mt-0">
              <CircularProgressBox title="Progress" progress={75} />
              <CircularProgressBox title="Daily Goal" progress={50} />
              <AchievementBox />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ icon, text, active }) => (
  <a href="#" className={`flex items-center px-4 py-2 ${active ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
    {icon}
    <span className="ml-2 font-semibold">{text}</span>
  </a>
);

const LessonNode = ({ icon, title, completed, subtopics }) => (
  <div className="flex items-start bg-gray-800 rounded-lg p-4 shadow-md">
    <div className={`w-16 h-16 rounded-full flex items-center justify-center mr-4 ${
      completed ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'
    } shadow-lg transform hover:scale-105 transition-transform duration-200 ease-in-out`}
    style={{
      boxShadow: completed
        ? '0 4px 6px -1px rgba(72, 187, 120, 0.5), 0 2px 4px -1px rgba(72, 187, 120, 0.06)'
        : '0 4px 6px -1px rgba(74, 85, 104, 0.5), 0 2px 4px -1px rgba(74, 85, 104, 0.06)',
    }}>
      {icon}
    </div>
    <div>
      <h3 className={`text-lg font-semibold ${completed ? 'text-green-400' : 'text-gray-200'}`}>{title}</h3>
      <ul className="mt-2 space-y-1">
        {subtopics.map((subtopic, index) => (
          <li key={index} className="text-sm text-gray-400">{subtopic}</li>
        ))}
      </ul>
    </div>
  </div>
);

const CircularProgressBox = ({ title, progress }) => (
  <div className="bg-gray-800 rounded-lg p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
    <h3 className="text-lg lg:text-2xl font-bold text-gray-100 mb-4">{title}</h3>
    <div className="relative w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-6">
      <svg className="w-full h-full" viewBox="0 0 36 36">
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#4a5568"
          strokeWidth="2"
        />
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#48bb78"
          strokeWidth="2"
          strokeDasharray={`${progress}, 100`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl lg:text-3xl font-bold text-gray-100">
          {progress}%
        </span>
      </div>
    </div>
  </div>
);

const AchievementBox = () => {
  const achievements = [
    {
      title: "The First Challenge",
      description: "Attempted Your First Quiz",
      icon: "🏆",
    },
    {
      title: "Quiz-tastic!",
      description: "Achieved more than 90% in the first Quiz",
      icon: "🎯",
    },
    {
      title: "The Pilot",
      description: "Finished the First Module",
      icon: "✈️",
    },
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-4 lg:p-6 shadow text-center">
      <h3 className="text-lg lg:text-xl font-bold text-gray-100 mb-4">Achievements</h3>
      <div className="space-y-3">
        {achievements.map((achievement, index) => (
          <div key={index} className="flex items-center bg-gray-700 rounded-lg p-3">
            <span className="text-2xl mr-3">{achievement.icon}</span>
            <div className="text-left">
              <h4 className="text-sm lg:text-base font-semibold text-gray-100">{achievement.title}</h4>
              <p className="text-xs lg:text-sm text-gray-400">{achievement.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        navigate('/learn');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch((error) => {
      console.error("Error during sign in:", error.code, error.message);
    });
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      console.error("Error during sign out:", error);
    });
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={
        user ? <Navigate to="/learn" /> : <LandingPage onSignIn={handleSignIn} />
      } />
      <Route path="/learn" element={
        user ? <LearnPage onSignOut={handleSignOut} /> : <Navigate to="/" />
      } />
    </Routes>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;