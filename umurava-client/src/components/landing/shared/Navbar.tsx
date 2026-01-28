"use client";

import Image from "next/image";
import logo2 from "../../../../public/logo_2.png";
import Link from "next/link";
import { Menu, X, LogIn, UserPlus, Sun, Moon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const navLinks = [
  { name: "Home", linkTo: "/" },
  { name: "Challenge & Hackathons", linkTo: "/challenges" },
  { name: "For Learning Institutions", linkTo: "/institutions" },
  { name: "About Us", linkTo: "/about" },
  { name: "Contact Us", linkTo: "#contact", isScroll: true }
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthMenu, setShowAuthMenu] = useState(false);
  const pathname = usePathname();
  const authMenuRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    closeMenu();
  };

  const handleNavClick = (link: { isScroll?: boolean }, e: React.MouseEvent) => {
    if (link.isScroll) {
      handleContactClick(e);
    } else {
      closeMenu();
    }
  };

  // Close auth menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (authMenuRef.current && !authMenuRef.current.contains(event.target as Node)) {
        setShowAuthMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="lg:px-16 flex fixed w-screen left-0 top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg justify-between items-center pr-6 z-40 border-b border-gray-200/20 dark:border-gray-700/20">
        <Link href={"/"} className="flex items-center gap-3">
          <div className="bg-black rounded-lg p-2">
            <Image src="/talentbridge.jpeg" alt="TalentBridge logo" height={50} width={60} className="rounded" />
          </div>
          <div className="text-2xl font-bold text-blue-light dark:text-blue-400">
            TalentBridge
          </div>
        </Link>

        {/* menu button */}
        <div className="lg:hidden flex items-center gap-2">
          {/* Theme toggle for mobile */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>
          <button onClick={toggleMenu} className="text-blue-dark dark:text-white">
            <Menu size={24} />
          </button>
        </div>

        {/* desktop navlinks */}
        <div className="hidden lg:flex gap-6 items-center">
          {navLinks.map((link, i) => (
            link.isScroll ? (
              <button
                key={i}
                onClick={handleContactClick}
                className="hover:text-blue-light duration-300 text-gray-700 dark:text-gray-300 dark:hover:text-blue-light"
              >
                {link.name}
              </button>
            ) : (
              <Link
                key={i}
                href={link.linkTo}
                className={`hover:text-blue-light duration-300 text-gray-700 dark:text-gray-300 dark:hover:text-blue-light ${
                  pathname === link.linkTo ? "text-blue-500" : ""
                }`}
              >
                {link.name}
              </Link>
            )
          ))}
          
          {/* Theme toggle for desktop */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>

        {/* desktop auth menu */}
        <div className="hidden lg:block relative" ref={authMenuRef}>
          <button
            onClick={() => {
              console.log("Join the Program clicked");
              setShowAuthMenu(!showAuthMenu);
            }}
            className="bg-blue-dark hover:bg-blue-light duration-500 px-4 py-3 rounded-md text-white flex items-center gap-2 cursor-pointer dark:bg-blue-light dark:hover:bg-blue-dark"
          >
            <UserPlus size={18} />
            Join the Program
          </button>
          
          {showAuthMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700 animate-fade-in">
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                onClick={() => setShowAuthMenu(false)}
              >
                <LogIn size={16} />
                Login
              </Link>
              <Link
                href="/signup"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                onClick={() => setShowAuthMenu(false)}
              >
                <UserPlus size={16} />
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* mobile menu */}
        <div
          className={`fixed h-screen inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col items-center justify-center space-y-6 lg:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-full pointer-events-none"
          }`}
        >
          {/* close btn */}
          <button
            onClick={closeMenu}
            className="absolute top-6 right-6 text-blue-dark dark:text-white"
          >
            <X size={24} />
          </button>

          {/* mobile links */}
          {navLinks.map((link, i) => (
            link.isScroll ? (
              <button
                key={i}
                onClick={(e) => handleNavClick(link, e)}
                className="hover:text-blue-light duration-300 text-gray-700 dark:text-gray-300 text-lg"
              >
                {link.name}
              </button>
            ) : (
              <Link
                key={i}
                href={link.linkTo}
                onClick={(e) => handleNavClick(link, e)}
                className={`hover:text-blue-light duration-300 text-gray-700 dark:text-gray-300 text-lg ${
                  pathname === link.linkTo ? "text-blue-500" : ""
                }`}
              >
                {link.name}
              </Link>
            )
          ))}

          {/* mobile auth buttons */}
          <div className="flex flex-col gap-3 mt-6">
            <Link
              href="/login"
              onClick={closeMenu}
              className="bg-blue-light hover:bg-blue-dark px-6 py-3 rounded-md text-white flex items-center gap-2 justify-center transition-colors duration-200"
            >
              <LogIn size={18} />
              Login
            </Link>
            <Link
              href="/signup"
              onClick={closeMenu}
              className="bg-blue-dark hover:bg-blue-light px-6 py-3 rounded-md text-white flex items-center gap-2 justify-center transition-colors duration-200"
            >
              <UserPlus size={18} />
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
