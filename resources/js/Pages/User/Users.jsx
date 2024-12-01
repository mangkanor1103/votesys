import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa'; // Import logout icon

// Header Component
const Header = () => {
  return (
    <header className="bg-green-600 p-4 flex justify-between items-center text-white shadow-md">
      {/* Left Side: Voting System */}
      <h1 className="text-2xl font-semibold">Voting System</h1>

      {/* Right Side: Logout with Icon */}
      <button className="flex items-center bg-transparent text-white font-bold hover:text-gray-300">
        <FaSignOutAlt className="mr-2" /> {/* Logout Icon */}
        Logout
      </button>
    </header>
  );
};

// Main Content Component (Users)
const Users = ({ electionName }) => {
  return (
    <div className="bg-light-green-200 min-h-screen">
      <Header />
      
      {/* Election Name - Centered */}
      <div className="mt-8 text-center">
        <h2 className="text-3xl font-bold text-green-800">{electionName}</h2>
      </div>

      {/* Add voting content here (e.g., candidate options, abstain button, etc.) */}
    </div>
  );
};

export default Users;
