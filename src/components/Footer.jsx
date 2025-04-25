import React from 'react'
import { Link } from 'react-router-dom'
import "./Footer.css"

const Footer = () => {
  const getCurrentYear = new Date().getFullYear();
  return (
    
      
       <div className="footer">
          <div className="footer-content">
            <div className="footer-logo">
              <div className="logo-circle"></div>
              <span>HumanChain</span>
              <p className="footer-tagline">Building safer AI for everyone</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4 className="footer-heading">Company</h4>
                <ul className="footer-list">
                  <li>
                    <Link to="#" className="footer-link">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="footer-link">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="footer-link">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="footer-column">
                <h4 className="footer-heading">Resources</h4>
                <ul className="footer-list">
                  <li>
                    <Link to="#" className="footer-link">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="footer-link">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="footer-link">
                      Research
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="footer-column">
                <h4 className="footer-heading">Legal</h4>
                <ul className="footer-list">
                  <li>
                    <Link to="#" className="footer-link">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="footer-link">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="footer-link">
                      Security
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {getCurrentYear} HumanChain. All rights reserved.</p>
            <h6>
      Made By <a href="https://rjsnhkv02.vercel.app/" target="_blank" rel="noopener noreferrer"><strong>Rajesh Nahak</strong></a> ❤️
    </h6>
          </div>
        </div>
    
  )
}

export default Footer
