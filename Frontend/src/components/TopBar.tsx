import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NotificationIcon, { Notification } from "./NotificationIcon";
import "../styles/TopBar.css";

interface TopBarProps {
  notifications: Notification[];
}

export default function TopBar({ notifications }: TopBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname === "/";

  const closeMenu = () => {
    if (isMenuOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsClosing(false);
      }, 300); // Match this with the animation duration
    }
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      setIsMenuOpen(true);
    }
  };

  return (
    <>
      {(isMenuOpen || isClosing) && (
        <div
          className="overlay"
          data-testid="overlay"
          onClick={closeMenu}
        ></div>
      )}
      <div className={`top-bar ${isDashboard ? "dashboard" : ""}`}>
        <div className="dropdown">
          <button className="dropdown-toggle" onClick={toggleMenu}>
            Menu ▼
          </button>
          {(isMenuOpen || isClosing) && (
            <div
              className={`dropdown-menu ${isMenuOpen ? "open" : ""} ${
                isClosing ? "closing" : ""
              }`}
            >
              <Link to="/dashboard" onClick={closeMenu}>
                Dashboard
              </Link>
              <Link to="/history" onClick={closeMenu}>
                History
              </Link>
              <Link to="/ml-insights" onClick={closeMenu}>
                Insights
              </Link>
              <Link to="/customize-thresholds" onClick={closeMenu}>
                Customise Thresholds
              </Link>
              <Link to="/third-party-control" onClick={closeMenu}>
                Third-Party Control
              </Link>
            </div>
          )}
        </div>

        <div className="notification-area">
          <NotificationIcon notifications={notifications as any} />
        </div>
      </div>
    </>
  );
}
