import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="bg-red-600 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold">
          SkillSwap
        </NavLink>

        {/* Hamburger icon for small screens */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              isActive ? 'font-semibold underline' : 'hover:underline'
            }
          >
            Signup
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? 'font-semibold underline' : 'hover:underline'
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? 'font-semibold underline' : 'hover:underline'
            }
          >
            My Profile
          </NavLink>
          <NavLink
            to="/skillreq"
            className={({ isActive }) =>
              isActive ? 'font-semibold underline' : 'hover:underline'
            }
          >
            Skill Requests
          </NavLink>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-2 text-center">
          <NavLink
            to="/signup"
            onClick={() => setMenuOpen(false)}
            className="block py-2 hover:underline"
          >
            Signup
          </NavLink>
          <NavLink
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="block py-2 hover:underline"
          >
            Login
          </NavLink>
          <NavLink
            to="/profile"
            onClick={() => setMenuOpen(false)}
            className="block py-2 hover:underline"
          >
            My Profile
          </NavLink>
          <NavLink
            to="/skillreq"
            onClick={() => setMenuOpen(false)}
            className="block py-2 hover:underline"
          >
            Skill Requests
          </NavLink>
        </div>
      )}
    </nav>
  );
}
