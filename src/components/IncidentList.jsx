import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import './IncidentList.css';


const IncidentList = ({ incidents }) => {
  
  const { theme } = useTheme();
  const [expandedIncidents, setExpandedIncidents] = useState({});

  // Toggle incident details
  const toggleDetails = (id) => {
    setExpandedIncidents((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get severity class
  const getSeverityClass = (severity) => {
    switch (severity) {
      case "Low":
        return "severity-low";
      case "Medium":
        return "severity-medium";
      case "High":
        return "severity-high";
      default:
        return "";
    }
  };

  return (
    <div className={`incident-list ${theme}`}>
      {incidents.length === 0 ? (
        <div className="no-incidents">
          <p>No incidents match your filters.</p>
        </div>
      ) : (
        incidents.map((incident) => (
          <div key={incident.id} className="incident-card">
            <div className="incident-header">
              <div className="incident-info">
                <div className="incident-title-row">
                  <h3 className="incident-title">{incident.title}</h3>
                  <span className={`severity-badge ${getSeverityClass(incident.severity)}`}>
                    {incident.severity}
                  </span>
                </div>
                <p className="incident-date">Reported on {formatDate(incident.reported_at)}</p>
              </div>
              <button
                className={`details-button ${expandedIncidents[incident.id] ? "active" : ""}`}
                onClick={() => toggleDetails(incident.id)}
              >
                {expandedIncidents[incident.id] ? "Hide Details" : "View Details"}
                <span className="details-icon">
                  {expandedIncidents[incident.id] ? "▲" : "▼"}
                </span>
              </button>
            </div>

            {expandedIncidents[incident.id] && (
              <div className="incident-details">
                <h4 className="details-heading">Description:</h4>
                <p className="details-text">{incident.description}</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default IncidentList;

