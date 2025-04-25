import React from 'react'
import "./Features.css"
const Features = () => {
  return (
    
       <div className="features-section">
          <div className="feature-card">
            <div className="feature-icon safety-icon"></div>
            <h3 className="feature-title">Safety Monitoring</h3>
            <p className="feature-description">
              Continuous monitoring and reporting of AI safety incidents to prevent potential harm.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon response-icon"></div>
            <h3 className="feature-title">Rapid Response</h3>
            <p className="feature-description">
              Quick identification and mitigation of AI risks before they escalate into serious issues.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon reporting-icon"></div>
            <h3 className="feature-title">Transparent Reporting</h3>
            <p className="feature-description">
              Open documentation of AI incidents to foster accountability and continuous improvement.
            </p>
          </div>
        </div>
  )
}

export default Features
