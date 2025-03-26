import React from "react";
import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { FaBell, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { userData } from "../../constants/mockData";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "My Progress", path: "progress" },
    { label: "Resources", path: "resources" },
    { label: "Community", path: "community" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white border-b border-n-2/50 shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Logo size="md" />
            <span className="ml-1 text-n-5">Mental Wellness</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-n-6 p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative py-1 text-sm font-medium transition-colors ${
                    isActive ? "text-kalrav-1" : "text-n-5 hover:text-kalrav-1"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-kalrav-1 rounded-full"
                        layoutId="underline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* User actions */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-n-5 hover:text-kalrav-1 relative"
            >
              <FaBell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-kalrav-3 rounded-full"></span>
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative flex items-center"
            >
              <img
                src={userData.avatar}
                alt="Profile"
                className="w-8 h-8 rounded-full border border-n-2"
              />
              <div className="hidden md:block ml-2">
                <p className="text-sm font-medium text-n-6">
                  {userData.name.split(" ")[0]}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 bg-white rounded-lg border border-n-2/50 shadow-lg py-2"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium ${
                      isActive
                        ? "text-kalrav-1 bg-kalrav-1/5"
                        : "text-n-5 hover:text-kalrav-1 hover:bg-n-1"
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
