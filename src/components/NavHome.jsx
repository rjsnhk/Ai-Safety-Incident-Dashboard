import React from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import "./NavHome.css"
const NavHome = () => {
  return (
    <div className="navbar">
          <div className="logo">
            <div className="logo-circle"> <img src="/human_chain.jpg" alt="" /></div>
            <span>HumanChain</span>
          </div>
          <div className="nav-links">
            <Link to="#" className="nav-link">
              About
            </Link>
            <Link to="#" className="nav-link">
              Solutions
            </Link>
            <Link to="#" className="nav-link">
              Resources
            </Link>
            <ThemeToggle />
            <Link to="/dashboard" className="nav-button">
              Dashboard
            </Link>
          </div>
    </div>
  )
}

export default NavHome
