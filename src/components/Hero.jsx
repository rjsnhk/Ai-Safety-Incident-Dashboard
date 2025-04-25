import React from 'react'
import { Link } from 'react-router-dom'
import "./Hero.css"
const Hero = () => {
  return (
    <div className="hero-section">
          <h1 className="hero-title">Building Safer AI for a Human-Centric World</h1>
          <p className="hero-description">
            At HumanChain, we're committed to developing AI systems that prioritize human values, safety, and
            well-being. Our mission is to ensure AI technologies enhance humanity without compromising ethical
            standards.
          </p>
          <Link to="/dashboard" className="cta-button">
            Check Dashboard
            <span className="arrow-icon">→</span>
          </Link>
    </div>
  )
}
export default Hero
